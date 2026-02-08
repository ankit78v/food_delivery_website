
import React from 'react';
import { MOCK_ORDER_HISTORY } from '../constants';

const ProfileView: React.FC<{onLogout: () => void}> = ({ onLogout }) => {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white border border-gray-100 p-10 rounded-[3rem] shadow-xl mb-12 flex flex-col md:flex-row items-center gap-10">
        <div className="relative">
          <img src="https://picsum.photos/seed/user/200" alt="Profile" className="w-32 h-32 rounded-[2.5rem] border-4 border-blue-50 object-cover shadow-lg" />
          <button className="absolute -bottom-2 -right-2 bg-blue-600 p-3 rounded-2xl shadow-xl hover:bg-blue-700 transition-colors border-4 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-black text-black mb-2 tracking-tight">Aryan Sharma</h2>
          <p className="text-gray-400 font-bold text-sm mb-6 uppercase tracking-widest">Gold Member • Joined 2023</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="bg-gray-100 hover:bg-gray-200 px-6 py-2.5 rounded-xl text-[10px] font-black text-black uppercase tracking-widest transition-all">Edit Account</button>
            <button onClick={onLogout} className="bg-red-50 hover:bg-red-100 px-6 py-2.5 rounded-xl text-[10px] font-black text-red-600 uppercase tracking-widest transition-all">Sign Out</button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-xs font-black text-gray-400 px-2 uppercase tracking-[0.3em]">Previous Orders</h3>

        <div className="space-y-4">
          {MOCK_ORDER_HISTORY.map((order) => (
            <div key={order.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-[1.25rem] flex items-center justify-center text-2xl border border-blue-100">
                    🥡
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-black group-hover:text-blue-600 transition-colors">{order.restaurantName}</h4>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-black">₹{order.total}</p>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mt-2 inline-block ${
                    order.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-50">
                {order.items.map((item: any, idx) => (
                  <span key={idx} className="bg-gray-50 px-4 py-2 rounded-xl text-[10px] text-gray-500 font-bold border border-gray-100 uppercase tracking-wide">
                    {item.quantity} × {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileView;
