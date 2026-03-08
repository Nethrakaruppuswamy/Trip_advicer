import React, { useState, useEffect } from 'react';
import { Plus, Trash2, MapPin, Tag, DollarSign, Image as ImageIcon, Type, Star } from 'lucide-react';

export default function Admin() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlace, setNewPlace] = useState({
    name: '',
    type: 'hotel',
    description: '',
    location: '',
    price_level: 2,
    image_url: 'https://picsum.photos/seed/new/800/600',
    category: ''
  });

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = () => {
    fetch('/api/places')
      .then(res => res.json())
      .then(data => {
        setPlaces(data);
        setLoading(false);
      });
  };

  const handleAddPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlace)
    });

    if (res.ok) {
      setShowAddForm(false);
      setNewPlace({
        name: '',
        type: 'hotel',
        description: '',
        location: '',
        price_level: 2,
        image_url: 'https://picsum.photos/seed/new/800/600',
        category: ''
      });
      fetchPlaces();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this place?')) {
      const res = await fetch(`/api/places/${id}`, { method: 'DELETE' });
      if (res.ok) fetchPlaces();
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage your travel listings and content</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#00AF87] text-white px-6 py-3 rounded-full font-bold flex items-center hover:bg-[#008f6e] transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add New Place
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white border rounded-3xl p-8 mb-12 shadow-xl animate-in fade-in slide-in-from-top-4">
          <h2 className="text-2xl font-bold mb-6">Add New Listing</h2>
          <form onSubmit={handleAddPlace} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Name</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-[#00AF87]"
                value={newPlace.name}
                onChange={e => setNewPlace({...newPlace, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Type</label>
              <select 
                className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-[#00AF87]"
                value={newPlace.type}
                onChange={e => setNewPlace({...newPlace, type: e.target.value})}
              >
                <option value="hotel">Hotel</option>
                <option value="restaurant">Restaurant</option>
                <option value="attraction">Attraction</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Location</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-[#00AF87]"
                value={newPlace.location}
                onChange={e => setNewPlace({...newPlace, location: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Category</label>
              <input 
                type="text" 
                placeholder="e.g. Luxury, French, Landmark"
                className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-[#00AF87]"
                value={newPlace.category}
                onChange={e => setNewPlace({...newPlace, category: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Price Level (1-4)</label>
              <input 
                type="number" 
                min="1" 
                max="4"
                className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-[#00AF87]"
                value={newPlace.price_level}
                onChange={e => setNewPlace({...newPlace, price_level: parseInt(e.target.value)})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Image URL</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-[#00AF87]"
                value={newPlace.image_url}
                onChange={e => setNewPlace({...newPlace, image_url: e.target.value})}
                required
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Description</label>
              <textarea 
                className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-[#00AF87] min-h-[100px]"
                value={newPlace.description}
                onChange={e => setNewPlace({...newPlace, description: e.target.value})}
                required
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-4">
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 rounded-full font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800"
              >
                Save Listing
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-bold text-sm text-gray-500 uppercase">Place</th>
              <th className="px-6 py-4 font-bold text-sm text-gray-500 uppercase">Type</th>
              <th className="px-6 py-4 font-bold text-sm text-gray-500 uppercase">Location</th>
              <th className="px-6 py-4 font-bold text-sm text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-4 font-bold text-sm text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {places.map((place: any) => (
              <tr key={place.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={place.image_url} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <span className="font-bold">{place.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="capitalize px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                    {place.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{place.location}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm font-bold">
                    <Star size={14} className="text-[#00AF87] fill-[#00AF87] mr-1" />
                    {place.rating.toFixed(1)}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(place.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
