import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-[#00AF87] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🦉</span>
              </div>
              <span className="text-xl font-black tracking-tighter">Tripadvisor</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Plan and book your perfect trip with expert advice, travel guides, destination information and inspiration from Tripadvisor.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">About Tripadvisor</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="#" className="hover:underline">About Us</Link></li>
              <li><Link to="#" className="hover:underline">Press</Link></li>
              <li><Link to="#" className="hover:underline">Resources and Policies</Link></li>
              <li><Link to="#" className="hover:underline">Careers</Link></li>
              <li><Link to="#" className="hover:underline">Trust & Safety</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="#" className="hover:underline">Write a review</Link></li>
              <li><Link to="#" className="hover:underline">Add a Place</Link></li>
              <li><Link to="#" className="hover:underline">Join</Link></li>
              <li><Link to="#" className="hover:underline">Travelers' Choice</Link></li>
              <li><Link to="#" className="hover:underline">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Do Business With Us</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="#" className="hover:underline">Owners</Link></li>
              <li><Link to="#" className="hover:underline">Business Advantage</Link></li>
              <li><Link to="#" className="hover:underline">Sponsored Placements</Link></li>
              <li><Link to="#" className="hover:underline">Access our Content API</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-bold mb-4">Follow us</h4>
            <div className="flex space-x-4">
              <Link to="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><Facebook size={20} /></Link>
              <Link to="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><Twitter size={20} /></Link>
              <Link to="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><Instagram size={20} /></Link>
              <Link to="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><Youtube size={20} /></Link>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© 2024 Tripadvisor LLC All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="#" className="hover:underline">Terms of Use</Link>
            <Link to="#" className="hover:underline">Privacy and Cookies Statement</Link>
            <Link to="#" className="hover:underline">Cookie consent</Link>
            <Link to="#" className="hover:underline">Site Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
