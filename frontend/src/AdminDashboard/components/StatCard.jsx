import React from 'react';

export default function StatCard({ title, value, icon, trend, colorClass }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${colorClass} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
      <div className="flex justify-between items-center mt-1">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
        <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md">{trend}</span>
      </div>
    </div>
  );
}