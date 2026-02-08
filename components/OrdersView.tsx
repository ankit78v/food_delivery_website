
import React from 'react';
import { MOCK_ORDER_HISTORY } from '../constants';

interface OrdersViewProps {
  onTrackOrder: () => void;
}

const OrdersView: React.FC<OrdersViewProps> = ({ onTrackOrder }) => {
  // Adding a mock active order for demonstration
  const activeOrder = {
    id: 'BHK-2024',
    restaurantName: 'The Royal Kitchen',
    date: 'Just Now',
    total: 450,
    status: 'transit',
    deliveryOtp: '5892', // Static mock for active order
    items: [{ name: 'Butter Chicken Bowl', quantity: 1 }]
  };

  const history = [activeOrder, ...MOCK_ORDER_HISTORY];

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-12 px-2">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Orders</h2>
        <p className="text-slate-500 font-medium">View and track your culinary adventures</p>
      </div>

      <div className="space-y-6">
        {history.map((order, idx) => (
          <div key={order.id} className={`bg-white p-8 rounded-[2.5rem] border ${order.status === 'transit' ? 'border-blue-100 shadow-blue-50/50' : 'border-slate-100'} hover:shadow-xl transition-all group`}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 ${order.status === 'transit' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-400'} rounded-[1.25rem] flex items-center justify-center text-2xl border border-slate-100`}>
                  {order.status === 'transit' ? '🚚' : '🥡'}
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{order.restaurantName}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-slate-900">₹{order.total}</p>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg mt-2 inline-block ${
                  order.status === 'delivered' ? 'bg-green-50 text-green-600' : 
                  order.status === 'transit' ? 'bg-blue-50 text-blue-600 animate-pulse' : 'bg-red-50 text-red-600'
                }`}>
                  {order.status === 'transit' ? 'In Transit' : order.status}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-50">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item: any, i) => (
                    <span key={i} className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] text-slate-500 font-bold border border-slate-100 uppercase tracking-wide">
                      {item.quantity} × {item.name}
                    </span>
                  ))}
                </div>
                
                {order.status === 'transit' && (
                  <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 w-fit">
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Delivery OTP</span>
                    <span className="text-sm font-black text-blue-600 tracking-[0.2em]">{(order as any).deliveryOtp}</span>
                  </div>
                )}
              </div>
              
              {order.status === 'transit' && (
                <button 
                  onClick={onTrackOrder}
                  className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Track Live
                </button>
              )}
              
              {order.status === 'delivered' && (
                <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">
                  Reorder
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrdersView;
