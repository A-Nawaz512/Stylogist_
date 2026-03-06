import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiHeart, 
  FiShoppingCart, 
  FiTrash2, 
  FiArrowRight, 
  FiChevronRight,
  FiX,
  FiLoader,
  FiStar
} from 'react-icons/fi';

// ==========================================
// MOCK DATA (Beauty & Supplements Theme)
// ==========================================
const INITIAL_WISHLIST = [
  {
    id: 1,
    name: "Radiance Vitamin C Serum",
    brand: "Glow Botanica",
    price: 45,
    originalPrice: 60,
    discount: 25,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Daily Collagen Peptides",
    brand: "Vitality Labs",
    price: 35,
    originalPrice: null,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Hyaluronic Acid Moisturizer",
    brand: "DermaPure",
    price: 55,
    originalPrice: 65,
    discount: 15,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2053&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Organic Matcha Elixir",
    brand: "Zenith Wellness",
    price: 28,
    originalPrice: 32,
    discount: 12,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop",
  }
];

// ==========================================
// QUICK VIEW MODAL COMPONENT
// ==========================================
function QuickViewModal({ isOpen, onClose, product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#222222]/40 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-[0_0_40px_rgba(0,112,116,0.2)] w-full max-w-2xl overflow-hidden flex flex-col md:flex-row z-10 transform transition-all scale-100 animate-[popUp_0.3s_ease-out]">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300 shadow-sm hover:rotate-90">
          <FiX size={16} />
        </button>
        <div className="w-full md:w-5/12 relative overflow-hidden group">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover max-h-[300px] md:max-h-full transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-center bg-white text-center md:text-left items-center md:items-start">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#007074] bg-[#007074]/10 px-3 py-1 rounded-full w-fit mb-3">
            {product.brand}
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-serif text-[#2a2a2a] mb-2">{product.name}</h2>
          <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
            <span className="text-2xl font-bold text-[#007074]">${product.price}</span>
            {product.originalPrice && <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>}
          </div>
          <button 
            onClick={handleAddToCart} 
            disabled={isAddingToCart || showSuccess} 
            className={`w-full py-3.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1 ${
              showSuccess 
                ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-[0_10px_20px_rgba(74,222,128,0.3)]' 
                : 'bg-gradient-to-r from-[#007074] to-teal-500 text-white shadow-[0_10px_20px_rgba(0,112,116,0.3)] hover:shadow-[0_15px_25px_rgba(0,112,116,0.4)]'
            }`}
          >
            {isAddingToCart ? <><FiLoader className="animate-spin" size={16} /> Moving to Cart...</> : showSuccess ? '✓ Successfully Added' : <><FiShoppingCart size={16} /> Move to Cart</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN WISHLIST PAGE COMPONENT
// ==========================================
export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(INITIAL_WISHLIST);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleRemove = (id) => setWishlistItems(prev => prev.filter(item => item.id !== id));
  const handleClearAll = () => setWishlistItems([]);

  const customStyles = `
    @keyframes popUp {
      0% { transform: scale(0.95) translateY(10px); opacity: 0; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .stagger-item {
      opacity: 0;
      animation: popUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `;

  // --- EMPTY STATE UI ---
  if (wishlistItems.length === 0) {
    return (
      <div className="w-full min-h-[80vh] bg-gradient-to-br from-teal-50 via-white to-rose-50 flex items-center justify-center p-4 font-sans text-[#2a2a2a]">
        <style>{customStyles}</style>
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,112,116,0.1)] border border-white p-10 max-w-md w-full flex flex-col items-center text-center transform transition-all animate-[popUp_0.5s_ease-out]">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-red-50 rounded-full flex items-center justify-center mb-6 text-rose-500 shadow-inner animate-[float_4s_ease-in-out_infinite]">
            <FiHeart size={40} className="fill-rose-400" />
          </div>
          <h2 className="text-3xl font-bold font-serif mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#2a2a2a] to-gray-600">Your Wellness Routine</h2>
          <p className="text-sm text-gray-500 mb-8 px-4 leading-relaxed">
            Your wishlist is empty. Discover premium supplements and skincare essentials to elevate your daily routine.
          </p>
          <Link to="/shop" className="w-full bg-gradient-to-r from-[#2a2a2a] to-gray-800 text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide hover:from-[#007074] hover:to-teal-500 transition-all duration-500 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,112,116,0.3)] flex items-center justify-center gap-2 transform hover:-translate-y-1">
            Discover Essentials <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // --- POPULATED WISHLIST UI (CENTERED) ---
  return (
    <div className="w-full min-h-screen bg-[#F7F9FA] font-sans text-[#2a2a2a] pb-24 overflow-hidden relative flex flex-col items-center">
      <style>{customStyles}</style>
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-[80px] translate-x-1/3 pointer-events-none"></div>

      {/* MAIN CONTAINER - Centered */}
      <div className="w-full max-w-6xl px-4 md:px-8 relative z-10 flex flex-col items-center">
        
        {/* BREADCRUMBS */}
        <div className="w-full flex items-center justify-center py-6">
          <div className="flex items-center gap-2 text-[11px] text-gray-500 uppercase tracking-widest bg-white/60 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white shadow-sm">
            <Link to="/" className="hover:text-[#007074] transition-colors">Home</Link> <FiChevronRight size={10} />
            <span className="text-[#007074] font-bold">Wishlist</span>
          </div>
        </div>

        {/* VIBRANT CENTERED HEADER */}
        <div className="flex flex-col items-center justify-center mb-10 pb-8 border-b border-gray-200/60 w-full max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#2a2a2a] to-[#007074] mb-3 drop-shadow-sm">Saved Products</h1>
          <p className="text-sm font-medium text-gray-500 bg-white/80 w-fit px-4 py-1.5 rounded-full border border-white shadow-sm mb-6">
            <span className="text-[#007074] font-bold">{wishlistItems.length}</span> Essentials Saved
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={handleClearAll}
              className="text-xs text-gray-500 font-bold hover:text-rose-500 transition-colors flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-gray-200 hover:bg-rose-50 hover:border-rose-200 shadow-sm"
            >
              <FiTrash2 size={14} /> Clear Routine
            </button>
            <button className="bg-gradient-to-r from-[#2a2a2a] to-gray-800 text-white px-8 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 shadow-[0_8px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_20px_rgba(0,112,116,0.3)] hover:from-[#007074] hover:to-teal-500 transform hover:-translate-y-0.5">
              <FiShoppingCart size={14} /> Add All to Cart
            </button>
          </div>
        </div>

        {/* VIBRANT, ANIMATED GRID - Centered */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 justify-items-center max-w-full">
            {wishlistItems.map((product, index) => (
              
              <div 
                key={product.id} 
                className="stagger-item group flex flex-col relative w-full max-w-[260px]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                
                {/* Vibrant Image Container */}
                <div className="w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4 relative bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,112,116,0.15)] group-hover:-translate-y-2 border border-gray-100/50 p-2">
                  
                  <Link to={`/product/${product.id}`} className="block w-full h-full rounded-[1rem] overflow-hidden bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      loading="lazy" 
                      className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110" 
                    />
                  </Link>

                  {/* Glowing Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_5px_15px_rgba(244,63,94,0.4)]">
                      -{product.discount}%
                    </div>
                  )}

                  {/* Solid Red Glowing Heart */}
                  <button 
                    onClick={(e) => { e.preventDefault(); handleRemove(product.id); }} 
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-rose-500 shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-110 hover:bg-rose-50 z-10"
                    aria-label="Remove from wishlist"
                  >
                    <FiHeart size={16} className="fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                  </button>

                  {/* Slide-Up Glassmorphism Action Bar */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
                    <button 
                      onClick={(e) => { e.preventDefault(); setQuickViewProduct(product); }} 
                      className="w-full py-3 rounded-xl text-xs font-bold shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 bg-white/95 backdrop-blur-lg text-[#2a2a2a] border border-white hover:bg-gradient-to-r hover:from-[#007074] hover:to-teal-500 hover:text-white hover:border-transparent"
                    >
                      <FiShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                </div>

                {/* Colorful Product Info - Centered */}
                <div className="flex flex-col px-2 text-center items-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-[9px] font-bold text-[#007074] uppercase tracking-widest bg-[#007074]/10 px-2 py-0.5 rounded-full">
                      {product.brand}
                    </span>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-sm md:text-base text-[#2a2a2a] group-hover:text-[#007074] transition-colors line-clamp-1 mb-1.5 px-1">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg md:text-xl font-bold text-[#007074]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through font-medium">${product.originalPrice}</span>
                    )}
                  </div>

                  {product.rating && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 justify-center">
                      <FiStar className="text-yellow-400 fill-yellow-400 drop-shadow-sm" size={10} />
                      {product.rating} / 5.0
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      <QuickViewModal 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
        product={quickViewProduct} 
      />
    </div>
  );
}