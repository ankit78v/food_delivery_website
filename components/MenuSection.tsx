
import React from 'react';
import { Restaurant, FoodItem, CartItem } from '../types';

interface MenuSectionProps {
  restaurant: Restaurant;
  onBack: () => void;
  onAdd: (item: FoodItem, resId: string, navigate?: boolean) => void;
  cartItems: CartItem[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ restaurant, onBack, onAdd, cartItems }) => {
  return (
    <div className="pt-24 pb-12 animate-in fade-in duration-300">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 font-black text-xs uppercase tracking-[0.2em] mb-10 hover:text-black transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Go Back
      </button>

      <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 mb-12 shadow-sm">
        <div className="h-64 relative">
          <img src={restaurant.image} className="w-full h-full object-cover" alt={restaurant.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10">
            <h1 className="text-5xl font-black text-white mb-2 tracking-tight">{restaurant.name}</h1>
            <p className="text-white/70 font-bold text-sm uppercase tracking-[0.2em]">{restaurant.cuisine}</p>
          </div>
          <div className="absolute bottom-10 right-10">
            <div className="bg-green-600 text-white px-4 py-2 rounded-2xl font-black text-sm shadow-xl flex items-center gap-2">
              {restaurant.rating} <span className="text-xs">★</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {restaurant.menu.map(item => {
          const inCart = cartItems.find(i => i.id === item.id);
          return (
            <div key={item.id} className="bg-white p-8 rounded-[2.5rem] flex gap-8 border border-gray-100 hover:shadow-2xl transition-all group relative">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-4 h-4 border-2 ${item.isEco ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-[2px] rounded-sm`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${item.isEco ? 'bg-green-600' : 'bg-red-600'}`}></div>
                    </span>
                    <h4 className="text-xl font-black text-black group-hover:text-blue-600 transition-colors">{item.name}</h4>
                  </div>
                  <p className="text-gray-400 text-xs font-bold leading-relaxed mb-4 line-clamp-2">{item.description}</p>
                  <p className="text-black font-black text-xl">₹{item.price}</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                   {inCart ? (
                     <div className="inline-flex items-center gap-6 bg-white border-2 border-blue-600 text-blue-600 px-6 py-2.5 rounded-2xl font-black text-sm shadow-lg">
                        <button onClick={() => onAdd(item, restaurant.id, false)} className="hover:scale-125 transition-transform">-</button>
                        <span>{inCart.quantity}</span>
                        <button onClick={() => onAdd(item, restaurant.id, false)} className="hover:scale-125 transition-transform">+</button>
                     </div>
                   ) : (
                     <>
                        <button 
                          onClick={() => onAdd(item, restaurant.id, false)}
                          className="bg-blue-50 text-blue-600 p-3 rounded-2xl hover:bg-blue-100 transition-all shadow-sm active:scale-95"
                          title="Add to Cart"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => onAdd(item, restaurant.id, true)}
                          className="bg-blue-600 text-white px-10 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md active:scale-95 flex-1 md:flex-none"
                        >
                          Buy
                        </button>
                     </>
                   )}
                </div>
              </div>
              <div className="w-36 h-36 rounded-[2rem] overflow-hidden flex-shrink-0 relative border border-gray-50 shadow-inner">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuSection;
