
import React from 'react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (res: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <div 
      onClick={() => onClick(restaurant)}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full relative"
    >
      <div className="h-52 relative overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide shadow-md">
          {restaurant.offer}
        </div>
        
        {restaurant.isPlus && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-800 flex items-center gap-1.5 uppercase shadow-sm">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Plus Member
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight leading-tight line-clamp-1">{restaurant.name}</h3>
          <div className="bg-green-600 text-white px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
            {restaurant.rating} <span className="text-[10px]">★</span>
          </div>
        </div>
        
        <p className="text-slate-500 text-xs mb-6 font-medium line-clamp-1">{restaurant.cuisine}</p>
        
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold uppercase tracking-wide">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {restaurant.deliveryTime}
          </div>
          <span className="text-[11px] text-slate-400 font-medium uppercase">Avg ₹400 for two</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;