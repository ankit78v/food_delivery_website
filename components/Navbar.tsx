
import React, { useState } from 'react';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onOrdersClick?: () => void;
  currentLocation: string;
  onLocationClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onCartClick, 
  cartCount, 
  onLogout, 
  onProfileClick, 
  onOrdersClick,
  currentLocation, 
  onLocationClick,
  searchQuery,
  onSearchChange
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className={`max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center ${isMobileSearchOpen ? 'hidden' : 'flex'}`}>
        <div className="flex items-center gap-6 md:gap-10">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              {/* New Burger Logo Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 10c0-3.866-4.03-7-9-7s-9 3.134-9 7" /> {/* Top Bun */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 10h20a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2z" /> {/* Patty */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 15h20v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1z" /> {/* Bottom Bun */}
              </svg>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight hidden sm:block">
              BhookLagii
            </h1>
          </div>

          <div 
            onClick={onLocationClick}
            className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-3 py-1.5 rounded-xl transition-colors border border-transparent"
          >
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600 leading-none mb-0.5">Location</span>
              <span className="text-sm font-semibold text-slate-700 line-clamp-1 max-w-[120px] md:max-w-[240px]">{currentLocation}</span>
            </div>
            <svg className="h-4 w-4 text-slate-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 max-w-xl mx-8 items-center gap-6">
          <div className="flex-1 relative group">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for restaurants or dishes..." 
              className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
            />
          </div>
          <button 
            onClick={onOrdersClick}
            className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            My Orders
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsMobileSearchOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button 
            onClick={onCartClick}
            className="relative p-2.5 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={onProfileClick}
            className="flex items-center gap-3 group"
          >
            <img src="https://picsum.photos/seed/user/100" alt="Avatar" className="w-9 h-9 rounded-full border-2 border-slate-200 object-cover group-hover:border-blue-500 transition-colors" />
          </button>
        </div>
      </div>

      <div className={`px-4 py-4 bg-white border-b border-slate-200 transition-all duration-300 ${isMobileSearchOpen ? 'flex' : 'hidden'} lg:hidden items-center gap-4`}>
        <button 
          onClick={() => {
            setIsMobileSearchOpen(false);
            onSearchChange('');
          }}
          className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex-1 relative">
          <input 
            autoFocus
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search food..." 
            className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
