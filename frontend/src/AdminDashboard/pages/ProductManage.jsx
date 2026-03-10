import React, { useState, useMemo } from 'react';
import {
  FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2,
  FiEye, FiPackage, FiImage, FiUploadCloud, FiTag,
  FiChevronDown, FiClock, FiCheckCircle, FiX, FiAlertTriangle, FiCheck
} from 'react-icons/fi';

export default function ProductManage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState(['M']);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("All");

  // --- DYNAMIC FILTRATION LOGIC ---

  // NEW MODAL STATES
  const [editProduct, setEditProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const initialProducts = [
    {
      id: 1, name: "Silk Satin Slip Dress", category: "Women's Fashion", subCategory: "Dresses",
      price: "12,999", stock: 15, sku: "ST-SLK-001", status: "Active",
      img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200"
    },
    {
      id: 2, name: "Onyx Chronograph Watch", category: "Accessories", subCategory: "Watches",
      price: "24,500", stock: 4, sku: "ST-WTH-092", status: "Low Stock",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200"
    },
    {
      id: 3, name: "Velvet Midnight Wrap", category: "Women's Fashion", subCategory: "Outerwear",
      price: "6,400", stock: 0, sku: "ST-VLV-044", status: "Out of Stock",
      img: "https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=200"
    },
  ];

  const [productList, setProductList] = useState(initialProducts);

  const filteredProducts = useMemo(() => {
    return productList.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStock = stockFilter === "All" ||
        (stockFilter === "In Stock" && product.stock > 10) ||
        (stockFilter === "Low Stock" && product.stock > 0 && product.stock <= 10) ||
        (stockFilter === "Out of Stock" && product.stock === 0);
      return matchesSearch && matchesStock;
    });
  }, [searchQuery, stockFilter, productList]);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedProduct = {
      ...editProduct,
      name: form.name.value,
      sku: form.sku.value,
      price: form.price.value,
      stock: parseInt(form.stock.value)
    };
    setProductList(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditProduct(null);
  };

  const handleDeleteProduct = () => {
    setProductList(prev => prev.filter(p => p.id !== deletingProduct.id));
    setDeletingProduct(null);
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
    <div className="space-y-8 pb-10 px-4 md:px-0 bg-white min-h-screen font-sans">
      <style>{customStyles}</style>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-cascade">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#222222] tracking-tight uppercase">Product Registry</h1>
          <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">Inventory Management System</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-[#007074] text-white rounded-2xl flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-[#007074]/20 transition-all hover:-translate-y-1 active:scale-95"
        >
          {showAddForm ? <FiEye /> : <FiPlus />}
          {showAddForm ? 'View Products' : 'Add Product'}
        </button>
      </div>

      {!showAddForm ? (
        <>
          {/* SEARCH & FILTERS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007074]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by Name or SKU..."
                className="w-full border-2 border-slate-100 rounded-2xl pl-12 py-3 focus:border-[#007074]/30 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 appearance-none focus:border-[#007074]/30 outline-none"
              >
                <option value="All">All Inventory</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#007074]" />
            </div>
          </div>

          {/* TABLE */}
          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[800px]">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Identity</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">SKU Index</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Pricing</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Stock</th>
                    <th className="p-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-[#007074]/5 transition-colors group">
                      <td className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                          <img src={item.img} className="w-full h-full object-cover" alt="" />
                        </div>
                        <span className="font-bold text-[#222222] text-sm group-hover:text-[#007074] transition-colors">{item.name}</span>
                      </td>
                      <td className="p-6 text-xs font-bold text-slate-500 uppercase">{item.sku}</td>
                      <td className="p-6 font-black text-[#222222]">Rs {item.price}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${item.stock === 0 ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                          {item.stock > 0 ? `${item.stock} Units` : 'Out'}
                        </span>
                      </td>
                      <td className="p-6 text-right space-x-3">
                        <button onClick={() => setEditProduct(item)} className="p-2 text-slate-400 hover:text-[#007074] transition-all"><FiEdit2 /></button>
                        <button onClick={() => setDeletingProduct(item)} className="p-2 text-slate-400 hover:text-red-500 transition-all"><FiTrash2 /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* ADD PRODUCT FORM - COMPLETELY RESTORED */
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8 md:p-12 animate-cascade">
          <form className="space-y-12">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
              <div className="xl:col-span-2 space-y-8">
                <FormSectionHeader title="Product Details" icon={<FiPackage />} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Product Title" placeholder="e.g. Velvet Midnight Wrap" />
                  <InputField label="Product SKU" placeholder="ST-VLV-044" />
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-[#007074] transition-colors">Category</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 text-sm font-bold text-[#222222] outline-none focus:bg-white focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/10 transition-all appearance-none cursor-pointer">
                        <option>Women's Fashion</option>
                        <option>Men's Apparel</option>
                        <option>Accessories</option>
                      </select>
                      <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#007074] pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-[#007074] transition-colors">Sub-Category</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 text-sm font-bold text-[#222222] outline-none focus:bg-white focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/10 transition-all appearance-none cursor-pointer">
                        <option>Outerwear</option>
                        <option>Dresses</option>
                        <option>Tops</option>
                      </select>
                      <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#007074] pointer-events-none" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-[#007074] transition-colors">Full Description</label>
                    <textarea className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-6 text-sm font-medium text-[#222222] outline-none focus:bg-white focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/10 transition-all min-h-[120px]" placeholder="Detailed description..."></textarea>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <FormSectionHeader title="Upload Media" icon={<FiImage />} />
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-200 bg-slate-50 rounded-3xl cursor-pointer hover:bg-slate-100 hover:border-[#007074] transition-all relative">
                  <FiUploadCloud size={30} className="text-[#007074] mb-2" />
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Upload Asset</p>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* RESTORED SECTION: ECONOMICS & SEO */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-12">
              <div className="space-y-8 md:space-y-10">
                <FormSectionHeader title="Economics & Inventory" icon={<FiTag />} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField label="Sale Price (Rs)" placeholder="6,400" />
                  <InputField label="Original Price (Rs)" placeholder="8,000" />
                  <InputField label="Stock Quantity" placeholder="50" />
                  <InputField label="Deal Days Countdown" placeholder="3" />
                </div>
                <div className="pt-4 space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Available Sizes</label>
                  <div className="flex flex-wrap gap-3">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold border-2 transition-all ${selectedSizes.includes(size)
                          ? 'bg-[#007074] text-white border-[#007074] shadow-lg shadow-[#007074]/20 scale-105'
                          : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8 md:space-y-10">
                <FormSectionHeader title="Meta Intelligence" icon={<FiSearch />} />
                <div className="space-y-6">
                  <InputField label="SEO Meta Title" placeholder="Velvet Midnight Wrap | Stylogist" />
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-[#007074] transition-colors">Meta Description</label>
                    <textarea className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-medium text-[#222222] outline-none focus:bg-white focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/10 transition-all h-28 shadow-sm hover:border-slate-200" placeholder="Brief 160 character description..."></textarea>
                  </div>
                  <InputField label="Global Tags" placeholder="winter, luxury, dark" />
                </div>
              </div>
            </div>

            {/* Form Footer Actions */}
            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50 -mx-6 md:-mx-12 -mb-6 md:-mb-12 p-8 md:p-10 rounded-b-[2.5rem]">
              <button type="button" onClick={() => setShowAddForm(false)} className="w-full sm:w-auto px-10 py-4 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                Cancel Deployment
              </button>
              <button type="submit" className="w-full sm:w-auto bg-[#007074] text-white px-12 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#222222] shadow-xl shadow-[#007074]/20 transition-all transform hover:-translate-y-1 ml-auto">
                Synchronize Asset
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT MODAL - REDESIGNED */}
      {editProduct && (
        <div className="fixed inset-0 z-[100] bg-[#222222]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-5xl overflow-hidden animate-in zoom-in duration-300">
            <div className="flex flex-col md:flex-row max-h-[90vh]">
              <div className="flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-5">
                  <h2 className="text-xl font-black text-[#222222] uppercase flex items-center gap-3"><FiEdit2 className="text-[#007074]" /> Update Asset</h2>
                  <FiX className="text-slate-400 cursor-pointer" onClick={() => setEditProduct(null)} size={24} />
                </div>
                <form onSubmit={handleUpdateProduct} className="grid md:grid-cols-2 gap-8">
                  <InputField label="Asset Title" name="name" defaultValue={editProduct.name} />
                  <InputField label="SKU Code" name="sku" defaultValue={editProduct.sku} />
                  <InputField label="Valuation (Rs)" name="price" defaultValue={editProduct.price} />
                  <InputField label="Current Stock" name="stock" defaultValue={editProduct.stock} />
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Update Product Image</label>
                    <label className="mt-2 flex items-center gap-3 w-full p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-[#007074] transition-all">
                      <FiUploadCloud className="text-[#007074]" size={20} />
                      <span className="text-xs font-bold text-slate-500 uppercase">Replace Visual</span>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                  <button type="submit" className="md:col-span-2 w-full bg-[#007074] text-white py-4 rounded-2xl font-black uppercase text-[10px] shadow-lg shadow-[#007074]/20">Update Product</button>
                </form>
              </div>
              <div className="hidden md:flex w-[350px] bg-slate-50 p-12 border-l border-slate-100 flex-col items-center justify-center text-center">
                 <div className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-xl mb-6">
                    <img src={editProduct.img} className="w-full h-full object-cover" alt="" />
                 </div>
                 <h3 className="text-[#222222] font-bold uppercase text-xs">Live Preview</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deletingProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#222222]/80 backdrop-blur-md" onClick={() => setDeletingProduct(null)} />
          <div className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-pulse">
              <FiAlertTriangle size={36} />
            </div>
            <h2 className="text-xl font-black text-[#222222] uppercase tracking-tighter">Remove Asset?</h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">Permanently erase <span className="font-bold text-[#222222]">"{deletingProduct.name}"</span>?</p>
            <div className="flex gap-4 mt-10">
              <button onClick={() => setDeletingProduct(null)} className="flex-1 bg-slate-100 text-slate-400 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all">Abort</button>
              <button onClick={handleDeleteProduct} className="flex-1 bg-red-500 text-white py-3.5 rounded-2xl font-black uppercase text-[10px] active:scale-95 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// SHARED COMPONENTS
function FormSectionHeader({ title, icon }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
      <div className="w-9 h-9 rounded-xl bg-[#007074]/10 text-[#007074] flex items-center justify-center shadow-inner">{icon}</div>
      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#222222]">{title}</h3>
    </div>
  );
}

function InputField({ label, placeholder, name, defaultValue, onChange }) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-[#007074] transition-colors">{label}</label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 text-sm font-bold text-[#222222] outline-none focus:bg-white focus:border-[#007074]/30 focus:ring-4 focus:ring-[#007074]/10 transition-all shadow-sm hover:border-slate-200"
      />
    </div>
  );
}