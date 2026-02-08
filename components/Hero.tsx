
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="pt-24 pb-8">
      <div className="bg-blue-600 rounded-[2.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-orange-400/20 rounded-full blur-[120px]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-orange-400 rounded-full shadow-lg"></span>
            <span className="text-xs font-bold uppercase tracking-wider">Fastest delivery in your area</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Delicious food delivered <br/> to your doorstep.
          </h2>
          
          <p className="text-lg md:text-xl text-blue-100 mb-10 font-medium max-w-2xl mx-auto">
            Experience premium culinary delights from the best restaurants, delivered fresh and fast.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-lg active:scale-95">
              Order Now
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-blue-700/30 text-white font-bold rounded-2xl border border-white/20 hover:bg-blue-700/40 transition-all backdrop-blur-md">
              Check Deals
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;