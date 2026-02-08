
import React, { useState, useEffect } from 'react';

const OrderTracking: React.FC = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 0.1 : 0));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="tracking">
      <div className="glass border border-white/10 rounded-3xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
        <div className="flex-1 relative bg-[#0a0a0c] overflow-hidden">
          {/* Mock Map Grid */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
          
          <div className="relative h-full w-full flex items-center justify-center">
            {/* Delivery Path */}
            <svg width="100%" height="100%" className="absolute inset-0 p-20">
              <path 
                d="M 100 100 Q 300 150 500 100 T 900 200" 
                stroke="rgba(34, 211, 238, 0.1)" 
                strokeWidth="4" 
                fill="none" 
              />
              <path 
                d="M 100 100 Q 300 150 500 100 T 900 200" 
                stroke="#00f3ff" 
                strokeWidth="2" 
                fill="none" 
                strokeDasharray="1000" 
                strokeDashoffset={1000 - (progress * 10)} 
              />
            </svg>

            <div className="text-center z-10">
               <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center animate-pulse mb-4 border border-cyan-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 5H9L12 2Z" />
                    <path d="M4 12V8H6V12H4Z" />
                    <path d="M18 12V8H20V12H18Z" />
                    <path d="M21 13H3V15H21V13Z" />
                    <path d="M12 22L9 19H15L12 22Z" />
                  </svg>
               </div>
               <h4 className="text-white font-orbitron font-bold">DRONE 7-B DISPATCHED</h4>
               <p className="text-cyan-400 text-xs font-bold animate-pulse">ESTIMATED ARRIVAL: 4m 22s</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 glass border-l border-white/10 p-8">
          <h3 className="text-xl font-orbitron font-bold text-white mb-8">LOGISTICS STATUS</h3>
          
          <div className="space-y-8">
            <div className="flex gap-4">
               <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_#00f3ff]"></div>
                  <div className="w-[1px] h-12 bg-cyan-500/30 my-1"></div>
               </div>
               <div>
                  <h5 className="text-white font-bold text-sm">Molecular Sync</h5>
                  <p className="text-gray-500 text-xs">Ingredients validated & synthesized</p>
               </div>
            </div>

            <div className="flex gap-4">
               <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_#00f3ff]"></div>
                  <div className="w-[1px] h-12 bg-cyan-500/30 my-1"></div>
               </div>
               <div>
                  <h5 className="text-white font-bold text-sm">Thermal Packaging</h5>
                  <p className="text-gray-500 text-xs">Temp-lock initiated (65°C stable)</p>
               </div>
            </div>

            <div className="flex gap-4">
               <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse"></div>
                  <div className="w-[1px] h-12 bg-white/10 my-1"></div>
               </div>
               <div>
                  <h5 className="text-white font-bold text-sm">Air-Corridor Transit</h5>
                  <p className="text-gray-500 text-xs">Altitude: 300m | Speed: 45km/h</p>
               </div>
            </div>

            <div className="flex gap-4">
               <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-white/10"></div>
               </div>
               <div>
                  <h5 className="text-gray-500 font-bold text-sm">Docking Complete</h5>
                  <p className="text-gray-600 text-xs">Awaiting dropzone clearance</p>
               </div>
            </div>
          </div>

          <button className="w-full mt-12 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all">
            Contact Flight Control
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderTracking;
