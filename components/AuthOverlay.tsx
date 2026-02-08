
import React, { useState } from 'react';

interface AuthOverlayProps {
  onLogin: (phone: string) => void;
}

const AuthOverlay: React.FC<AuthOverlayProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp' | 'syncing'>('phone');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      setStep('syncing');
      setTimeout(() => onLogin(phone), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            {/* New Burger Logo Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 10c0-3.866-4.03-7-9-7s-9 3.134-9 7" /> {/* Top Bun */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 10h20a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2z" /> {/* Patty */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 15h20v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1z" /> {/* Bottom Bun */}
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Login to BhookLagii</h2>
          <p className="text-gray-500 font-medium">Verify your phone to start ordering</p>
        </div>

        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div className="text-left space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Phone Number</label>
              <div className="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-4 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600/20 transition-all">
                <span className="text-gray-900 font-bold border-r pr-3 mr-3">+91</span>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter phone number"
                  className="w-full bg-transparent focus:outline-none font-semibold text-gray-900"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 10c0-3.866-4.03-7-9-7s-9 3.134-9 7" /> {/* Top Bun */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 10h20a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2z" /> {/* Patty */}
              </svg>
              Get OTP
            </button>
          </form>
        )}

        {step === 'otp' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <p className="text-gray-500">We've sent a 4-digit code to {phone}</p>
            <div className="flex justify-center gap-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-14 h-16 bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl font-bold text-gray-900 focus:outline-none focus:border-blue-600 transition-all"
                />
              ))}
            </div>
            <button onClick={() => setStep('phone')} className="text-sm font-bold text-gray-400 hover:text-blue-600">Change Number</button>
          </div>
        )}

        {step === 'syncing' && (
          <div className="py-10">
            <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Authenticating...</p>
          </div>
        )}

        <p className="mt-12 text-xs text-gray-400 font-medium leading-relaxed">
          By continuing, you agree to our <br/> <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default AuthOverlay;
