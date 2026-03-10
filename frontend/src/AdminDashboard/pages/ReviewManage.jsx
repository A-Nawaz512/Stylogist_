import React, { useState, useMemo } from 'react';
import { 
  FiSearch, FiStar, FiCheck, FiTrash2, FiEyeOff, 
  FiPackage, FiUser, FiClock, FiAlertTriangle, FiX
} from 'react-icons/fi';

export default function ReviewManage() {
  const [activeFilter, setActiveFilter] = useState('Pending');
  const [searchQuery, setSearchQuery] = useState("");

  // DYNAMIC DATA STATE
  const [reviews, setReviews] = useState([
    { 
      id: 501, user: "Sara Malik", product: "Silk Satin Slip Dress", rating: 5, 
      comment: "Absolutely stunning quality! The recommendation was spot on for my size. Will definitely order again.", 
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
    },
    { 
      id: 501, user: "Javed Shakir", product: "Silk Satin Slip Dress", rating: 5, 
      comment: "Absolutely stunning quality! The recommendation was spot on for my size. Will definitely order again.", 
      status: "Pending", date: "Mar 06, 2026"
    },
    { 
      id: 502, user: "Mujataba saqlain", product: "Onyx Chronograph", rating: 2, 
      comment: "The strap feels a bit stiff, expected more for the premium price tag. The dial is nice though.", 
      status: "Pending", date: "Mar 05, 2026"
    },
    { 
      id: 503, user: "Janifer", product: "Velvet Midnight Wrap", rating: 5, 
      comment: "Incredible material and super fast delivery via COD. Stylogist never disappoints!", 
      status: "Approved", date: "Mar 02, 2026"
    },
    { 
      id: 504, user: "Tyler rein", product: "Radiance C Serum", rating: 1, 
      comment: "Terrible service. The box arrived completely crushed. Want a refund ASAP.", 
      status: "Flagged", date: "Mar 01, 2026"
    }
  ]);

  const tabs = ['Pending', 'Approved', 'Flagged'];

  // FILTER & SEARCH LOGIC
  const displayedReviews = useMemo(() => {
    return reviews.filter(rev => {
      const matchesTab = rev.status === activeFilter;
      const matchesSearch = 
        rev.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
        rev.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.comment.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesTab && matchesSearch;
    });
  }, [reviews, activeFilter, searchQuery]);

  // ACTION HANDLERS
  const handleStatusUpdate = (id, newStatus) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleDelete = (id) => {
    if(window.confirm("Permanently delete this review?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const customStyles = `
    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-cascade { opacity: 0; animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
  `;

  return (
    <div className="space-y-6 md:space-y-8 pb-10 px-2 md:px-0 bg-white min-h-screen font-sans">
      <style>{customStyles}</style>
      
      {/* 1. HEADER & MODERATION TABS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 animate-cascade" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#222222] tracking-tight uppercase">Review Grid</h1>
          <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">
            Moderation Control Panel
          </p>
        </div>
        
        <div className="flex bg-slate-50 border border-slate-100 rounded-2xl md:rounded-[1.5rem] p-1.5 shadow-sm overflow-x-auto no-scrollbar">
           {tabs.map((tab) => (
             <button 
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase whitespace-nowrap transition-all duration-300 ${
                  activeFilter === tab 
                  ? 'bg-[#007074] text-white shadow-lg' 
                  : 'text-slate-400 hover:text-[#222222]'
                }`}
             >
                {tab}
             </button>
           ))}
        </div>
      </div>

      {/* 2. SEARCH INTERFACE */}
      <div className="relative group animate-cascade" style={{ animationDelay: '100ms' }}>
        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007074]" size={18} />
        <input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by keyword..." 
          className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-3.5 md:py-4 pl-14 pr-12 text-sm font-bold text-[#222222] outline-none focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/5 transition-all shadow-sm"
        />
        {searchQuery && (
          <FiX 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-red-500" 
            onClick={() => setSearchQuery("")}
          />
        )}
      </div>

      {/* 3. REVIEWS GRID (Responsive columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-cascade" style={{ animationDelay: '200ms' }}>
        {displayedReviews.length === 0 ? (
           <div className="col-span-full bg-white rounded-3xl border border-slate-100 p-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                 <FiCheck size={28} />
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No matching reviews found</p>
           </div>
        ) : (
          displayedReviews.map((rev, index) => (
            <div 
              key={rev.id} 
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-lg hover:shadow-2xl hover:border-teal-100 transition-all duration-500 group relative flex flex-col h-full"
            >
              {/* Star Rating Badge */}
              <div className="flex items-center justify-between mb-5">
                 <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={14} className={i < rev.rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-100 text-slate-200"} />
                    ))}
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase">{rev.date}</span>
              </div>

              {/* User Identity */}
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#007074] border border-slate-100 font-black text-xs uppercase">
                    {rev.user.charAt(0)}
                 </div>
                 <div>
                    <h4 className="text-[13px] font-black text-[#222222] uppercase tracking-tight">{rev.user}</h4>
                    <p className="text-[9px] font-bold text-[#007074] uppercase tracking-widest truncate max-w-[150px]">{rev.product}</p>
                 </div>
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                 <p className="text-[13px] text-slate-600 leading-relaxed italic mb-6">
                    "{rev.comment}"
                 </p>
              </div>

              {/* Moderation Actions */}
              <div className="flex items-center gap-2 pt-5 border-t border-slate-50 mt-auto">
                 {rev.status === 'Pending' && (
                    <button 
                      onClick={() => handleStatusUpdate(rev.id, 'Approved')}
                      className="flex-1 bg-[#007074] text-white py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#222222] transition-all active:scale-95"
                    >
                      Approve
                    </button>
                 )}
                 <button 
                    onClick={() => handleStatusUpdate(rev.id, 'Flagged')}
                    className="flex-1 bg-slate-50 text-slate-500 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-50 hover:text-orange-600 transition-all active:scale-95"
                 >
                    Flag
                 </button>
                 <button 
                    onClick={() => handleDelete(rev.id)}
                    className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 rounded-xl transition-all active:scale-95"
                 >
                    <FiTrash2 size={14} />
                 </button>
              </div>

              {/* Status Indicator Bar */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-full ${
                rev.status === 'Pending' ? 'bg-orange-400' : rev.status === 'Flagged' ? 'bg-red-400' : 'bg-[#007074]'
              }`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}