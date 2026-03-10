import React, { useState, useMemo } from 'react';
import { 
  FiSearch, FiPrinter, FiTruck, FiCheckCircle, 
  FiXCircle, FiEye, FiDownload, FiClock, 
  FiPackage, FiX, FiMapPin, FiUser, FiAlertCircle, FiActivity, FiChevronDown
} from 'react-icons/fi';

export default function OrderLogs() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState(""); // 1. Added Search State
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

  // 2. FIXED SEARCH & FILTER LOGIC
  const displayedOrders = useMemo(() => {
    return allOrders.filter(order => {
      const matchesFilter = activeFilter === 'All' || order.status === activeFilter;
      const matchesSearch = 
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery);
      
      return matchesFilter && matchesSearch;
    });
  }, [allOrders, activeFilter, searchQuery]);

  const handleExecuteUpdate = () => {
    setAllOrders(prev => prev.map(order => 
      order.id === confirmUpdate.orderId ? { ...order, status: confirmUpdate.newStatus } : order
    ));
    setConfirmUpdate(null);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-10 w-full relative bg-white min-h-screen font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#222222] tracking-tight uppercase">Order Registry</h1>
          <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">Manage COD Lifecycle & Logistics</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex-1 md:flex-none bg-white border border-slate-200 text-slate-600 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
              <FiPrinter className="inline mr-2" /> Batch Print
           </button>
           <button className="flex-1 md:flex-none bg-[#007074] text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#007074]/20 hover:shadow-[#007074]/40 transition-all">
              <FiDownload className="inline mr-2" /> Export
           </button>
        </div>
      </div>

      {/* 2. DYNAMIC FILTERS */}
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 no-scrollbar">
        {['All', ...statusOptions].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
              activeFilter === f 
              ? 'bg-[#007074] text-white border-[#007074] shadow-md scale-105' 
              : 'bg-white text-slate-400 border-slate-50 hover:border-[#007074]/20 hover:text-[#007074]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 3. SEARCH & TABLE */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 relative group bg-slate-50/30">
           <FiSearch className="absolute left-8 md:left-10 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007074] transition-colors" size={18} />
           <input 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             type="text" 
             placeholder="Search name, ID, or phone..." 
             className="w-full pl-12 md:pl-14 pr-6 py-3.5 md:py-4 bg-white border-2 border-slate-100 focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/5 rounded-2xl text-sm font-bold text-[#222222] outline-none transition-all"
           />
        </div>

        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[850px]">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Order</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Valuation</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayedOrders.map((order) => (
                <tr key={order.id} className="transition-all hover:bg-[#007074]/5 group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#007074] group-hover:text-white transition-all shadow-inner">
                        <FiPackage size={18} />
                      </div>
                      <div>
                        <p className="text-[13px] font-black text-[#222222]">{order.id}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{order.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-[13px] font-bold text-[#222222]">{order.customer}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{order.phone}</p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-[#222222]">Rs. {order.amount}</p>
                  </td>
                  <td className="px-8 py-5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-8 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-[#007074] rounded-xl transition-all shadow-sm active:scale-90"><FiPrinter size={14}/></button>
                       <button onClick={() => setSelectedOrder(order)} className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-[#007074] rounded-xl transition-all shadow-sm active:scale-90"><FiEye size={14}/></button>
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
          <div className="absolute inset-0 bg-[#222222]/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#007074] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#007074]/30"><FiPackage size={20} /></div>
                  <div>
                    <h2 className="text-xl font-black text-[#222222] tracking-tighter">{selectedOrder.id}</h2>
                    <p className="text-[10px] text-[#007074] font-black uppercase tracking-widest mt-1">Order Logistics</p>
                  </div>
               </div>
               <button onClick={() => setSelectedOrder(null)} className="p-2.5 text-slate-400 hover:text-red-500 transition-colors"><FiX size={20} /></button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto space-y-8 custom-scrollbar">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2"><FiUser/> Client Info</h3>
                      <p className="text-sm font-bold text-[#222222]">{selectedOrder.customer}</p>
                      <p className="text-xs font-bold text-slate-400 mt-1">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2"><FiMapPin/> Shipping</h3>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed bg-[#007074]/5 p-4 rounded-2xl border border-[#007074]/10 italic">"{selectedOrder.address}"</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2"><FiActivity/> Update Logistics</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {statusOptions.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setConfirmUpdate({ orderId: selectedOrder.id, newStatus: opt })}
                          className={`w-full py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-left transition-all flex items-center justify-between border ${
                            selectedOrder.status === opt 
                            ? 'bg-[#007074] text-white border-[#007074] shadow-lg shadow-[#007074]/20' 
                            : 'bg-white text-slate-400 border-slate-100 hover:border-[#007074]/30 hover:bg-slate-50'
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
        </div>
      )}

      {/* --- CONFIRMATION MODAL --- */}
      {confirmUpdate && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#222222]/80 backdrop-blur-md animate-in fade-in duration-300" />
            <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 md:p-10 text-center animate-in zoom-in duration-300">
               <div className="w-20 h-20 bg-[#007074]/10 text-[#007074] rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <FiAlertCircle size={36} />
               </div>
               <h2 className="text-xl font-black text-[#222222] tracking-tighter uppercase">Commit Status?</h2>
               <p className="text-xs text-slate-400 font-bold leading-relaxed mb-8 mt-3">
                 Updating this shipment to <span className="text-[#007074]">{confirmUpdate.newStatus}</span>. This change is permanent.
               </p>
               <div className="flex gap-3">
                  <button onClick={() => setConfirmUpdate(null)} className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Abort</button>
                  <button onClick={handleExecuteUpdate} className="flex-1 py-4 rounded-2xl bg-[#007074] text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#007074]/30 active:scale-95 transition-all">Execute</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const configs = {
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
    Confirmed: "bg-blue-50 text-blue-600 border-blue-100",
    Shipped: "bg-purple-50 text-purple-600 border-purple-100",
    Delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${configs[status] || configs.Pending}`}>
      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${status === 'Pending' ? 'bg-orange-500 animate-pulse' : 'bg-current'}`} />
      {status}
    </span>
  );
}