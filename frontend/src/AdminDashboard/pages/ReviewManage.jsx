import React, { useState } from 'react';
import { 
  FiSearch, FiStar, FiCheck, FiTrash2, FiEyeOff, 
  FiMessageSquare, FiPackage, FiUser, FiClock, FiAlertTriangle
} from 'react-icons/fi';

export default function ReviewManage() {
  const [activeFilter, setActiveFilter] = useState('Pending');

  const tabs = ['Pending', 'Approved', 'Flagged'];

  // Production-Level Mock Data mapped to your DB schema
  const allReviews = [
    { 
      id: 501, user: "Sara Malik", product: "Silk Satin Slip Dress", rating: 5, 
      comment: "Absolutely stunning quality! The recommendation was spot on for my size. Will definitely order again for the winter season.", 
      status: "Pending", date: "Mar 06, 2026"
    },
    { 
      id: 502, user: "Ahmed Ali", product: "Onyx Chronograph", rating: 2, 
      comment: "The strap feels a bit stiff, expected more for the premium price tag. The dial is nice though.", 
      status: "Pending", date: "Mar 05, 2026"
    },
    { 
      id: 503, user: "Javeria", product: "Velvet Midnight Wrap", rating: 5, 
      comment: "Incredible material and super fast delivery via COD. Stylogist never disappoints!", 
      status: "Approved", date: "Mar 02, 2026"
    },
    { 
      id: 504, user: "Unknown User", product: "Radiance C Serum", rating: 1, 
      comment: "Terrible service. The box arrived completely crushed. Want a refund ASAP.", 
      status: "Flagged", date: "Mar 01, 2026"
    }
  ];

  // Dynamic Filtering
  const displayedReviews = allReviews.filter(rev => rev.status === activeFilter);

  // Hardware-Accelerated CSS Animations
  const customStyles = `
    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-cascade { opacity: 0; animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  `;

  return (
    <div className="space-y-8 pb-10">
      <style>{customStyles}</style>
      
      {/* 1. HEADER & MODERATION TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-cascade" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Review Moderation</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-2">
            Maintain Brand Integrity & Social Proof
          </p>
        </div>
        
        <div className="flex bg-white border border-slate-100 rounded-[1.5rem] p-1.5 shadow-sm">
           {tabs.map((tab) => (
             <button 
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
                  activeFilter === tab 
                  ? 'bg-[#007074] text-white shadow-md shadow-[#007074]/30' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
             >
               {tab} {tab === 'Pending' && <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white rounded-md text-[10px] font-black animate-pulse">2</span>}
             </button>
           ))}
        </div>
      </div>

      {/* 2. SEARCH INTERFACE */}
      <div className="relative group animate-cascade" style={{ animationDelay: '100ms' }}>
        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007074] transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Filter reviews by product name or keyword..." 
          className="w-full bg-white border-2 border-transparent rounded-[2rem] py-4 pl-14 pr-6 text-sm font-semibold text-slate-900 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] outline-none focus:ring-4 focus:ring-[#007074]/10 focus:border-[#007074]/30 transition-all hover:border-slate-200"
        />
      </div>

      {/* 3. REVIEWS LIST */}
      <div className="space-y-6">
        {displayedReviews.length === 0 ? (
           <div className="bg-white rounded-[2rem] border border-slate-100 p-16 flex flex-col items-center justify-center text-center shadow-sm animate-cascade" style={{ animationDelay: '200ms' }}>
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                 <FiCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">You're all caught up!</h3>
              <p className="text-sm text-slate-500 font-medium max-w-sm">There are no {activeFilter.toLowerCase()} reviews requiring your attention at this moment.</p>
           </div>
        ) : (
          displayedReviews.map((rev, index) => (
            <div 
              key={rev.id} 
              className="bg-white rounded-[2rem] border border-slate-100 p-6 md:p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-15px_rgba(0,112,116,0.15)] hover:border-teal-100 transition-all duration-300 group relative overflow-hidden transform hover:-translate-y-1 animate-cascade flex flex-col gap-6"
              style={{ animationDelay: `${200 + (index * 100)}ms` }}
            >
              
              {/* Top Row: User & Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-[#007074] transition-colors">
                       <FiUser size={20} />
                    </div>
                    <div>
                       <p className="text-base font-bold text-slate-900">{rev.user}</p>
                       <p className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-1">
                          <FiClock size={12} /> {rev.date}
                       </p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-1 bg-slate-50 px-4 py-2 rounded-xl">
                    <span className="text-sm font-black text-slate-900 mr-2">{rev.rating}.0</span>
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        size={16} 
                        className={i < rev.rating ? "fill-yellow-400 text-yellow-400 drop-shadow-sm" : "fill-slate-200 text-slate-200"} 
                      />
                    ))}
                 </div>
              </div>

              {/* Middle Row: The Comment */}
              <div className="pl-2">
                 <p className="text-base text-slate-700 leading-relaxed font-medium italic relative">
                    <span className="absolute -left-6 -top-2 text-4xl text-slate-200 font-serif">"</span>
                    {rev.comment}
                    <span className="absolute ml-2 -bottom-4 text-4xl text-slate-200 font-serif">"</span>
                 </p>
              </div>

              {/* Bottom Row: Product Context & Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-6 bg-slate-50/50 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 md:p-8 rounded-b-[2rem] border-t border-slate-50 mt-2">
                 
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                      <FiPackage size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Reviewed Product</p>
                      <p className="font-bold text-slate-800 text-sm group-hover:text-[#007074] transition-colors">{rev.product}</p>
                    </div>
                 </div>

                 {/* Moderation Actions */}
                 <div className="flex items-center gap-3 w-full lg:w-auto">
                    {rev.status === 'Pending' && (
                      <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#007074] text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#005a5d] shadow-md shadow-[#007074]/30 transition-all active:scale-95 transform hover:-translate-y-0.5">
                         <FiCheck size={16} /> Approve
                      </button>
                    )}
                    
                    {rev.status !== 'Flagged' && (
                      <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-orange-600 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-orange-50 hover:border-orange-200 transition-all shadow-sm active:scale-95">
                         <FiEyeOff size={16} /> <span className="hidden sm:inline">Hide</span>
                      </button>
                    )}

                    <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-red-600 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-50 hover:border-red-200 transition-all shadow-sm active:scale-95">
                       <FiTrash2 size={16} /> <span className="hidden sm:inline">Delete</span>
                    </button>
                 </div>

              </div>

              {/* Absolute Status Indicator Badge */}
              <div className={`absolute top-0 right-0 px-5 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider shadow-sm ${
                  rev.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 
                  rev.status === 'Flagged' ? 'bg-red-100 text-red-600' :
                  'bg-teal-100 text-[#007074]'
              }`}>
                  <span className="flex items-center gap-1.5">
                    {rev.status === 'Pending' && <FiClock size={12} className="animate-spin-slow" />}
                    {rev.status === 'Flagged' && <FiAlertTriangle size={12} />}
                    {rev.status === 'Approved' && <FiCheck size={12} />}
                    {rev.status}
                  </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}