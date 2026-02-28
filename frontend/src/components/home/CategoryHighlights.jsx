import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CategoryHighlights() {
  const categories = [
    {
      id: 1,
      title: "Women's Edition",
      subtitle: "Elegance Redefined",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
      link: "/category/women",
      gridClass: "md:col-span-2 lg:row-span-2 h-[250px] lg:h-full", 
    },
    {
      id: 2,
      title: "Men's Collection",
      subtitle: "Modern Tailoring",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
      link: "/category/men",
      gridClass: "md:col-span-2 h-[250px] lg:h-[220px]", 
    },
    {
      id: 3,
      title: "Luxury Accessories",
      subtitle: "The Final Touch",
      image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop",
      link: "/category/accessories",
      gridClass: "col-span-1 md:col-span-1 h-[250px] lg:h-[220px]", 
    },
    {
      id: 4,
      title: "Premium Footwear",
      subtitle: "Step With Purpose",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop",
      link: "/category/footwear",
      gridClass: "col-span-1 md:col-span-1 h-[250px] lg:h-[220px]", 
    }
  ];

  return (
    <section className="w-full bg-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="relative">
            <span className="inline-block py-1.5 px-4 rounded-md bg-[#007074]/0 text-[#007074] text-xs font-bold tracking-widest uppercase mb-3 border border-[#007074]/20">
              Departments
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#222222] font-serif leading-tight">
              Category <span className="text-[#007074]">Highlights</span>
            </h2>
            <div className="h-1 w-20 bg-[#007074] mt-4 rounded-md"></div>
          </div>
          <p className="text-gray-500 mt-4 md:mt-0 text-base max-w-md text-right md:text-left">
            Explore our meticulously curated departments, tailored to suit every aspect of your sophisticated lifestyle.
          </p>
        </div>

        {/* Proportional Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:h-[464px]">
          {categories.map((category) => (
            <Link 
              to={category.link} 
              key={category.id}
              className={`relative rounded-md overflow-hidden group block ${category.gridClass}`}
            >
              {/* Background Image */}
              <img 
                src={category.image} 
                alt={category.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Content Container */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[#007074] font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {category.subtitle}
                  </p>
                  
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3">
                    {category.title}
                  </h3>
                  
                  {/* Hover Button Effect */}
                  <div className="inline-flex items-center space-x-2 text-white font-bold text-xs md:text-sm tracking-widest uppercase group/btn">
                    <span className="border-b border-transparent group-hover:border-white pb-0.5 transition-colors">
                      Explore
                    </span>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#007074] transition-colors duration-300">
                      <FiArrowRight className="transform group-hover:translate-x-0.5 transition-transform w-3 h-3 md:w-4 md:h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Border Frame */}
              <div className="absolute inset-3 border border-white/20 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}