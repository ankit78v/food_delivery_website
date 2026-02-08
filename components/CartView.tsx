
import React from 'react';
import { CartItem } from '../types';

interface CartViewProps {
  items: CartItem[];
  onUpdate: (id: string, delta: number) => void;
  onCheckout: () => void;
  onBack: () => void;
}

const CartView: React.FC<CartViewProps> = ({ items, onUpdate, onCheckout, onBack }) => {
  const subtotal = items.reduce((a, b) => a + (b.price * b.quantity), 0);
  const deliveryFee = subtotal > 0 ? 35 : 0;
  const platformCharges = subtotal > 0 ? 15 : 0;
  const total = subtotal + deliveryFee + platformCharges;

  return (
    <div className="pt-24 pb-12 max-w-4xl mx-auto px-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="p-2.5 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="text-3xl font-black text-black tracking-tight">Your Order</h2>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-[3rem] border border-gray-100">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
             <svg className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
             </svg>
          </div>
          <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs mb-8">Cart is currently empty</p>
          <button onClick={onBack} className="primary-btn px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Start Shopping</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] flex gap-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" alt={item.name} />
                <div className="flex-1">
                  <h4 className="text-lg font-black text-black mb-1">{item.name}</h4>
                  <p className="text-blue-600 font-black text-sm">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-5 py-2 self-center border border-gray-100">
                  <button onClick={() => onUpdate(item.id, -1)} className="text-blue-600 font-black hover:scale-125 transition-transform">-</button>
                  <span className="font-black text-sm min-w-[20px] text-center">{item.quantity}</span>
                  <button onClick={() => onUpdate(item.id, 1)} className="text-blue-600 font-black hover:scale-125 transition-transform">+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl h-fit">
            <h3 className="text-[10px] font-black text-gray-400 mb-8 uppercase tracking-[0.3em]">Payment Summary</h3>
            <div className="space-y-4 mb-10">
              <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-widest">
                <span>Items Total</span>
                <span className="text-black">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-widest">
                <span>Delivery Partner Fee</span>
                <span className="text-blue-600">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-widest">
                <span>Platform Convenience</span>
                <span className="text-black">₹{platformCharges}</span>
              </div>
              <div className="h-[1px] bg-gray-100 my-6"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-black text-black uppercase tracking-widest">To Pay</span>
                <span className="text-3xl font-black text-blue-600">₹{total}</span>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full py-5 primary-btn font-black rounded-2xl shadow-xl uppercase tracking-[0.2em] text-xs"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
