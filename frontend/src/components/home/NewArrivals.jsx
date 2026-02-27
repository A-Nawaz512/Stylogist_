import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiShoppingBag, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function NewArrivals() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // New Arrivals Data
  const newArrivals = [
    {
      id: 201,
      name: "Emerald Silk Maxi Dress",
      category: "Women's Apparel",
      price: 14500,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop",
      description: "Fluid silk satin that drapes beautifully, featuring a modern cowl neckline."
    },
    {
      id: 202,
      name: "Textured Leather Handbag",
      category: "Accessories",
      price: 8999,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop",
      description: "Structured design with gold-tone hardware and a spacious interior."
    },
    {
      id: 203,
      name: "Double-Breasted Trench",
      category: "Outerwear",
      price: 18999,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1539533018408-ea240f2eeed4?q=80&w=1974&auto=format&fit=crop",
      description: "A timeless classic tailored from a premium water-resistant cotton blend."
    },
    {
      id: 204,
      name: "Suede Ankle Boots",
      category: "Footwear",
      price: 11200,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1935&auto=format&fit=crop",
      description: "Handcrafted suede with a comfortable block heel for everyday elegance."
    }
  ];

  // Auto-play logic
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % newArrivals.length);
      }, 4000); // Changes image every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, newArrivals.length]);

  // Handle manual click
  const handleItemClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false); // Stop auto-playing when user manually selects
  };

  return (
    <section className="w-full bg-white py-10">
      <div className=" px-4 sm:px-6 lg:px-8">
        
        <div className="grid w-full sm:max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* LEFT SIDE: CONTENT & INTERACTIVE MENU */}
          <div className="w-full flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8">
              <span className="inline-block py-1.5 px-4 rounded-md bg-[#007074]/0 text-[#007074] text-xs font-bold tracking-widest uppercase mb-3 border border-[#007074]/20">
                Fresh Drops
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#222222] font-serif leading-tight">
                The <span className="text-[#007074]">New Editorials</span>
              </h2>
              <p className="text-gray-500 mt-3 text-base">
                Explore the latest additions to our premium collection, designed to elevate your everyday style.
              </p>
            </div>

            {/* Interactive Product List */}
            <div className="flex flex-col space-y-5 relative border-l-2 border-gray-200 pl-6 ml-2">
              {/* Animated active indicator line */}
              <div 
                className="absolute left-[-2px] w-1 bg-[#007074] transition-all duration-500 ease-out"
                style={{ 
                  height: '25%', 
                  top: `${activeIndex * 25}%` 
                }}
              />

              {newArrivals.map((product, index) => (
                <div 
                  key={product.id}
                  className="cursor-pointer group"
                  onClick={() => handleItemClick(index)}
                >
                  <p className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                    activeIndex === index ? 'text-[#007074]' : 'text-gray-400'
                  }`}>
                    {product.category}
                  </p>
                  <h3 className={`text-md mt-2 font-serif transition-all duration-300 transform ${
                    activeIndex === index ? 'text-[#222222] translate-x-2' : 'text-gray-400 group-hover:text-gray-600'
                  }`}>
                    {product.name}
                  </h3>
                </div>
              ))}
            </div>

            {/* Global CTA */}
            <div className="mt-6">
              <Link
                to="/new-arrivals"
                className="inline-flex items-center space-x-2 text-[#007074] border border-[#007074] px-3 py-3 font-bold text-base hover:text-white hover:bg-[#007074] transition-colors group"
              >
                <span className="border-b-2 border-transparent pb-0.5">Shop All New Arrivals</span>
                <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: CINEMATIC IMAGE SHOWCASE */}
          <div className="w-full flex items-center justify-center relative h-[450px] rounded-md overflow-hidden shadow-lg border border-gray-100">
            {newArrivals.map((product, index) => (
              <div
                key={`img-${product.id}`}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                  activeIndex === index ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
                }`}
              >
                {/* Product Image */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                
                {/* Dark Gradient Overlay for the floating card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Floating Glassmorphism Product Card */}
                <div className={`absolute bottom-6 left-6 right-6 md:left-8 md:right-8 bg-white/90 backdrop-blur-sm p-3 rounded-md shadow-2xl transition-all duration-700 delay-100 border-t border-white/50 ${
                  activeIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-1 mb-1.5">
                        <FiStar className="fill-[#007074] text-[#007074] w-3.5 h-3.5" />
                        <span className="text-sm font-bold text-[#222222]">{product.rating}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2 pr-4">
                        {product.description}
                      </p>
                      <span className="text-lg font-bold text-[#007074]">
                        Rs. {product.price.toLocaleString()}
                      </span>
                    </div>

                    <button className="flex items-center justify-center space-x-2 bg-[#007074] text-white px-6 py-3 rounded-md font-bold hover:bg-[#005a5d] cursor-pointer hover:shadow-lg transition-all duration-300 transform active:scale-95 whitespace-nowrap">
                      <FiShoppingBag size={18} />
                      <span>Add to Cart</span>
                    </button>
                    
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}