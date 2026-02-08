
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategorySectionProps {
  activeCategory: string | null;
  onCategorySelect: (category: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ activeCategory, onCategorySelect }) => {
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8 px-2 flex justify-between items-center">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Explore Categories</h3>
        {activeCategory && (
          <button 
            onClick={() => onCategorySelect(activeCategory)}
            className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline"
          >
            Clear Filter
          </button>
        )}
      </div>
      
      <div className="flex overflow-x-auto pb-6 gap-6 no-scrollbar snap-x px-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <div 
              key={cat.id}
              onClick={() => onCategorySelect(cat.name)}
              className="flex-shrink-0 flex flex-col items-center gap-3 snap-start cursor-pointer group"
            >
              <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-4xl transition-all duration-300 shadow-sm border ${
                isActive 
                  ? 'bg-blue-600 border-blue-600 scale-105 shadow-blue-200' 
                  : 'bg-white border-slate-100 group-hover:border-blue-400 group-hover:scale-105 group-hover:shadow-md'
              }`}>
                 <span className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}>
                  {cat.icon}
                 </span>
              </div>
              <h4 className={`font-bold text-xs uppercase tracking-wide transition-colors ${
                isActive ? 'text-blue-600' : 'text-slate-600 group-hover:text-blue-600'
              }`}>
                {cat.name}
              </h4>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
