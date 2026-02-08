
import React, { useState } from 'react';
import { getFoodRecommendations } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const recommendations = await getFoodRecommendations(query);
    setResults(recommendations);
    setLoading(false);
  };

  return (
    <section className="py-10 max-w-5xl mx-auto px-4">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 border border-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Food Assistant</h3>
            <p className="text-sm text-slate-500 font-medium">Personalized recommendations for your mood</p>
          </div>
        </div>
        
        <p className="text-slate-600 mb-8 font-medium text-sm max-w-2xl">Tell us what you're craving or your dietary preferences, and our AI will suggest the best options for you.</p>
        
        <div className="flex flex-col md:flex-row gap-3 mb-10">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="e.g., I want something spicy and high in protein"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 whitespace-nowrap shadow-lg"
          >
            {loading ? 'Thinking...' : 'Get Suggestions'}
          </button>
        </div>

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {results.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all group/card">
                <h5 className="text-lg font-bold mb-2 text-slate-900 group-hover/card:text-blue-600 transition-colors tracking-tight">{item.name}</h5>
                <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed line-clamp-3">{item.description}</p>
                <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-blue-600 text-[10px] font-bold uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  {item.benefits}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AIAssistant;