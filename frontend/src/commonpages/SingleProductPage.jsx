import React, { useState } from 'react';
import { 
  FiChevronRight, 
  FiStar, 
  FiHeart, 
  FiMinus, 
  FiPlus, 
  FiShoppingCart, 
  FiTruck, 
  FiShield,
  FiX,
  FiLoader,
  FiTrendingUp
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

// ==========================================
// MOCK DATA
// ==========================================
const PRODUCT = {
  id: 1,
  name: "Gradient Graphic T-shirt",
  brand: "Stylogist Originals",
  price: 145,
  originalPrice: 180,
  discount: 19,
  rating: 4.8,
  reviewsCount: 124,
  sku: "STY-GG-001",
  availability: "In Stock",
  shortDescription: "Elevate your casual wardrobe with our premium gradient graphic t-shirt. Crafted from ultra-soft cotton, featuring a modern relaxed fit.",
  fullDescription: "Designed for the modern trendsetter, this t-shirt combines comfort with an edgy aesthetic. The gradient print is achieved using eco-friendly, fade-resistant inks. Featuring a ribbed crew neck, drop shoulders, and double-stitched hems for unmatched durability and a perfect drape.",
  specs: {
    Material: "100% Organic Cotton",
    Weight: "180 GSM",
    Fit: "Relaxed Fit",
    Care: "Machine wash cold, tumble dry low"
  },
  images: [
    "https://i.pinimg.com/736x/93/a6/8e/93a68e84e3034ac85604cee7944c3e86.jpg",
    "https://teelabs.in/wp-content/uploads/2021/02/polo-red-and-white-2-300x289.png",
    "https://teelabs.in/wp-content/uploads/2021/02/polo-blue-and-white-2-1.png"
  ],
  colors: [
    { name: "Charcoal", hex: "#333333" },
    { name: "Olive", hex: "#556B2F" },
    { name: "Sand", hex: "#C2B280" }
  ],
  sizes: ["Small", "Medium", "Large", "X-Large"]
};

const TRENDING_PRODUCTS = [
  { id: 6, name: "Oversized Vintage Hoodie", brand: "Stylogist", price: 190, originalPrice: 220, discount: 15, rating: 4.9, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop" },
  { id: 7, name: "Cargo Joggers", brand: "Active", price: 160, originalPrice: null, rating: 4.6, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop" },
  { id: 8, name: "Linen Summer Button-Up", brand: "Formals", price: 135, originalPrice: 150, discount: 10, rating: 4.7, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1925&auto=format&fit=crop" },
  { id: 10, name: "Classic White Sneakers", brand: "Footwear", price: 210, originalPrice: 250, discount: 16, rating: 5.0, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop" },
];

const SUGGESTED_PRODUCTS = [
  { id: 3, name: "Black Striped T-shirt", brand: "Originals", price: 120, originalPrice: 150, discount: 20, rating: 5.0, image: "https://customized.ftwear.in/wp-content/uploads/2022/03/Red-black-polo-ftwear-ff0000-1-scaled.jpg" },
  { id: 4, name: "Skinny Fit Jeans", brand: "Denim Co.", price: 240, originalPrice: 260, discount: 8, rating: 3.5, image: "https://najibmaya.pk/cdn/shop/products/994CE2A75687D5F7AF76E0603F5DC4011FA7EC4FABE6F48AD9_pimgpsh_fullsize_distr-700x700_700x.jpg?v=1664228392" },
  { id: 5, name: "Checkered Shirt", brand: "Formals", price: 180, originalPrice: null, rating: 4.5, image: "https://i5.walmartimages.com/seo/SCODI-Polo-Shirts-for-Men-Short-Sleeve-Solid-Color-Causal-Collared-Golf-Tennis-T-Shirt-Men-s-Golf-Polo-Shirts-Business-Polo-Shirts-black-red-L_9edd4cea-8c34-4564-a063-606794898128.573b591080111c55bb44b729d62cd2c3.jpeg" },
  { id: 9, name: "Loose Fit Bermuda Shorts", brand: "Active", price: 80, originalPrice: null, rating: 3.0, image: "https://najibmaya.pk/cdn/shop/products/Beige_BlackFormalShirt-700x700_700x.jpg?v=1664228789" },
];

// --- ZOOM LOGIC HANDLER ---
const handleImageZoom = (e) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;
  e.currentTarget.firstChild.style.transformOrigin = `${x}% ${y}%`;
};

const handleZoomLeave = (e) => {
  e.currentTarget.firstChild.style.transformOrigin = 'center center';
};

// ==========================================
// QUICK VIEW MODAL COMPONENT (Upgraded Style)
// ==========================================
function QuickViewModal({ isOpen, onClose, product }) {
  const [selectedSize, setSelectedSize] = useState('M');
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
      {/* Sleek blurred backdrop */}
      <div className="absolute inset-0 bg-[#222222]/40 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      {/* Premium Modal Container */}
      <div className="relative bg-white rounded-[2rem] shadow-[0_0_40px_rgba(0,112,116,0.2)] w-full max-w-4xl overflow-hidden flex flex-col md:flex-row z-10 animate-[scaleIn_0.3s_ease-out]">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:text-rose-500 transition-all duration-300 shadow-sm hover:rotate-90">
          <FiX size={18} />
        </button>
        
        {/* Modal Image with Zoom */}
        <div className="w-full md:w-1/2 bg-[#F7F3F0] relative overflow-hidden cursor-zoom-in group"
             onMouseMove={handleImageZoom}
             onMouseLeave={handleZoomLeave}>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply max-h-[350px] md:max-h-[550px] transition-transform duration-300 hover:scale-[1.8]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        {/* Modal Content */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#007074] bg-[#007074]/10 px-3 py-1 rounded-full w-fit mb-3">
            {product.brand || "Stylogist"}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2a2a2a] mb-2">{product.name}</h2>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-[#007074]">${product.price}</span>
            {product.originalPrice && <span className="text-sm text-gray-400 line-through font-medium">${product.originalPrice}</span>}
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-[#2a2a2a] uppercase tracking-widest">Select Size</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${selectedSize === size ? 'bg-[#2a2a2a] text-white shadow-[0_5px_15px_rgba(0,0,0,0.2)] scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-[#007074]'}`}>{size}</button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <button onClick={handleAddToCart} disabled={isAddingToCart || showSuccess} className={`w-full py-4 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1 ${showSuccess ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-[0_10px_20px_rgba(74,222,128,0.3)]' : 'bg-gradient-to-r from-[#2a2a2a] to-gray-800 text-white shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,112,116,0.3)] hover:from-[#007074] hover:to-teal-500'}`}>
              {isAddingToCart ? <><FiLoader className="animate-spin" size={16} /> Processing...</> : showSuccess ? '✓ Successfully Added' : <><FiShoppingCart size={16} /> Add to Cart</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function ProductDetailsPage() {
  const [activeImage, setActiveImage] = useState(PRODUCT.images[0]);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0].name);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleQuantity = (type) => {
    if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'inc' && quantity < 10) setQuantity(quantity + 1);
  };

  const renderStars = (rating) => (
    <div className="flex items-center gap-1 text-yellow-400 text-xs">
      {[...Array(5)].map((_, i) => (
        <FiStar key={i} fill={i < Math.floor(rating) ? "currentColor" : "none"} className={i < Math.floor(rating) ? "text-yellow-400 drop-shadow-sm" : "text-gray-200"} />
      ))}
    </div>
  );

  // CSS for Animations injected dynamically
  const customStyles = `
    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      0% { opacity: 0; transform: scale(0.9); }
      100% { opacity: 1; transform: scale(1); }
    }
    .animate-stagger {
      opacity: 0;
      animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `;

  return (
    <div className="w-full bg-[#F7F9FA] font-sans text-[#2a2a2a] overflow-hidden min-h-screen">
      <style>{customStyles}</style>

      {/* BREADCRUMBS */}
      <div className="container mx-auto px-4 md:px-6 py-6 max-w-6xl">
        <div className="flex items-center gap-2 text-[11px] text-gray-500 uppercase tracking-widest bg-white/60 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white shadow-sm">
          <Link to="/" className="hover:text-[#007074] transition-colors">Home</Link> <FiChevronRight size={10} />
          <Link to="/shop" className="hover:text-[#007074] transition-colors">Shop</Link> <FiChevronRight size={10} />
          <span className="text-[#007074] font-bold truncate">{PRODUCT.name}</span>
        </div>
      </div>

      {/* TOP SECTION: CENTERED PREMIUM CARD */}
      <div className="container mx-auto px-4 md:px-6 pb-12 max-w-6xl">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,112,116,0.05)] border border-white p-4 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch animate-[scaleIn_0.5s_ease-out]">

          {/* Left: Image Gallery with ZOOM */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 h-full">
            <div className="flex md:flex-col gap-3 overflow-x-auto md:w-20 shrink-0 custom-scrollbar pb-2 md:pb-0">
              {PRODUCT.images.map((img, idx) => (
                <button key={idx} onClick={() => setActiveImage(img)} className={`w-16 md:w-full aspect-[4/5] bg-[#F7F3F0] rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${activeImage === img ? 'border-[#007074] shadow-md' : 'border-transparent hover:border-gray-200'}`}>
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>

            {/* Main Zoomable Image */}
            <div 
              className="w-full aspect-[4/5] max-h-[550px] bg-[#F7F3F0] rounded-[2rem] overflow-hidden relative shadow-inner cursor-zoom-in"
              onMouseMove={handleImageZoom}
              onMouseLeave={handleZoomLeave}
            >
              <img src={activeImage} alt={PRODUCT.name} className="w-full h-full object-cover mix-blend-multiply transition-transform duration-300 hover:scale-[1.8]" />
              
              {PRODUCT.discount && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  Save {PRODUCT.discount}%
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-2">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-[#007074] uppercase tracking-widest bg-[#007074]/10 px-2.5 py-1 rounded-full">
                {PRODUCT.brand}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#2a2a2a] mb-3 leading-tight">{PRODUCT.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                {renderStars(PRODUCT.rating)}
                <span className="font-medium ml-1">({PRODUCT.reviewsCount} Reviews)</span>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-bold text-[#007074]">${PRODUCT.price}</span>
              {PRODUCT.originalPrice && <span className="text-lg text-gray-400 line-through font-medium pb-1">${PRODUCT.originalPrice}</span>}
            </div>

            <p className="text-gray-500 text-sm mb-8 leading-relaxed">{PRODUCT.shortDescription}</p>

            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              {/* Color Selection */}
              <div>
                <h3 className="font-bold text-xs text-[#2a2a2a] uppercase tracking-widest mb-3">Color: <span className="text-gray-500 font-normal normal-case">{selectedColor}</span></h3>
                <div className="flex gap-3">
                  {PRODUCT.colors.map(color => (
                    <button key={color.name} onClick={() => setSelectedColor(color.name)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${selectedColor === color.name ? 'ring-2 ring-offset-4 ring-[#007074] shadow-md' : 'ring-1 ring-gray-200'}`} style={{ backgroundColor: color.hex }} aria-label={color.name} />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-xs text-[#2a2a2a] uppercase tracking-widest">Size</h3>
                  <button className="text-[10px] text-[#007074] font-bold hover:underline uppercase tracking-widest">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${selectedSize === size ? 'bg-[#2a2a2a] text-white shadow-[0_5px_15px_rgba(0,0,0,0.2)]' : 'bg-gray-50 text-gray-600 hover:bg-white hover:border-[#007074] border border-transparent'}`}>{size}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap sm:flex-nowrap gap-4 mb-6">
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-full px-4 py-2 w-32 shrink-0 shadow-sm">
                <button onClick={() => handleQuantity('dec')} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><FiMinus size={14} /></button>
                <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} className="p-1.5 text-gray-400 hover:text-[#007074] transition-colors"><FiPlus size={14} /></button>
              </div>
              <button className="flex-1 bg-gradient-to-r from-[#2a2a2a] to-gray-800 text-white rounded-full py-3.5 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,112,116,0.3)] hover:from-[#007074] hover:to-teal-500">
                <FiShoppingCart size={16} /> Add to Cart
              </button>
              <button className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-500 hover:bg-rose-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md shrink-0">
                <FiHeart size={18} />
              </button>
            </div>

            {/* Streamlined Trust Badges */}
            <div className="flex items-center gap-6 pt-6 border-t border-gray-100 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><FiTruck size={14} className="text-[#007074]"/> Free Delivery Over $200</span>
              <span className="flex items-center gap-1.5"><FiShield size={14} className="text-[#007074]"/> COD Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: SLEEK TABS */}
      <div className="container mx-auto px-4 md:px-6 pb-16 max-w-4xl animate-[slideUpFade_0.5s_ease-out]">
        <div className="flex justify-center gap-2 mb-10 bg-white p-2 rounded-full border border-gray-100 shadow-sm w-fit mx-auto">
          {['description', 'specifications', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300
        ${activeTab === tab
                  ? 'bg-[#007074] text-white shadow-md'
                  : 'text-gray-500 hover:text-[#2a2a2a]'
                }`}
            >
              {tab}
              {tab === 'reviews' && ` (${PRODUCT.reviewsCount})`}
            </button>
          ))}
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 text-sm md:text-base text-gray-600 leading-relaxed text-center">
          {activeTab === "description" && (
            <div className="max-w-2xl mx-auto animate-[slideUpFade_0.3s_ease-out]">
              <p>{PRODUCT.fullDescription}</p>
            </div>
          )}
          {activeTab === 'specifications' && (
            <div className="max-w-lg mx-auto text-left animate-[slideUpFade_0.3s_ease-out]">
              <ul className="divide-y divide-gray-100">
                {Object.entries(PRODUCT.specs).map(([key, val]) => (
                  <li key={key} className="py-3.5 flex justify-between"><span className="font-bold text-gray-800">{key}</span><span className="text-gray-500">{val}</span></li>
                ))}
                <li className="py-3.5 flex justify-between"><span className="font-bold text-gray-800">SKU</span><span className="text-gray-500">{PRODUCT.sku}</span></li>
              </ul>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="animate-[slideUpFade_0.3s_ease-out]">
               <p>Customer reviews will be displayed here.</p>
            </div>
          )}
        </div>
      </div>

      {/* SUGGESTED PRODUCTS WITH PREMIUM CARD STYLE */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold font-serif text-[#2a2a2a]">You Might Also Like</h2>
            <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-[#007074] hover:text-[#2a2a2a] transition-colors">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
            {SUGGESTED_PRODUCTS.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                setQuickViewProduct={setQuickViewProduct} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      <QuickViewModal isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
    </div>
  );
}

// ==========================================
// REUSABLE PRODUCT CARD COMPONENT (Premium Framed Style)
// ==========================================
function ProductCard({ product, setQuickViewProduct, index }) {
  return (
    <div className="group flex flex-col relative w-full max-w-[260px] animate-stagger" style={{ animationDelay: `${index * 100}ms` }}>
      
      {/* Premium Padded Image Container (Card within a Card) */}
      <div className="w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4 relative bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,112,116,0.15)] group-hover:-translate-y-2 border border-gray-100/50 p-2">
        
        {/* Inner image wrapper */}
        <Link to={`/product/${product.id}`} className="block w-full h-full rounded-[1rem] overflow-hidden bg-[#F7F3F0]">
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

        {/* Floating Wishlist Heart */}
        <button 
          onClick={(e) => e.preventDefault()} 
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-rose-500 shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-all duration-300 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 z-10 hover:scale-110 hover:bg-rose-50"
          aria-label="Add to wishlist"
        >
          <FiHeart size={16} />
        </button>

        {/* Slide-Up Glassmorphism Action Bar */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
          <button 
            onClick={(e) => { e.preventDefault(); setQuickViewProduct(product); }} 
            className="w-full py-3 rounded-xl text-[11px] font-bold shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5 bg-white/95 backdrop-blur-lg text-[#2a2a2a] border border-white hover:bg-gradient-to-r hover:from-[#007074] hover:to-teal-500 hover:text-white hover:border-transparent uppercase tracking-widest"
          >
            <FiShoppingCart size={14} /> Quick Add
          </button>
        </div>
      </div>

      {/* Colorful, Centered Product Info */}
      <div className="flex flex-col px-2 text-center items-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[9px] font-bold text-[#007074] uppercase tracking-widest bg-[#007074]/10 px-2 py-0.5 rounded-full">
            {product.brand || "Stylogist"}
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-sm md:text-base text-[#2a2a2a] group-hover:text-[#007074] transition-colors line-clamp-1 mb-1.5 px-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-lg font-bold text-[#007074]">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through font-medium">${product.originalPrice}</span>
          )}
        </div>

        {/* Dynamic Star Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 justify-center">
            <FiStar className="text-yellow-400 fill-yellow-400 drop-shadow-sm" size={10} />
            {product.rating} / 5.0
          </div>
        )}
      </div>

    </div>
  );
}