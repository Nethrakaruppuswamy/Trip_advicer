import React, { useState, useEffect } from 'react';
import { Search, Hotel, Utensils, Camera, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PlaceCard from '../components/PlaceCard';
import { motion } from 'motion/react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/places?type=hotel').then(res => res.json()).then(setHotels);
    fetch('/api/places?type=restaurant').then(res => res.json()).then(setRestaurants);
    fetch('/api/places?type=attraction').then(res => res.json()).then(setAttractions);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/travel/1920/1080" 
            alt="Hero" 
            className="w-full h-full object-cover brightness-75"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight"
          >
            Where to?
          </motion.h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/search?type=hotel" className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              <Hotel size={20} />
              <span>Hotels</span>
            </Link>
            <Link to="/search?type=attraction" className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              <Camera size={20} />
              <span>Things to Do</span>
            </Link>
            <Link to="/search?type=restaurant" className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              <Utensils size={20} />
              <span>Restaurants</span>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Places to go, things to do, hotels..." 
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white shadow-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#00AF87]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00AF87] text-white px-6 py-2 rounded-full font-bold hover:bg-[#008f6e] transition-colors">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Popular Destinations</h2>
            <p className="text-gray-600">Top picks for your next adventure</p>
          </div>
          <Link to="/search" className="text-[#00AF87] font-bold hover:underline">View all</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Paris', 'Bali', 'Tokyo', 'Rome'].map((city) => (
            <Link key={city} to={`/search?search=${city}`} className="relative h-64 rounded-xl overflow-hidden group">
              <img 
                src={`https://picsum.photos/seed/${city}/600/800`} 
                alt={city} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-2xl font-black">{city}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Hotels Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-black tracking-tight mb-8">Stay Somewhere Great</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.slice(0, 3).map((hotel: any) => (
            <PlaceCard key={hotel.id} {...hotel} />
          ))}
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-black tracking-tight mb-8">Top Rated Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.slice(0, 3).map((rest: any) => (
            <PlaceCard key={rest.id} {...rest} />
          ))}
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="bg-gray-50 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#00AF87] font-bold uppercase tracking-widest text-sm">Travel Inspiration</span>
              <h2 className="text-4xl font-black tracking-tight mt-4 mb-6">Plan your next trip with confidence</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover hidden gems, local favorites, and must-see landmarks. Our community of travelers shares real experiences to help you make the best choices.
              </p>
              <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors">
                Explore Guides
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/travel1/400/500" alt="Inspiration" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/travel2/400/500" alt="Inspiration" className="rounded-2xl shadow-lg mt-8" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
