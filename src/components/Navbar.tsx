import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, User, Menu, X, Globe, Heart } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#00AF87] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">🦉</span>
            </div>
            <span className="text-2xl font-black tracking-tighter hidden sm:block">Tripadvisor</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/search?type=attraction" className="text-sm font-semibold hover:text-[#00AF87]">Discover</Link>
            <Link to="/trips" className="text-sm font-semibold hover:text-[#00AF87]">Trips</Link>
            <Link to="/review" className="text-sm font-semibold hover:text-[#00AF87]">Review</Link>
            <Link to="/more" className="text-sm font-semibold hover:text-[#00AF87]">More</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm font-semibold cursor-pointer hover:bg-gray-100 p-2 rounded-full">
              <Globe size={18} />
              <span>INR</span>
            </div>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="text-sm font-semibold text-gray-600 hover:text-black">Admin</Link>
                <button onClick={handleLogout} className="text-sm font-semibold text-gray-600 hover:text-black">Logout</button>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={18} />
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors">
                Sign in
              </Link>
            )}

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 p-4 space-y-4 shadow-lg">
          <Link to="/search?type=attraction" className="block text-lg font-semibold">Discover</Link>
          <Link to="/trips" className="block text-lg font-semibold">Trips</Link>
          <Link to="/review" className="block text-lg font-semibold">Review</Link>
          <Link to="/login" className="block text-lg font-semibold">Sign in</Link>
        </div>
      )}
    </nav>
  );
}
