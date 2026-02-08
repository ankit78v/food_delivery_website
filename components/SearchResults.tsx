
import React from 'react';
import { Restaurant, FoodItem } from '../types';
import RestaurantCard from './RestaurantCard';

interface SearchResultsProps {
  query: string;
  restaurants: Restaurant[];
  onRestaurantClick: (res: Restaurant) => void;
  onAddToCart: (item: FoodItem, resId: string, navigate?: boolean) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, restaurants, onRestaurantClick, onAddToCart }) => {
  const matchingDishes: { dish: FoodItem; restaurantId: string; restaurantName: string }[] = [];
  restaurants.forEach(res => {
    res.menu.forEach(item => {
      if (item.name.toLowerCase().includes(query.toLowerCase()) || 
          item.description.toLowerCase().includes(query.toLowerCase())) {
        matchingDishes.push({ dish: item, restaurantId: res.id, restaurantName: res.name });
      }
    });
  });

  const matchingRestaurants = restaurants.filter(res => 
    res.name.toLowerCase().includes(query.toLowerCase()) || 
    res.cuisine.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = matchingRestaurants.length + matchingDishes.length;

  if (totalResults === 0) {
    return (
      <div className="py-20 text-center">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="h-16 w-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-black mb-2">No results for "{query}"</h3>
        <p className="text-gray-400 font-medium">Try searching for something else like "Pizza" or "Burger"</p>
      </div>
    );
  }

  return (
    <div className="py-8 animate-in fade-in duration-300">
      <h2 className="text-2xl font-black text-black mb-8 px-2 tracking-tight">
        Search results for "{query}"
      </h2>

      {matchingRestaurants.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 px-2">Matching Restaurants</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matchingRestaurants.map(res => (
              <RestaurantCard key={res.id} restaurant={res} onClick={onRestaurantClick} />
            ))}
          </div>
        </div>
      )}

      {matchingDishes.length > 0 && (
        <div>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 px-2">Matching Dishes</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {matchingDishes.map(({ dish, restaurantId, restaurantName }) => (
              <div key={dish.id} className="bg-white p-6 rounded-[2rem] flex gap-6 border border-gray-100 hover:shadow-xl transition-all group">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-3 h-3 border-2 ${dish.isEco ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-[1px]`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${dish.isEco ? 'bg-green-600' : 'bg-red-600'}`}></div>
                      </span>
                      <h4 className="text-lg font-black text-black group-hover:text-blue-600 transition-colors">{dish.name}</h4>
                    </div>
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2">from {restaurantName}</p>
                    <p className="text-gray-400 text-xs font-medium mb-3 line-clamp-2">{dish.description}</p>
                    <p className="text-black font-black text-lg">₹{dish.price}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button 
                      onClick={() => onAddToCart(dish, restaurantId, false)}
                      className="bg-blue-50 text-blue-600 p-2 rounded-xl hover:bg-blue-100 transition-all active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onAddToCart(dish, restaurantId, true)}
                      className="bg-blue-600 text-white px-8 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md active:scale-95"
                    >
                      Buy
                    </button>
                  </div>
                </div>
                <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-50">
                  <img src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
