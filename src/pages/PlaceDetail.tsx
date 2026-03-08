import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Share2, Heart, Info, MessageSquare, Camera } from 'lucide-react';

export default function PlaceDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    fetch(`/api/places/${id}`)
      .then(res => res.json())
      .then(data => {
        setPlace(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        place_id: id,
        user_name: user.name,
        rating: reviewRating,
        comment: reviewText
      })
    });

    if (res.ok) {
      setReviewText('');
      // Refresh place data
      const updated = await fetch(`/api/places/${id}`).then(r => r.json());
      setPlace(updated);
    }
  };

  if (loading) return <div className="pt-40 text-center">Loading...</div>;
  if (!place) return <div className="pt-40 text-center">Place not found</div>;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-black tracking-tight">{place.name}</h1>
          <div className="flex space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 size={20} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Heart size={20} /></button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-full mr-0.5 ${i < Math.round(place.rating) ? 'bg-[#00AF87]' : 'bg-gray-200'}`} />
              ))}
            </div>
            <span className="font-bold">{place.rating.toFixed(1)}</span>
            <span className="text-gray-500">({place.reviews?.length || 0} reviews)</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-1" />
            {place.location}
          </div>
          <div className="text-gray-600">
            {'$'.repeat(place.price_level)} • {place.category}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] mb-12 rounded-2xl overflow-hidden">
        <div className="md:col-span-2 h-full">
          <img src={place.image_url} alt={place.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:block h-full">
          <img src={`https://picsum.photos/seed/${id}1/600/800`} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-2 h-full">
          <img src={`https://picsum.photos/seed/${id}2/600/400`} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="relative">
            <img src={`https://picsum.photos/seed/${id}3/600/400`} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold hover:bg-black/50 transition-colors">
              <Camera size={20} className="mr-2" />
              View all photos
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          {/* About */}
          <section>
            <h2 className="text-2xl font-black mb-4">About</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{place.description}</p>
          </section>

          {/* Location Map (OpenStreetMap) */}
          <section>
            <h2 className="text-2xl font-black mb-4">Location</h2>
            <div className="h-80 rounded-2xl overflow-hidden border">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=-0.1,51.5,0.1,51.6&layer=mapnik&marker=51.505,-0.09`}
              />
            </div>
            <p className="mt-4 text-gray-600 flex items-center">
              <MapPin size={18} className="mr-2" />
              {place.location}
            </p>
          </section>

          {/* Reviews */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black">Reviews</h2>
              <button className="bg-black text-white px-6 py-2 rounded-full font-bold">Write a review</button>
            </div>

            {/* Review Form */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-12">
              <h3 className="font-bold mb-4">Add your experience</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Rating:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button 
                        key={r} 
                        type="button"
                        onClick={() => setReviewRating(r)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${reviewRating >= r ? 'bg-[#00AF87] text-white' : 'bg-gray-200 text-gray-400'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea 
                  placeholder="Share your thoughts about this place..." 
                  className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#00AF87] min-h-[120px]"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
                <button type="submit" className="bg-[#00AF87] text-white px-8 py-3 rounded-full font-bold hover:bg-[#008f6e] transition-colors">
                  Post Review
                </button>
              </form>
            </div>

            {/* Review List */}
            <div className="space-y-8">
              {place.reviews?.length > 0 ? (
                place.reviews.map((review: any) => (
                  <div key={review.id} className="border-b pb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                        {review.user_name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold">{review.user_name}</h4>
                        <p className="text-xs text-gray-500">Reviewed on {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full mr-0.5 ${i < review.rating ? 'bg-[#00AF87]' : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 italic">
                  No reviews yet. Be the first to share your experience!
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-4">Plan your visit</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Price Level</span>
                <span className="font-bold">{'$'.repeat(place.price_level)}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Category</span>
                <span className="font-bold">{place.category}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600">Type</span>
                <span className="font-bold capitalize">{place.type}</span>
              </div>
              <button className="w-full bg-[#00AF87] text-white py-4 rounded-full font-bold text-lg hover:bg-[#008f6e] transition-colors mt-4">
                Check Availability
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="font-bold mb-2 flex items-center">
              <Info size={18} className="mr-2" />
              Traveler Tips
            </h4>
            <p className="text-sm text-gray-600">
              "Best visited during the golden hour for the most spectacular views and photo opportunities."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
