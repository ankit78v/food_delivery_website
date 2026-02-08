
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const WellnessDashboard: React.FC = () => {
  const data = [
    { name: 'Mon', kcal: 2100 },
    { name: 'Tue', kcal: 2400 },
    { name: 'Wed', kcal: 1800 },
    { name: 'Thu', kcal: 2200 },
    { name: 'Fri', kcal: 2600 },
    { name: 'Sat', kcal: 1950 },
    { name: 'Sun', kcal: 2300 },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto" id="wellness">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Health & Nutrition</h3>
              <p className="text-slate-500 text-sm font-medium">Track your weekly dietary habits and calorie intake.</p>
            </div>
            <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 text-xs font-bold uppercase tracking-wide">
              Weekly Insight
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <Tooltip 
                  cursor={{fill: 'rgba(241,245,249,0.5)'}}
                  contentStyle={{background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="kcal" radius={[6, 6, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#2563eb' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Hydration Progress</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-extrabold text-blue-600">82%</span>
              <span className="text-xs text-slate-500 font-semibold mb-1">of daily goal</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{width: '82%'}}></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm flex-1">
             <h4 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">Macro Distribution</h4>
             <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wide">
                    <span className="text-slate-500">Protein</span>
                    <span className="text-slate-900">120g / 180g</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400" style={{width: '65%'}}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wide">
                    <span className="text-slate-500">Fiber</span>
                    <span className="text-slate-900">25g / 35g</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{width: '71%'}}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wide">
                    <span className="text-slate-500">Carbs</span>
                    <span className="text-slate-900">210g / 250g</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-800" style={{width: '84%'}}></div>
                  </div>
                </div>
             </div>
             
             <button className="w-full mt-10 bg-slate-50 border border-slate-200 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors text-slate-600">
                View detailed breakdown
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessDashboard;