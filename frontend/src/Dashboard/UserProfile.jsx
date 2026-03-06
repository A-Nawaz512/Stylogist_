import React, { useState } from 'react';
import {
  FiUser, FiShoppingBag, FiHeart, FiMapPin, FiSettings, FiLogOut,
  FiPackage, FiPlus, FiEdit2, FiTrash2, FiShield, FiBell, FiChevronRight,
  FiCheckCircle, FiStar, FiRefreshCw, FiCreditCard
} from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');

  // --- Mock Data ---
  const user = {
    name: "Javeria Khan",
    email: "javeria@stylogist.pk",
    phone: "+92 300 1234567",
    joined: "Feb 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
  };

  const wishlistItems = [
    { id: 101, name: "Silk Satin Slip Dress", price: "12,999", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400" },
    { id: 102, name: "Onyx Chronograph Watch", price: "24,500", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400" }
  ];

  const addresses = [
    { id: 1, type: "Home", detail: "House #12, Block B, Satellite Town", city: "Bahawalpur", isDefault: true },
    { id: 2, type: "Office", detail: "Digital Hub, 3rd Floor, Commercial Area", city: "Lahore", isDefault: false }
  ];

  const menuItems = [
    { id: 'profile', label: 'Identity', icon: <FiUser /> },
    { id: 'orders', label: 'Order History', icon: <FiShoppingBag /> },
    { id: 'wishlist', label: 'My Wishlist', icon: <FiHeart /> },
    { id: 'addresses', label: 'Saved Addresses', icon: <FiMapPin /> },
    { id: 'settings', label: 'Account Settings', icon: <FiSettings /> },
  ];

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.setItem("user", "")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">

        {/* 1. DASHBOARD HEADER PLATE */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#007074]/5 rounded-bl-[5rem] pointer-events-none" />

          <div className="flex items-center gap-5 relative z-10">
            <div className="relative">
              <img src={user.avatar} className="w-20 h-20 rounded-[1.5rem] object-cover border-4 border-white shadow-xl" alt="Avatar" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#007074] rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                <FiCheckCircle className="text-white w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">{user.name}</h1>
              <p className="text-[10px] font-black text-[#007074] uppercase tracking-[0.3em]">Platinum Client • Est. 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Available Credits</p>
              <p className="text-lg font-bold text-slate-900">Rs. 4,500</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#007074] flex items-center justify-center text-white shadow-lg shadow-[#007074]/20">
              <FiStar size={22} fill="currentColor" className="text-teal-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 2. SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-[2.5rem] p-3 shadow-sm border border-slate-100 sticky top-24">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-500 ${activeTab === item.id
                    ? 'bg-[#007074] text-white shadow-xl shadow-[#007074]/10 scale-[1.02]'
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <span className={`text-lg ${activeTab === item.id ? 'text-teal-200' : 'text-[#007074]'}`}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <div className="my-4 h-[1px] bg-slate-50 mx-4" />
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all">
                <FiLogOut className="text-lg" /> Terminate Session
              </button>
            </div>
          </aside>

          {/* 3. DYNAMIC CONTENT AREA */}
          <main className="lg:col-span-9 min-h-[600px]">

            {/* CONTENT: IDENTITY (PROFILE) */}
            {activeTab === 'profile' && (
              <div className="animate-[slideUp_0.5s_ease-out] space-y-8">
                {/* Micro Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Orders', val: '12', icon: <FiPackage />, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Spend', val: '84k', icon: <FiCreditCard />, color: 'bg-teal-50 text-[#007074]' },
                    { label: 'In Wish', val: '08', icon: <FiHeart />, color: 'bg-pink-50 text-pink-600' },
                    { label: 'Returns', val: '01', icon: <FiRefreshCw />, color: 'bg-orange-50 text-orange-600' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-4 text-xl`}>
                        {stat.icon}
                      </div>
                      <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.val}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-bl-full -z-0 opacity-50" />
                  <div className="flex items-center justify-between mb-10 relative z-10">
                    <h3 className="text-xl font-bold tracking-tight">Identity Details</h3>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#007074] hover:bg-teal-50 px-4 py-2 rounded-full transition-all">
                      <FiEdit2 /> Update Profile
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                    {[
                      { label: "Display Name", val: user.name },
                      { label: "Email Address", val: user.email },
                      { label: "Phone Connection", val: user.phone },
                      { label: "Default Currency", val: "PKR - Rupees" }
                    ].map((item, i) => (
                      <div key={i} className="space-y-1 group">
                        <label className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-[#007074] transition-colors">{item.label}</label>
                        <p className="text-sm font-bold text-slate-900 py-3 border-b border-slate-50">{item.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CONTENT: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="animate-[slideUp_0.5s_ease-out] bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">My Wishlist</h3>
                    <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest text-[10px] font-bold">Neural Curation Storage</p>
                  </div>
                  <span className="text-[10px] font-black text-[#007074] bg-teal-50 px-4 py-1.5 rounded-full uppercase tracking-widest">{wishlistItems.length} Products</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlistItems.map(item => (
                    <div key={item.id} className="group flex items-center gap-5 p-4 rounded-3xl border border-slate-50 hover:border-[#007074]/30 hover:bg-slate-50/50 transition-all duration-500">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                        <img src={item.img} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-800 truncate">{item.name}</h4>
                        <p className="text-[#007074] font-black text-xs mt-2">Rs. {item.price}</p>
                      </div>
                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button title="Remove" className="p-2.5 bg-white rounded-xl shadow-md text-red-400 hover:bg-red-50 active:scale-90 transition-all"><FiTrash2 size={16} /></button>
                        <button title="Move to Cart" className="p-2.5 bg-[#007074] rounded-xl shadow-lg text-white hover:bg-[#005a5d] active:scale-90 transition-all"><FiShoppingBag size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTENT: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="animate-[slideUp_0.5s_ease-out] bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-bold tracking-tight">Shipping Directory</h3>
                  <button className="flex items-center gap-2 bg-[#007074] text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#005a5d] shadow-lg shadow-[#007074]/10 transition-all">
                    <FiPlus /> Register New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {addresses.map(addr => (
                    <div key={addr.id} className="group flex items-center justify-between p-8 rounded-[2rem] bg-slate-50 border border-transparent hover:border-[#007074]/20 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${addr.isDefault ? 'bg-[#007074] text-white' : 'bg-white text-slate-400'}`}>
                          <FiMapPin size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="text-[10px] font-black text-[#007074] uppercase tracking-[0.2em]">{addr.type}</p>
                            {addr.isDefault && <span className="bg-teal-100 text-[#007074] text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">Primary</span>}
                          </div>
                          <p className="text-sm font-bold text-slate-800 mt-2">{addr.detail}</p>
                          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">{addr.city}, Pakistan</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-3 text-slate-400 hover:text-slate-900 transition-colors"><FiEdit2 size={18} /></button>
                        <button className="p-3 text-red-300 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTENT: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <div className="animate-[slideUp_0.5s_ease-out] space-y-6">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                  <h3 className="text-2xl font-bold tracking-tight mb-10">Security Architecture</h3>

                  <div className="space-y-8">
                    {/* Credential Reset */}
                    <div className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100">
                      <div className="flex items-center gap-3 mb-8">
                        <FiShield className="text-[#007074] text-xl" />
                        <h4 className="font-bold text-slate-800">Password Encryption</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Password</label>
                          <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 text-sm outline-none focus:ring-4 focus:ring-[#007074]/5 focus:border-[#007074] transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">New Secure Password</label>
                          <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 text-sm outline-none focus:ring-4 focus:ring-[#007074]/5 focus:border-[#007074] transition-all" />
                        </div>
                      </div>
                      <button className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#007074] transition-all active:scale-95">Verify & Update</button>
                    </div>

                    {/* Notification Preferences */}
                    <div className="flex items-center justify-between p-8 rounded-[2rem] bg-teal-50/20 border border-teal-50">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#007074] shadow-sm"><FiBell size={22} /></div>
                        <div>
                          <h4 className="font-bold text-slate-800">Neural Notifications</h4>
                          <p className="text-xs text-slate-400 font-medium">Alerts for curated drops & order status.</p>
                        </div>
                      </div>
                      <div className="w-14 h-7 bg-[#007074] rounded-full relative cursor-pointer shadow-inner transition-all">
                        <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-lg" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Termination */}
                <div className="bg-red-50/50 border border-red-100 rounded-[2rem] p-8 flex items-center justify-between">
                  <div>
                    <h4 className="text-red-600 font-bold text-sm">Terminate Profile</h4>
                    <p className="text-xs text-red-400 font-medium">Permanently erase your identity and order history.</p>
                  </div>
                  <button className="px-6 py-2 border-2 border-red-200 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Request Deletion</button>
                </div>
              </div>
            )}

            {/* CONTENT: ORDERS (Summary View) */}
            {activeTab === 'orders' && (
              <div className="animate-[slideUp_0.5s_ease-out] bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold tracking-tight mb-10">Order Registry</h3>
                <div className="space-y-5">
                  {[1, 2].map((order) => (
                    <div key={order} className="group flex flex-col md:flex-row md:items-center justify-between p-8 rounded-[2rem] bg-slate-50 border border-transparent hover:border-[#007074]/20 hover:bg-white hover:shadow-xl transition-all duration-500">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#007074] shadow-sm group-hover:scale-110 transition-transform">
                          <FiPackage size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">#STYL-99210{order}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Processed: Mar 0{order}, 2026</p>
                        </div>
                      </div>
                      <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-10">
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">Rs. 12,499</p>
                          <span className="inline-flex items-center gap-1.5 text-[9px] font-black px-3 py-1 rounded-full bg-teal-100 text-[#007074] uppercase tracking-tighter mt-1">
                            <div className="w-1 h-1 rounded-full bg-[#007074] animate-pulse" /> Delivered
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-[#007074] group-hover:bg-teal-50 transition-all">
                          <FiChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* 4. ANIMATION KEYFRAMES */}
      <style jsx="true">{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}