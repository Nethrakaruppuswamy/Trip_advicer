import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaceCardProps {
  id: number;
  name: string;
  location: string;
  rating: number;
  image_url: string;
  type: string;
  price_level: number;
}

export default function PlaceCard({ id, name, location, rating, image_url, type, price_level }: PlaceCardProps) {
  return (
    <Link to={`/place/${id}`} className="group block bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image_url} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Star size={16} className="text-gray-600" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-[#00AF87] transition-colors">{name}</h3>
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full mr-0.5 ${i < Math.round(rating) ? 'bg-[#00AF87]' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">{rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{location}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{type}</span>
          <span className="text-sm font-bold text-gray-900">
            {'$'.repeat(price_level)}
          </span>
        </div>
      </div>
    </Link>
  );
}
