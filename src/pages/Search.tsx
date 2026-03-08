import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Star, DollarSign, Search as SearchIcon } from 'lucide-react';
import PlaceCard from '../components/PlaceCard';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const type = searchParams.get('type') || '';
  const search = searchParams.get('search') || '';
  const rating = searchParams.get('rating') || '';
  const price = searchParams.get('price') || '';

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams({
      type,
      search,
      rating,
      price
    }).toString();
    
    fetch(`/api/places?${query}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      });
  }, [type, search, rating, price]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div className="flex items-center space-x-2 pb-4 border-bottom">
              <Filter size={20} />
              <h2 className="font-bold text-xl">Filters</h2>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-bold mb-4">Category</h3>
              <div className="space-y-2">
                {['hotel', 'restaurant', 'attraction'].map((cat) => (
                  <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="type" 
                      checked={type === cat}
                      onChange={() => updateFilter('type', cat)}
                      className="w-4 h-4 text-[#00AF87] focus:ring-[#00AF87]"
                    />
                    <span className="capitalize group-hover:text-[#00AF87]">{cat}s</span>
                  </label>
                ))}
                <button 
                  onClick={() => updateFilter('type', '')}
                  className="text-sm text-gray-500 hover:text-black underline"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-bold mb-4">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2].map((r) => (
                  <label key={r} className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="rating" 
                      checked={rating === r.toString()}
                      onChange={() => updateFilter('rating', r.toString())}
                      className="w-4 h-4 text-[#00AF87] focus:ring-[#00AF87]"
                    />
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < r ? 'fill-[#00AF87] text-[#00AF87]' : 'text-gray-300'} />
                      ))}
                      <span className="ml-2 text-sm">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-bold mb-4">Price Range</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    onClick={() => updateFilter('price', p.toString())}
                    className={`flex-1 py-2 rounded-lg border font-bold transition-all ${price === p.toString() ? 'bg-[#00AF87] text-white border-[#00AF87]' : 'bg-white text-gray-600 hover:border-black'}`}
                  >
                    {'$'.repeat(p)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight mb-2">
              {search ? `Results for "${search}"` : 'Explore all places'}
            </h1>
            <p className="text-gray-600">{results.length} places found</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-[4/3] rounded-xl mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((place: any) => (
                <PlaceCard key={place.id} {...place} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <SearchIcon size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
              <button 
                onClick={() => setSearchParams({})}
                className="mt-6 bg-black text-white px-6 py-2 rounded-full font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
