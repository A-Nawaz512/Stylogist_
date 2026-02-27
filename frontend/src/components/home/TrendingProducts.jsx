import React, { useState } from 'react';
import { FiHeart, FiShoppingBag, FiEye, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ComonButton from '../../commonpages/ComonButton';

export default function TrendingProducts() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Sample trending products data (Top 4 for a solid row)
  const trendingProducts = [
    {
      id: 101,
      name: "Silk Satin Slip Dress",
      brand: "Elegance",
      shortDesc: "Luxurious pure silk, cowl neck",
      originalPrice: 15999,
      salePrice: 11999,
      rating: 4.9,
      reviews: 512,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop",
      isTrending: true,
    },
    {
      id: 102,
      name: "Oversized Wool Coat",
      brand: "Nordic Time",
      shortDesc: "Heavyweight wool blend, relaxed fit",
      originalPrice: 9499,
      salePrice: 7999,
      rating: 4.7,
      reviews: 340,
      image: "https://images.unsplash.com/photo-1539533018408-ea240f2eeed4?q=80&w=1974&auto=format&fit=crop",
      isTrending: true,
    },
    {
      id: 103,
      name: "Classic Chelsea Boots",
      brand: "Urban Luxe",
      shortDesc: "Suede leather, elastic side panels",
      originalPrice: 8999,
      salePrice: 5999,
      rating: 4.6,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1935&auto=format&fit=crop",
      isTrending: true,
    },
    {
      id: 104,
      name: "Quilted Crossbody Bag",
      brand: "Artisan",
      shortDesc: "Gold-tone hardware, genuine leather",
      originalPrice: 5499,
      salePrice: 4299,
      rating: 4.8,
      reviews: 621,
      image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop",
      isTrending: true,
    }
  ];

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="text-[#B08463] w-3.5 h-3.5" />)}
        {halfStar && <FaStarHalfAlt className="text-[#B08463] w-3.5 h-3.5" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="text-[#B08463] w-3.5 h-3.5" />)}
      </div>
    );
  };

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <FiTrendingUp className="text-[#B08463] w-6 h-6" />
              <span className="text-[#B08463] font-bold tracking-widest uppercase text-sm">Most Wanted</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#222222] font-serif">
              Trending <span className="text-[#007074]">Right Now</span>
            </h2>
            <div className="h-1.5 w-24 bg-[#007074] mt-4 rounded-full"></div>
          </div>

          {/* View All Button */}
          <div className="mt-6 md:mt-0">
             <Link
              to="/trending"
              className="group inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-[#007074] text-[#007074] font-semibold transition-all duration-300 hover:bg-[#007074] hover:text-white"
            >
              <span>Explore Trending</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Static Grid Layout for High Impact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,112,116,0.2)] transition-all duration-500 border border-[#E9DBD1]"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image Section */}
              <div className="relative h-[360px] w-full overflow-hidden bg-[#F7F3F0]">
                
                {/* TRENDING BADGE */}
                {product.isTrending && (
                  <div className="absolute top-4 left-4 z-20 bg-[#B08463] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-md flex items-center gap-1.5">
                    <FiTrendingUp size={14} /> Trending
                  </div>
                )}

                {/* Wishlist Heart */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-transform hover:scale-110"
                >
                  <FiHeart
                    size={20}
                    className={wishlist.includes(product.id) ? 'fill-[#e63946] text-[#e63946]' : 'text-gray-600 hover:text-[#e63946]'}
                  />
                </button>

                {/* Main Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover Overlay Actions */}
                <div className="absolute inset-0 bg-[#007074]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10 backdrop-blur-[1px]">
                  <button className="p-3 bg-white text-[#007074] rounded-full hover:bg-[#007074] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg">
                    <FiEye size={20} />
                  </button>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-[#007074] font-bold uppercase tracking-widest">
                    {product.brand}
                  </p>
                  <RatingStars rating={product.rating} />
                </div>

                <h3 className="text-xl font-bold text-[#222222] mb-1 line-clamp-1 group-hover:text-[#007074] transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                  {product.shortDesc}
                </p>

                <div className="flex items-end space-x-3 mb-6">
                  <span className="text-2xl font-bold text-[#222222]">
                    Rs. {product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 line-through mb-1">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Reusing your custom button */}
                <ComonButton btntitle="Add to Cart" icon={<FaShoppingBag size={18} />} />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}