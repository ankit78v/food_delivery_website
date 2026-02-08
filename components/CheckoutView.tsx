
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutViewProps {
  items: CartItem[];
  onBack: () => void;
  onPaymentComplete: () => void;
}

type PaymentMethod = 'gpay' | 'phonepe' | 'upi' | 'card' | 'netbanking' | 'cod';

const CheckoutView: React.FC<CheckoutViewProps> = ({ items, onBack, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Address State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressLabel, setAddressLabel] = useState('Home');
  const [addressDetails, setAddressDetails] = useState('402, Quantum Heights, Sector 7, Cyber City');
  const [tempLabel, setTempLabel] = useState(addressLabel);
  const [tempDetails, setTempDetails] = useState(addressDetails);

  const subtotal = items.reduce((a, b) => a + (b.price * b.quantity), 0);
  const deliveryFee = subtotal > 0 ? 35 : 0;
  const platformCharges = subtotal > 0 ? 15 : 0;
  const total = subtotal + deliveryFee + platformCharges;

  const handlePay = () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    // Simulate payment gateway processing or order placement
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  const saveAddress = () => {
    setAddressLabel(tempLabel);
    setAddressDetails(tempDetails);
    setIsEditingAddress(false);
  };

  const paymentOptions = [
    { id: 'gpay', name: 'Google Pay', icon: 'https://cdn-icons-png.flaticon.com/512/6124/6124998.png', category: 'UPI' },
    { id: 'phonepe', name: 'PhonePe', icon: 'https://cdn-icons-png.flaticon.com/512/825/825454.png', category: 'UPI' },
    { id: 'upi', name: 'Other UPI ID', icon: 'https://cdn-icons-png.flaticon.com/512/270/270791.png', category: 'UPI' },
    { id: 'card', name: 'Credit / Debit Card', icon: 'https://cdn-icons-png.flaticon.com/512/633/633611.png', category: 'CARDS' },
    { id: 'netbanking', name: 'Net Banking', icon: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png', category: 'OTHERS' },
    { id: 'cod', name: 'Cash On Delivery', icon: 'https://cdn-icons-png.flaticon.com/512/2331/2331895.png', category: 'CASH' },
  ];

  return (
    <div className="pt-24 pb-12 max-w-5xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="p-2.5 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="text-3xl font-black text-black tracking-tight">Checkout</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Address Section */}
          <section className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Delivery Address</h3>
              {!isEditingAddress && (
                <button 
                  onClick={() => setIsEditingAddress(true)}
                  className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline"
                >
                  Edit Address
                </button>
              )}
            </div>
            
            {isEditingAddress ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Label (e.g. Home, Office)</label>
                  <input 
                    type="text" 
                    value={tempLabel}
                    onChange={(e) => setTempLabel(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Address Details</label>
                  <textarea 
                    value={tempDetails}
                    onChange={(e) => setTempDetails(e.target.value)}
                    rows={2}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-sm resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={saveAddress}
                    className="flex-1 bg-blue-600 text-white font-black py-3 rounded-xl text-[10px] uppercase tracking-widest shadow-lg hover:bg-blue-700 transition-all"
                  >
                    Save Address
                  </button>
                  <button 
                    onClick={() => {
                      setTempLabel(addressLabel);
                      setTempDetails(addressDetails);
                      setIsEditingAddress(false);
                    }}
                    className="px-6 bg-white border border-gray-200 text-gray-400 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-black text-black">{addressLabel}</p>
                  <p className="text-xs text-gray-500 font-medium">{addressDetails}</p>
                </div>
              </div>
            )}
          </section>

          <section>
            <h3 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-[0.3em]">Choose Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedMethod(option.id as PaymentMethod)}
                  className={`flex items-center gap-4 p-5 rounded-[2rem] border-2 transition-all text-left ${
                    selectedMethod === option.id 
                    ? 'border-blue-600 bg-blue-50/50 shadow-lg' 
                    : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 p-2 flex items-center justify-center">
                    <img src={option.icon} alt={option.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">{option.category}</p>
                    <p className="font-black text-black text-sm">{option.name}</p>
                  </div>
                  {selectedMethod === option.id && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl h-fit">
            <h3 className="text-[10px] font-black text-gray-400 mb-8 uppercase tracking-[0.3em]">Order Summary</h3>
            <div className="space-y-4 mb-10 max-h-[200px] overflow-y-auto no-scrollbar pr-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold">{item.quantity} x {item.name}</span>
                  <span className="text-black font-black">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="h-[1px] bg-gray-50 my-2"></div>
              <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-widest">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-widest">
                <span>Delivery</span>
                <span className="text-blue-600">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-widest">
                <span>Convenience</span>
                <span>₹{platformCharges}</span>
              </div>
              <div className="h-[1px] bg-gray-100 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-black text-black uppercase tracking-widest">Total</span>
                <span className="text-3xl font-black text-blue-600">₹{total}</span>
              </div>
            </div>

            <button 
              onClick={handlePay}
              disabled={!selectedMethod || isProcessing || isEditingAddress}
              className={`w-full py-5 font-black rounded-2xl shadow-xl uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 ${
                !selectedMethod || isProcessing || isEditingAddress
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {isEditingAddress ? 'Finish Editing Address' : (selectedMethod === 'cod' ? `Place Order • ₹${total}` : `Pay ₹${total}`)}
                  {!isEditingAddress && (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </>
              )}
            </button>
            <p className="text-center text-[8px] text-gray-400 mt-6 uppercase tracking-[0.3em] font-black">
              Quantum Secure • 256-Bit Encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
