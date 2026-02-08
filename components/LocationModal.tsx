
import React, { useState, useEffect } from 'react';
import { searchPlaces } from '../services/geminiService';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{title: string, uri: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.length > 2) {
        setIsLoading(true);
        const places = await searchPlaces(search, userCoords?.lat, userCoords?.lng);
        setResults(places);
        setIsLoading(false);
      } else if (search.length === 0) {
        setResults([]);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [search, userCoords]);

  if (!isOpen) return null;

  const handleUseCurrent = () => {
    if (navigator.geolocation) {
      onSelect('Fetching location data...');
      navigator.geolocation.getCurrentPosition((pos) => {
        onSelect(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        onClose();
      }, () => {
        onSelect('Location access denied');
        onClose();
      });
    }
  };

  const popularPlaces = [
    { title: 'Indiranagar, Bengaluru' },
    { title: 'Hauz Khas, New Delhi' },
    { title: 'Powai, Mumbai' },
    { title: 'Cyber Hub, Gurgaon' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Set Delivery Location</h3>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Powered by Google Maps
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="relative mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Enter area, street or city..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-900"
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <button 
            onClick={handleUseCurrent}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-all mb-8 group"
          >
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-blue-600 font-bold text-sm">Use my current location</p>
              <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wide">Accurate via Browser GPS</p>
            </div>
          </button>

          <div className="space-y-1 max-h-[300px] overflow-y-auto no-scrollbar">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3">
              {results.length > 0 ? 'Verified Places' : 'Popular Search Results'}
            </h4>
            {(results.length > 0 ? results : popularPlaces).map((place, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  onSelect(place.title);
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-3.5 hover:bg-slate-50 rounded-xl transition-all text-left border border-transparent hover:border-slate-100 group"
              >
                <div className="p-2.5 bg-slate-100 rounded-xl group-hover:bg-blue-100 transition-colors">
                  <svg className="h-5 w-5 text-slate-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-sm font-semibold text-slate-700 block truncate">{place.title}</span>
                  {idx < results.length && (
                    <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tight">Verified Address</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
