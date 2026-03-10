import React, { useState } from 'react';
import { 
  FiPlus, FiFolder, FiLayers, FiTag, FiEdit3, 
  FiTrash2, FiChevronRight, FiGrid, FiArrowRight, FiCheckCircle, FiChevronDown
} from 'react-icons/fi';

export default function CategoryManage() {
  const [activeTab, setActiveTab] = useState('category');
  
  // 1. DYNAMIC LIST STATE
  const [categoryList, setCategoryList] = useState([
    { id: 1, name: "Women's Fashion", sub: ["Dresses", "Tops", "Jewelry", "Activewear"], items: 124, color: "text-rose-500", bg: "bg-rose-50" },
    { id: 2, name: "Men's Collection", sub: ["Suits", "Watches", "Shoes", "Denim"], items: 86, color: "text-slate-700", bg: "bg-slate-100" },
    { id: 3, name: "Beauty & Care", sub: ["Skincare", "Makeup", "Fragrance"], items: 42, color: "text-amber-500", bg: "bg-amber-50" },
    { id: 4, name: "Accessories", sub: ["Handbags", "Sunglasses", "Belts"], items: 64, color: "text-teal-500", bg: "bg-teal-50" },
  ]);

  // 2. FORM DATA STATE
  const [formData, setFormData] = useState({ title: "", parent: "", description: "" });

  // 3. ADD CATEGORY HANDLER
  const handleDeploy = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const newCategory = {
      id: Date.now(),
      name: formData.title,
      sub: activeTab === 'sub-category' ? [] : ["Sample Node"],
      items: 0,
      color: "text-[#007074]",
      bg: "bg-[#007074]/5"
    };

    setCategoryList([newCategory, ...categoryList]);
    setFormData({ title: "", parent: "", description: "" }); // Reset Form
  };

  const customStyles = `
    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes shine {
      0% { left: -100%; }
      100% { left: 200%; }
    }
    .animate-cascade { opacity: 0; animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  return (
    <div className="space-y-6 md:space-y-8 pb-10 px-2 md:px-0 bg-white min-h-screen font-sans">
      <style>{customStyles}</style>
      
      {/* 1. HEADER & TAB NAVIGATION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 animate-cascade" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">Taxonomy Engine</h1>
          <p className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-widest mt-1">
            Manage Database Categories & Global Tags
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto bg-slate-50 border border-slate-100 rounded-2xl md:rounded-[1.5rem] p-1.5 shadow-sm no-scrollbar">
           {[
             { id: 'category', icon: <FiFolder size={14} />, label: 'Category' },
             { id: 'sub-category', icon: <FiLayers size={14} />, label: 'Sub-Category' },
             { id: 'tags', icon: <FiTag size={14} />, label: 'Global Tags' }
           ].map((t) => (
             <button 
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase text-nowrap transition-all duration-300 ${
                  activeTab === t.id 
                  ? 'bg-[#007074] text-white shadow-lg scale-105' 
                  : 'text-slate-400 hover:text-slate-900 hover:bg-white'
                }`}
             >
                {t.icon} {t.label}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 2. CREATION FORM (Stack on Mobile, Sticky on Desktop) */}
        <div className="lg:col-span-4 bg-white rounded-3xl md:rounded-[2.5rem] border border-slate-100 p-6 md:p-8 shadow-xl lg:sticky lg:top-24 animate-cascade" style={{ animationDelay: '100ms' }}>
           <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-6 border-b border-slate-50 pb-4 flex items-center gap-2">
              <FiPlus className="text-[#007074]" size={18} /> Deploy {activeTab.replace('-', ' ')}
           </h3>
           
           <form className="space-y-6" onSubmit={handleDeploy}>
              <InputField 
                label="Nomenclature (Title)" 
                placeholder="e.g. Luxury Footwear" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />

              {/* RESTORED DROPDOWN LOGIC */}
              <div className={`transition-all duration-500 overflow-hidden ${activeTab !== 'category' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Parent Entity</label>
                   <div className="relative">
                     <select 
                      value={formData.parent}
                      onChange={(e) => setFormData({...formData, parent: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 outline-none focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/10 transition-all appearance-none cursor-pointer"
                     >
                        <option value="">Select Parent Node...</option>
                        {categoryList.map(cat => <option key={cat.id}>{cat.name}</option>)}
                     </select>
                     <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#007074] pointer-events-none" />
                   </div>
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Metadata / Description</label>
                 <textarea 
                   value={formData.description}
                   onChange={(e) => setFormData({...formData, description: e.target.value})}
                   className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-6 text-sm font-medium text-slate-900 outline-none focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/10 transition-all min-h-[120px]" 
                   placeholder="SEO and internal reference description..."
                 />
              </div>

              <button className="w-full bg-[#007074] text-white py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] shadow-xl shadow-[#007074]/20 transition-all active:scale-95 flex items-center justify-center gap-3 transform hover:-translate-y-1">
                <FiCheckCircle size={18} /> Execute Entry
              </button>
           </form>
        </div>

        {/* 3. DIRECTORY GRID */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
           {categoryList.map((cat, index) => (
             <div 
                key={cat.id} 
                className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 p-6 md:p-8 shadow-lg hover:shadow-2xl hover:border-[#007074]/30 transition-all duration-500 group relative overflow-hidden transform hover:-translate-y-1 animate-cascade"
                style={{ animationDelay: `${200 + (index * 100)}ms` }}
             >
                <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-[shine_1s_ease-in-out]" />
                
                <div className={`absolute -top-4 -right-4 p-4 transition-all duration-500 rotate-12 group-hover:rotate-0 group-hover:scale-110 opacity-[0.03] group-hover:opacity-10 ${cat.color}`}>
                   <FiGrid size={120} />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                     <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:scale-110 ${cat.bg} ${cat.color}`}>
                        <FiFolder size={24} />
                     </div>
                     <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-[#007074] hover:bg-teal-50 transition-colors"><FiEdit3 size={14}/></button>
                        <button onClick={() => setCategoryList(categoryList.filter(i => i.id !== cat.id))} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"><FiTrash2 size={14}/></button>
                     </div>
                  </div>

                  <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight group-hover:text-[#007074] transition-colors">{cat.name}</h4>
                  <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 mb-6 md:mb-8">
                    <span className="text-[#007074] font-bold">{cat.items}</span> Active Products
                  </p>

                  <div className="space-y-3 border-t border-slate-50 pt-5">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                        Sub-Collections
                        <span className="text-[7px] md:text-[8px] bg-slate-100 px-2 py-0.5 rounded-full">{cat.sub.length} Nodes</span>
                     </p>
                     <div className="flex flex-wrap gap-2">
                        {cat.sub.map((s, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 md:px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[9px] md:text-[10px] font-bold border border-slate-100 flex items-center gap-1 hover:bg-white hover:border-[#007074]/30 hover:text-[#007074] transition-all"
                          >
                             {s} <FiChevronRight size={12} className="text-slate-300" />
                          </span>
                        ))}
                     </div>
                  </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

// Reusable Controlled Input Field
function InputField({ label, placeholder, type = "text", name, value, onChange }) {
  return (
    <div className="space-y-2 group">
      <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 ml-1 group-focus-within:text-[#007074] transition-colors">
        {label}
      </label>
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3.5 md:py-4 px-6 text-sm font-bold text-slate-900 outline-none focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/10 transition-all shadow-sm hover:border-slate-200"
      />
    </div>
  );
}