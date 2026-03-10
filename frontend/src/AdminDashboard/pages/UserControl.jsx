import React, { useState } from 'react';
import { 
  FiSearch, FiUserCheck, FiUserX, FiEye, 
  FiShield, FiSlash, FiX, FiCalendar, FiShoppingBag, FiAlertTriangle
} from 'react-icons/fi';

export default function UserControl() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Active");

  const [viewUser, setViewUser] = useState(null);
  const [actionUser, setActionUser] = useState(null);

  const [users, setUsers] = useState([
    { 
      id: 1, name: "Allah Nawaz", email: "nawaz51412@gmail.com", phone: "0300-1234567", 
      status: "Active", totalOrders: 12, totalSpend: "142,000", joined: "Jan 15, 2026",
      recentPurchases: ["Silk Satin Slip Dress", "Onyx Chronograph"]
    },
    { 
      id: 2, name: "Javeria Khan", email: "javeria@stylogist.pk", phone: "0301-7654321", 
      status: "Active", totalOrders: 24, totalSpend: "210,500", joined: "Feb 02, 2026",
      recentPurchases: ["Velvet Midnight Wrap", "Radiance C Serum", "Classic Oxford"]
    },
    { 
      id: 3, name: "Ahmed Ali", email: "ahmed.ali@domain.com", phone: "0333-9876543", 
      status: "Active", totalOrders: 3, totalSpend: "15,400", joined: "Feb 28, 2026",
      recentPurchases: ["Gold Minimalist Hoop Earrings"]
    },
    { 
      id: 4, name: "Fake Buyer", email: "spam_user@mail.com", phone: "0345-0000000", 
      status: "Blocked", totalOrders: 0, totalSpend: "0", joined: "Mar 01, 2026",
      recentPurchases: []
    },
    { 
      id: 5, name: "Scam Account", email: "fake.order@drop.com", phone: "0321-1111111", 
      status: "Blocked", totalOrders: 2, totalSpend: "0", joined: "Mar 05, 2026",
      recentPurchases: ["Returned: Silk Scarf", "Cancelled: Watch"]
    }
  ]);

  const displayedUsers = users.filter(user => {
    const matchesTab = user.status === activeTab;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  const handleToggleStatus = () => {
    setUsers(users.map(u => {
      if (u.id === actionUser.id) {
        return { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' };
      }
      return u;
    }));
    setActionUser(null);
  };

  const customStyles = `
    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes modalPop {
      0% { opacity: 0; transform: scale(0.95) translateY(10px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-cascade { opacity: 0; animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-modal { animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  `;

  return (
    <div className="space-y-8 pb-10 w-full relative">
      <style>{customStyles}</style>
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-cascade" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Customer Intelligence</h1>
          <p className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-wider mt-1">
            Manage User Access & Lifetime Value
          </p>
        </div>
        <div className="flex justify-between bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm">
           {['Active', 'Blocked'].map((tab) => (
             <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
                  activeTab === tab 
                  ? (tab === 'Active' ? 'bg-[#007074] text-white shadow-md shadow-[#007074]/30' : 'bg-red-600 text-white shadow-md shadow-red-600/30')
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
             >
               {tab === 'Active' ? <FiShield size={14} /> : <FiSlash size={14} />}
               {tab === 'Active' ? 'Active Users' : 'Blacklist'}
             </button>
           ))}
        </div>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="relative group animate-cascade" style={{ animationDelay: '100ms' }}>
        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007074] transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search customers by name, email, or phone number..." 
          className="w-full bg-white border-2 border-transparent rounded-2xl py-3.5 pl-12 pr-6 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] outline-none focus:ring-4 focus:ring-[#007074]/10 focus:border-[#007074]/30 transition-all hover:border-slate-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 3. COMPACT USER DIRECTORY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden animate-cascade" style={{ animationDelay: '200ms' }}>
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse table-auto">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Contact</th>
                <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Joined</th>
                <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Lifetime Value</th>
                <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-16 text-center text-slate-500 text-sm font-semibold">
                    No customers found matching your criteria.
                  </td>
                </tr>
              ) : (
                displayedUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors duration-300 group cursor-pointer animate-cascade" style={{ animationDelay: `${300 + (index * 50)}ms` }}>
                    
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#007074] flex items-center justify-center text-white font-black text-xs shadow-sm group-hover:scale-105 transition-transform">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-[#007074] transition-colors">{user.name}</span>
                          <span className="text-[11px] font-medium text-slate-500">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-xs font-semibold text-slate-700">{user.phone}</span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-xs font-medium text-slate-600">{user.joined}</span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-black text-slate-900 group-hover:text-[#007074] transition-colors">Rs. {user.totalSpend}</span>
                        <span className="text-[10px] font-bold text-slate-400 ml-2 border-l border-slate-300 pl-2 tracking-wider uppercase">
                           {user.totalOrders} {user.totalOrders === 1 ? 'Order' : 'Orders'}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
                        user.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                        : 'bg-red-100 text-red-700 border-red-200'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-600'}`} />
                        {user.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => setViewUser(user)}
                          title="View Profile" 
                          className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-[#007074] hover:bg-teal-50 hover:border-teal-200 rounded-lg transition-all shadow-sm active:scale-95"
                        >
                          <FiEye size={14} />
                        </button>
                        
                        {user.status === 'Active' ? (
                          <button 
                            onClick={() => setActionUser(user)}
                            title="Block User" 
                            className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-red-500 hover:border-red-600 rounded-lg transition-all shadow-sm active:scale-95"
                          >
                            <FiUserX size={14} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => setActionUser(user)}
                            title="Unblock User" 
                            className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-green-500 hover:border-green-600 rounded-lg transition-all shadow-sm active:scale-95"
                          >
                            <FiUserCheck size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 4. VIEW USER MODAL --- */}
      {viewUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setViewUser(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-modal">
             <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                   <div className="md:w-14 md:h-14 h-7 w-7 text-[12px] rounded-2xl bg-[#007074] flex items-center justify-center text-white font-serif font-black md:text-xl shadow-lg">
                      {viewUser.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">{viewUser.name}</h2>
                      <p className="text-xs font-semibold text-slate-500 mt-1 flex-wrap flex items-center gap-2">
                        {viewUser.email} <span className="md:text-sm text-slate-300">•</span> {viewUser.phone}
                      </p>
                   </div>
                </div>
                <button onClick={() => setViewUser(null)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-sm">
                   <FiX size={18} />
                </button>
             </div>
             <div className="md:p-6 p-2">
                <div className="grid grid-cols-3 gap-3 md:mb-6 mb-2">
                   <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Lifetime Value</p>
                      <p className="md:text-lg text-[12px] font-black text-[#007074]">Rs. {viewUser.totalSpend}</p>
                   </div>
                   <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Orders</p>
                      <p className="md:text-lg text-[12px] font-black text-slate-900">{viewUser.totalOrders}</p>
                   </div>
                   <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Member Since</p>
                      <p className="md:text-sm text-[10px] font-bold text-slate-900 mt-1">{viewUser.joined}</p>
                   </div>
                </div>
                <div>
                   <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                     <FiShoppingBag size={14} /> Recent Purchases
                   </h3>
                   <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                      {viewUser.recentPurchases.length > 0 ? (
                        viewUser.recentPurchases.map((item, i) => (
                          <div key={i} className="px-4 py-2.5 border border-slate-100 rounded-lg bg-white flex items-center gap-3 text-xs font-semibold text-slate-800 shadow-sm">
                             <div className="w-1.5 h-1.5 bg-[#007074] rounded-full" />
                             {item}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs font-medium text-slate-400 bg-slate-50 p-4 rounded-lg border border-slate-100">
                          This user has not made any purchases yet.
                        </p>
                      )}
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* --- 5. SECURITY CONFIRMATION MODAL --- */}
      {actionUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={() => setActionUser(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl p-8 text-center animate-modal">
             <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-inner ${
                actionUser.status === 'Active' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
             }`}>
                {actionUser.status === 'Active' ? <FiAlertTriangle size={28} /> : <FiUserCheck size={28} />}
             </div>
             <h2 className="text-xl font-bold text-slate-900 mb-2">
                {actionUser.status === 'Active' ? 'Suspend Account?' : 'Restore Account?'}
             </h2>
             <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed px-2">
                {actionUser.status === 'Active' 
                  ? `Are you sure you want to block ${actionUser.name}? They will no longer be able to log in or place Cash on Delivery orders.` 
                  : `Are you sure you want to restore access for ${actionUser.name}? They will be able to resume shopping normally.`
                }
             </p>
             <div className="flex gap-3">
                <button onClick={() => setActionUser(null)} className="flex-1 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button onClick={handleToggleStatus} className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider text-white shadow-lg transition-all active:scale-95 ${
                    actionUser.status === 'Active' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/30' : 'bg-green-600 hover:bg-green-700 shadow-green-600/30'
                  }`}>
                  {actionUser.status === 'Active' ? 'Confirm Block' : 'Confirm Restore'}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}