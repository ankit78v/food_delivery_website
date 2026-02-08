
import React, { useState, useEffect, useRef } from 'react';

const TrackingView: React.FC<{onFinish: () => void}> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [deliveryOtp] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const pathRef = useRef<SVGPathElement>(null);
  const [markerPos, setMarkerPos] = useState({ x: 20, y: 180, angle: 0 });
  const [pathLength, setPathLength] = useState(0);

  const waypoints = [
    { id: 'start', x: 20, y: 180, label: 'Kitchen' },
    { id: 'mid1', x: 120, y: 140, label: 'Pickup' },
    { id: 'mid2', x: 250, y: 100, label: 'On Way' },
    { id: 'end', x: 380, y: 20, label: 'Home' }
  ];

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }

    const stepTimer = setInterval(() => {
      setStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 4500);

    const progressTimer = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 0.15 : 100));
    }, 50);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      const currentPos = (progress / 100) * length;
      const point = pathRef.current.getPointAtLength(currentPos);
      const lookAhead = Math.min(currentPos + 1, length);
      const nextPoint = pathRef.current.getPointAtLength(lookAhead);
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      setMarkerPos({ x: point.x, y: point.y, angle: angle });
    }
  }, [progress]);

  const steps = [
    { label: 'Order Confirmed', desc: 'Restaurant is processing' },
    { label: 'Kitchen Prepared', desc: 'Deliciousness ready for dispatch' },
    { label: 'Partner Picked Up', desc: 'On its way to your location' },
    { label: 'Near Your Location', desc: 'Agent is just around the corner' },
    { label: 'Order Delivered', desc: 'Time to eat! Enjoy your meal.' }
  ];

  const pathData = `M ${waypoints[0].x} ${waypoints[0].y} Q 100 100 250 100 T ${waypoints[3].x} ${waypoints[3].y}`;

  return (
    <div className="pt-24 pb-12 max-w-6xl mx-auto px-4 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-2 bg-[#0a0f1e] h-[550px] rounded-[3rem] relative overflow-hidden border border-blue-900/30 shadow-2xl">
          <div className="absolute inset-0 opacity-[0.15]" style={{backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>

          <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full p-16 overflow-visible">
            <path d={pathData} stroke="#1e293b" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d={pathData} stroke="#334155" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="4 8" />
            <path 
              ref={pathRef}
              d={pathData} 
              stroke="#3b82f6" 
              strokeWidth="6" 
              fill="none" 
              strokeLinecap="round"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength - (progress / 100) * pathLength}
              className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-75"
            />
            
            {waypoints.map((wp, idx) => (
              <g key={wp.id} transform={`translate(${wp.x}, ${wp.y})`}>
                <circle r="6" fill={idx === 0 || idx === 3 ? "#3b82f6" : "#64748b"} className={idx === 0 || idx === 3 ? "animate-pulse" : ""} />
              </g>
            ))}

            <g transform={`translate(${markerPos.x}, ${markerPos.y}) rotate(${markerPos.angle})`}>
              <g transform="translate(-20, -35)">
                <ellipse cx="20" cy="30" rx="15" ry="5" fill="#3b82f6" opacity="0.3" className="animate-pulse" />
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="18" r="3" stroke="#fff" strokeWidth="2.5" fill="#1e293b"/>
                  <circle cx="17" cy="18" r="3" stroke="#fff" strokeWidth="2.5" fill="#1e293b"/>
                  <path d="M7 18L10 12H17" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M10 12L12 7H16" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="4" y="8" width="8" height="8" rx="2" fill="#2563eb" stroke="#fff" strokeWidth="1" />
                  <path d="M6 11H10M8 9V13" stroke="white" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="14" cy="4" r="2.5" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
                </svg>
              </g>
            </g>
          </svg>

          <div className="absolute top-8 left-8 flex flex-col gap-4">
            <div className="bg-slate-900/80 backdrop-blur-xl px-6 py-4 rounded-[1.5rem] border border-blue-500/30 shadow-2xl">
              <div className="flex items-center gap-3 mb-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Live Telemetry</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{Math.max(2, Math.ceil(15 - (progress/7)))}</span>
                <span className="text-xs font-bold text-blue-400">MINS REMAINING</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8">
            <div className="bg-slate-900/80 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Rider" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Agent Assigned</p>
                <p className="text-sm font-black text-white">Rohan Das <span className="text-blue-500 text-[10px] ml-2">★ 4.9</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl flex flex-col relative overflow-hidden">
            <h3 className="text-xs font-black text-slate-400 mb-8 uppercase tracking-[0.4em]">Delivery Security</h3>
            
            <div className="bg-blue-600 p-6 rounded-3xl text-center relative overflow-hidden group mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
              <p className="text-[10px] font-black text-blue-100 uppercase tracking-[0.3em] mb-3 relative z-10">Handover Code</p>
              <div className="flex justify-center gap-2 relative z-10">
                {deliveryOtp.split('').map((digit, idx) => (
                  <div key={idx} className="w-10 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl font-black text-white border border-white/30 shadow-inner">
                    {digit}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[9px] font-bold text-blue-200 uppercase tracking-wider relative z-10">Share this with the rider only</p>
            </div>

            <div className="space-y-8 relative flex-1">
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-50"></div>
              {steps.map((s, idx) => (
                <div key={idx} className={`flex gap-6 relative z-10 transition-all duration-700 ${idx > step ? 'opacity-20 grayscale' : 'opacity-100'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    idx < step ? 'border-blue-600 bg-blue-600 text-white' : 
                    idx === step ? 'border-blue-600 bg-white text-blue-600 scale-110 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 
                    'border-slate-200 bg-white text-slate-200'
                  }`}>
                    {idx < step ? (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : <div className={`w-1.5 h-1.5 rounded-full bg-current ${idx === step ? 'animate-ping' : ''}`}></div>}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-black text-sm uppercase tracking-tight ${idx === step ? 'text-blue-600' : 'text-slate-900'}`}>{s.label}</h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {step === 4 && (
              <button 
                onClick={onFinish}
                className="w-full mt-10 py-5 bg-blue-600 text-white font-black rounded-3xl shadow-2xl hover:bg-blue-700 transition-all uppercase tracking-[0.2em] text-[10px] animate-in slide-in-from-bottom-4"
              >
                Accept Delivery
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingView;
