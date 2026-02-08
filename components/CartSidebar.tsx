
import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 45;
  const tax = subtotal * 0.12;
  const total = subtotal + deliveryFee + tax;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md h-full glass border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-orbitron font-bold text-white tracking-tighter">ORDER STACK</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Stack is empty. Sync nutrition modules to begin.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 glass p-4 rounded-2xl border-white/5 group">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-gray-600 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-cyan-400 font-bold">₹{item.price * item.quantity}</p>
                    <div className="flex items-center gap-3 glass border border-white/10 px-2 py-1 rounded-lg">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-gray-400 hover:text-white px-1">-</button>
                      <span className="text-xs text-white min-w-[12px] text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-gray-400 hover:text-white px-1">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-black/40">
          <div className="space-y-2 mb-6 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Drone Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-lg pt-4 border-t border-white/5">
              <span>Final Creditor Due</span>
              <span className="text-cyan-400">₹{total.toFixed(0)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
             <button className="py-3 glass border border-white/10 rounded-xl flex flex-col items-center justify-center hover:border-cyan-500 transition-all">
                <span className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">UPI / WALLET</span>
                <span className="text-[10px] font-bold text-white">SMART PAY</span>
             </button>
             <button className="py-3 glass border border-white/10 rounded-xl flex flex-col items-center justify-center hover:border-purple-500 transition-all">
                <span className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">CRYPTO</span>
                <span className="text-[10px] font-bold text-white">SOL / BTC</span>
             </button>
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-orbitron font-black rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,243,255,0.3)] flex items-center justify-center gap-2">
            INITIALIZE CHECKOUT
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </button>
          
          <p className="text-center text-[8px] text-gray-600 mt-4 uppercase tracking-[0.3em]">
            Secured by Quantum-Encryption v4
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
