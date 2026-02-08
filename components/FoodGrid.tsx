
import React from 'react';
import { MOCK_FOODS } from '../constants';
import { FoodItem } from '../types';

interface FoodGridProps {
  onAddToCart: (item: FoodItem, resId: string, navigate?: boolean) => void;
  activeCategory: string | null;
}

const FoodGrid: React.FC<FoodGridProps> = ({ onAddToCart, activeCategory }) => {
  const filteredFoods = activeCategory 
    ? MOCK_FOODS.filter(food => food.category.toLowerCase() === activeCategory.toLowerCase())
    : MOCK_FOODS;

  return (
    <section className="py-12 px-2 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8 px-2">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
            {activeCategory ? `${activeCategory} Specials` : 'Trending Now'}
          </h3>
          <p className="text-slate-500 text-sm font-medium">
            {activeCategory 
              ? `Best ${activeCategory.toLowerCase()} dishes picked just for you.`
              : 'Most ordered dishes across the city today.'}
          </p>
        </div>
      </div>

      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 animate-in fade-in duration-500">
          {filteredFoods.map((food) => (
            <div key={food.id} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 relative overflow-hidden">
                <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  {food.isEco && (
                    <div className="bg-green-600 text-white font-bold text-[9px] px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      ECO-FRIENDLY
                    </div>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-slate-800 border border-slate-200 shadow-sm">
                  ★ {food.rating}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight leading-tight line-clamp-1">{food.name}</h4>
                </div>
                <p className="text-slate-500 text-xs mb-6 line-clamp-2 font-medium leading-relaxed">{food.description}</p>
                
                <div className="flex items-center justify-between gap-2 mt-auto">
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price</span>
                    <span className="text-lg font-extrabold text-slate-900">₹{food.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onAddToCart(food, 'trending', false)}
                      className="bg-blue-50 text-blue-600 p-2.5 rounded-xl hover:bg-blue-100 transition-all active:scale-95 shadow-sm group/add"
                      title="Add to Cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onAddToCart(food, 'trending', true)}
                      className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95 text-xs uppercase tracking-widest"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-100/50 rounded-[3rem] border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No {activeCategory} items available right now</p>
        </div>
      )}
    </section>
  );
};

export default FoodGrid;
