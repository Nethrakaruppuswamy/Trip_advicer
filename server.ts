import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("tripadvisor.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'hotel', 'restaurant', 'attraction'
    description TEXT,
    location TEXT,
    price_level INTEGER, -- 1 to 4
    rating REAL DEFAULT 0,
    image_url TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    place_id INTEGER,
    user_name TEXT,
    rating INTEGER,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_SERVER_TIME,
    FOREIGN KEY(place_id) REFERENCES places(id)
  );
`);

// Seed data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM places").get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare("INSERT INTO places (name, type, description, location, price_level, rating, image_url, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  
  // Hotels
  insert.run("The Grand Palace", "hotel", "Luxury stay in the heart of the city.", "Paris, France", 4, 4.8, "https://picsum.photos/seed/hotel1/800/600", "Luxury");
  insert.run("Ocean View Resort", "hotel", "Beautiful beachfront property with amazing sunsets.", "Bali, Indonesia", 3, 4.5, "https://picsum.photos/seed/hotel2/800/600", "Resort");
  insert.run("Mountain Lodge", "hotel", "Cozy cabin vibes for nature lovers.", "Swiss Alps", 2, 4.2, "https://picsum.photos/seed/hotel3/800/600", "Nature");

  // Restaurants
  insert.run("Le Gourmet", "restaurant", "Authentic French cuisine with a modern twist.", "Paris, France", 4, 4.9, "https://picsum.photos/seed/rest1/800/600", "French");
  insert.run("Sushi Zen", "restaurant", "Fresh sushi and traditional Japanese dishes.", "Tokyo, Japan", 3, 4.7, "https://picsum.photos/seed/rest2/800/600", "Japanese");
  insert.run("Pasta House", "restaurant", "Homemade pasta and Italian classics.", "Rome, Italy", 2, 4.4, "https://picsum.photos/seed/rest3/800/600", "Italian");

  // Attractions
  insert.run("Eiffel Tower", "attraction", "The iconic iron lady of Paris.", "Paris, France", 2, 4.8, "https://picsum.photos/seed/attr1/800/600", "Landmark");
  insert.run("Great Wall", "attraction", "One of the wonders of the world.", "Beijing, China", 1, 4.9, "https://picsum.photos/seed/attr2/800/600", "History");
  insert.run("Grand Canyon", "attraction", "Breathtaking natural wonder.", "Arizona, USA", 1, 4.7, "https://picsum.photos/seed/attr3/800/600", "Nature");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/places", (req, res) => {
    const { type, search, rating, price } = req.query;
    let query = "SELECT * FROM places WHERE 1=1";
    const params: any[] = [];

    if (type) {
      query += " AND type = ?";
      params.push(type);
    }
    if (search) {
      query += " AND (name LIKE ? OR location LIKE ? OR category LIKE ?)";
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }
    if (rating) {
      query += " AND rating >= ?";
      params.push(Number(rating));
    }
    if (price) {
      query += " AND price_level <= ?";
      params.push(Number(price));
    }

    const places = db.prepare(query).all(...params);
    res.json(places);
  });

  app.get("/api/places/:id", (req, res) => {
    const place = db.prepare("SELECT * FROM places WHERE id = ?").get(req.params.id) as any;
    if (!place) return res.status(404).json({ error: "Place not found" });
    
    const reviews = db.prepare("SELECT * FROM reviews WHERE place_id = ? ORDER BY id DESC").all(req.params.id);
    res.json({ ...place, reviews });
  });

  app.post("/api/places", (req, res) => {
    const { name, type, description, location, price_level, image_url, category } = req.body;
    const info = db.prepare("INSERT INTO places (name, type, description, location, price_level, image_url, category) VALUES (?, ?, ?, ?, ?, ?, ?)").run(name, type, description, location, price_level, image_url, category);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/places/:id", (req, res) => {
    db.prepare("DELETE FROM places WHERE id = ?").run(req.params.id);
    db.prepare("DELETE FROM reviews WHERE place_id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/reviews", (req, res) => {
    const { place_id, user_name, rating, comment } = req.body;
    db.prepare("INSERT INTO reviews (place_id, user_name, rating, comment) VALUES (?, ?, ?, ?)").run(place_id, user_name, rating, comment);
    
    // Update place rating
    const stats = db.prepare("SELECT AVG(rating) as avg_rating FROM reviews WHERE place_id = ?").get(place_id) as { avg_rating: number };
    db.prepare("UPDATE places SET rating = ? WHERE id = ?").run(stats.avg_rating, place_id);
    
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
