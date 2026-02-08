
import React from 'react';

interface LandingViewProps {
  onGetStarted: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(37,99,235,0.15),_transparent_70%)]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] animate-pulse delay-700"></div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px)',
          transformOrigin: 'top'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center">
        {/* Brand Reveal */}
        <div className="mb-8 animate-in fade-in zoom-in duration-1000">
           <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(37,99,235,0.5)] border border-blue-400/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 10c0-3.866-4.03-7-9-7s-9 3.134-9 7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 10h20a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 15h20v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1z" />
            </svg>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 italic">
            BHOOK<span className="text-blue-500">LAGII</span>
          </h1>
          <p className="text-blue-400 font-bold uppercase tracking-[0.6em] text-sm md:text-base mb-12">
            The Future of Food Delivery
          </p>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-20 animate-in slide-in-from-bottom-10 duration-1000 delay-300">
          {[
            { icon: '🧠', title: 'Neural Cravings', desc: 'AI-powered suggestions based on your biometric profile.' },
            { icon: '🚁', title: 'Mach-1 Transit', desc: 'Automated drone swarm delivery system for sub-15m arrivals.' },
            { icon: '🔋', title: 'Bio-Sync', desc: 'Real-time nutritional tracking synced with your wellness dashboard.' }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all hover:scale-105 group">
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-black mb-3 tracking-tight text-blue-100">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-in fade-in duration-1000 delay-500">
          <button 
            onClick={onGetStarted}
            className="group relative px-16 py-6 bg-blue-600 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:bg-blue-500 transition-all active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-4">
              Enter The Grid
              <svg className="h-5 w-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity"></div>
          </button>
          
          <p className="mt-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
            Encryption Status: <span className="text-green-500">Secure</span> | Server: <span className="text-blue-500">Indiranagar-01</span>
          </p>
        </div>
      </div>

      {/* Footer Scroller */}
      <div className="absolute bottom-0 left-0 right-0 py-4 bg-blue-600/5 border-t border-white/5 backdrop-blur-md overflow-hidden whitespace-nowrap">
        <div className="flex gap-20 animate-marquee text-[10px] font-black text-blue-500/50 uppercase tracking-[0.4em]">
          <span>Molecular Synthesized Ingredients</span>
          <span>Zero Emission Drone Swarm</span>
          <span>Health Metrics Verified</span>
          <span>Molecular Synthesized Ingredients</span>
          <span>Zero Emission Drone Swarm</span>
          <span>Health Metrics Verified</span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingView;
