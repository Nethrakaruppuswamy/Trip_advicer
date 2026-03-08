import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { email, name: name || email.split('@')[0], isAdmin: email.includes('admin') };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#00AF87] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">🦉</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">
            {isRegister ? 'Create an account' : 'Welcome back'}
          </h1>
          <p className="text-gray-500">Join millions of travelers worldwide</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          {isRegister && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00AF87] transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full p-4 pl-12 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00AF87] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full p-4 pl-12 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00AF87] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center group">
            {isRegister ? 'Create account' : 'Sign in'}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm font-bold text-[#00AF87] hover:underline"
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Join now"}
          </button>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-xs text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
