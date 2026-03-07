import React, { useState } from 'react';
import { 
  FiSearch, FiPrinter, FiTruck, FiCheckCircle, 
  FiXCircle, FiEye, FiDownload, FiClock, 
  FiPackage, FiX, FiMapPin, FiUser, FiAlertCircle, FiActivity
} from 'react-icons/fi';

export default function OrderLogs() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmUpdate, setConfirmUpdate] = useState(null);

  const statusOptions = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  const [allOrders, setAllOrders] = useState([
    { 
        id: "ST-99102", customer: "Javeria Khan", phone: "0300-1234567", 
        date: "Mar 07, 2026", time: "10:30 AM", amount: "12,999", status: "Pending", 
        items: 2, address: "House 12, Street 4, Satellite Town, Bahawalpur",
        products: [{name: "Midnight Silk Wrap", qty: 1, price: "8,500"}, {name: "Glow Serum", qty: 1, price: "4,499"}]
    },
    { 
        id: "ST-99101", customer: "Allah Nawaz", phone: "0321-7654321", 
        date: "Mar 06, 2026", time: "02:15 PM", amount: "4,500", status: "Delivered", 
        items: 1, address: "Plot 45, Industrial Area, Jalal Pur Pirwala",
        products: [{name: "Oxford Cotton Shirt", qty: 1, price: "4,500"}]
    },
    { 
        id: "ST-99100", customer: "Ahmed Ali", phone: "0333-9876543", 
        date: "Mar 05, 2026", time: "11:45 AM", amount: "8,200", status: "Shipped", 
        items: 3, address: "Apartment 5B, Gulgasht Colony, Multan",
        products: [{name: "Hoop Earrings", qty: 2, price: "4,000"}, {name: "Face Wash", qty: 1, price: "4,200"}]
    },
  ]);

  const displayedOrders = activeFilter === 'All' 
    ? allOrders 
    : allOrders.filter(order => order.status === activeFilter);

  const handleExecuteUpdate = () => {
    setAllOrders(prev => prev.map(order => 
      order.id === confirmUpdate.orderId ? { ...order, status: confirmUpdate.newStatus, recentlyUpdated: true } : order
    ));
    setConfirmUpdate(null);
    setSelectedOrder(null);
    
    // Clear update highlight after 2 seconds
    setTimeout(() => {
      setAllOrders(prev => prev.map(o => ({...o, recentlyUpdated: false})));
    }, 2000);
  };

  const customStyles = `
    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGreen {
      0% { background-color: transparent; }
      50% { background-color: rgba(16, 185, 129, 0.08); }
      100% { background-color: transparent; }
    }
    .animate-cascade {
      opacity: 0;
      animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `;

  return (
    <div className="space-y-8 pb-10 w-full relative">
      <style>{customStyles}</style>
      
      {/* 1. HEADER (Entrance 0ms) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-cascade" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Order Registry</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-2">Manage COD Lifecycle & Logistics</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-200 text-slate-600 px-5 py-3 rounded-xl text-xs font-bold uppercase flex items-center gap-2 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95">
              <FiPrinter size={16} /> Batch Print
           </button>
           <button className="bg-[#007074] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase flex items-center gap-2 hover:bg-[#005a5d] shadow-lg shadow-[#007074]/30 transition-all transform hover:-translate-y-0.5 active:scale-95">
              <FiDownload size={16} /> Export CSV
           </button>
        </div>
      </div>

      {/* 2. DYNAMIC FILTERS (Entrance 100ms) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide animate-cascade" style={{ animationDelay: '100ms' }}>
        {['All', ...statusOptions].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border-2 active:scale-90 ${
              activeFilter === f 
              ? 'bg-[#007074] text-white border-[#007074] shadow-md scale-105' 
              : 'bg-white text-slate-500 border-slate-100 hover:border-[#007074] hover:text-[#007074]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 3. SEARCH & TABLE (Entrance 200ms) */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden animate-cascade" style={{ animationDelay: '200ms' }}>
        <div className="p-6 border-b border-slate-100 relative group">
           <FiSearch className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007074] transition-colors" size={20} />
           <input 
             type="text" 
             placeholder="Search customers or IDs..." 
             className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/10 rounded-xl text-sm font-semibold text-slate-900 outline-none transition-all shadow-sm"
           />
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Order</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedOrders.map((order, idx) => (
                <tr 
                  key={order.id} 
                  className={`transition-all duration-300 group cursor-pointer hover:bg-teal-50/30 ${order.recentlyUpdated ? 'status-update-pulse' : ''}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="px-8 py-6 group-hover:translate-x-1 transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#007074] group-hover:text-white transition-all">
                        <FiPackage size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{order.id}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{order.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    <p className="text-sm font-bold text-slate-800">{order.customer}</p>
                    <p className="text-xs text-slate-400">{order.phone}</p>
                  </td>
                  <td className="px-8 py-6 group-hover:translate-x-1 transition-transform duration-300 delay-100">
                    <p className="text-base font-black text-slate-900">Rs. {order.amount}</p>
                  </td>
                  <td className="px-8 py-6 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-8 py-6 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-3">
                       <button className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-[#007074] hover:bg-teal-50 rounded-xl transition-all shadow-sm active:scale-90 transform hover:-translate-y-0.5">
                          <FiPrinter size={16}/>
                       </button>
                       <button onClick={() => setSelectedOrder(order)} className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-[#007074] hover:bg-teal-50 rounded-xl transition-all shadow-sm active:scale-90 transform hover:-translate-y-0.5">
                          <FiEye size={16}/>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL: ORDER DETAILS --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-500 animate-modal">
            {/* Modal Content remains the same as previous logic for Detail & Status Update UI */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#007074] rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <FiPackage size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-none">{selectedOrder.id}</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Update Logistics</p>
                  </div>
               </div>
               <button onClick={() => setSelectedOrder(null)} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-colors shadow-sm active:scale-90">
                  <FiX size={20} />
               </button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2"><FiUser/> Client Info</h3>
                    <p className="text-base font-bold text-slate-900">{selectedOrder.customer}</p>
                    <p className="text-sm font-medium text-slate-500">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2"><FiMapPin/> Delivery Address</h3>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic">"{selectedOrder.address}"</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2"><FiActivity/> Update Status</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {statusOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setConfirmUpdate({ orderId: selectedOrder.id, newStatus: opt })}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all flex items-center justify-between border ${
                          selectedOrder.status === opt 
                          ? 'bg-[#007074] text-white border-[#007074] shadow-md ring-4 ring-teal-50' 
                          : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {opt}
                        {selectedOrder.status === opt && <FiCheckCircle size={14} />}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION MODAL --- */}
      {confirmUpdate && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fadeIn" />
            <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 text-center animate-modal">
               <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FiAlertCircle size={32} />
               </div>
               <h2 className="text-xl font-bold text-slate-900 mb-2">Change status?</h2>
               <p className="text-sm text-slate-500 leading-relaxed mb-8">
                  Updating this order to <span className="font-bold text-[#007074]">{confirmUpdate.newStatus}</span>. This action will be logged.
               </p>
               <div className="flex gap-3">
                  <button onClick={() => setConfirmUpdate(null)} className="flex-1 py-3.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold uppercase hover:bg-slate-200 transition-colors">Abort</button>
                  <button onClick={handleExecuteUpdate} className="flex-1 py-3.5 rounded-xl bg-[#007074] text-white text-xs font-bold uppercase shadow-lg shadow-[#007074]/30 hover:bg-[#005a5d] transition-all active:scale-95">Confirm</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const configs = {
    Pending: "bg-orange-50 text-orange-600 border-orange-200",
    Confirmed: "bg-blue-50 text-blue-600 border-blue-200",
    Shipped: "bg-purple-50 text-purple-600 border-purple-100",
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Cancelled: "bg-red-50 text-red-600 border-red-200",
  };
  return (
    <span className={`inline-flex items-center px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-500 group-hover:shadow-sm ${configs[status] || configs.Pending}`}>
      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${status === 'Pending' ? 'bg-orange-500 animate-pulse' : 'bg-current'}`} />
      {status}
    </span>
  );
}