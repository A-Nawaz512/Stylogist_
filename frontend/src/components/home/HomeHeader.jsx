import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function HomeHeader() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider Data for Stylogist.pk
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
      title: 'Elevate Your Signature Style',
      subtitle: 'Discover premium fashion curated just for you by our smart AI.',
      ctaText: 'Shop New Arrivals',
      ctaLink: '/shop'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2070&auto=format&fit=crop',
      title: 'Latest Skincare Essentials',
      subtitle: 'Glow naturally with our top-rated, dermatologist-approved kits.',
      ctaText: 'Explore Skincare',
      ctaLink: '/category/skincare'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
      title: 'The Winter Collection',
      subtitle: 'Cozy, elegant, and timeless. Enjoy up to 40% off on selected items.',
      ctaText: 'View Deals',
      ctaLink: '/deals'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // Changes slide every 6 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-[#222222]">
      {/* Slides Container */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with slight cinematic zoom effect */}
            <div
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[6000ms] linear ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Dark Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 z-20">
              <div
                className={`max-w-3xl transform transition-all duration-1000 delay-300 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-serif drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-[#F7F3F0] mb-10 max-w-2xl mx-auto font-light tracking-wide">
                  {slide.subtitle}
                </p>
                
                {/* Premium Animated CTA Button */}
                <Link
                  to={slide.ctaLink}
                  className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full border border-[#007074] bg-[#007074] text-white font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,112,116,0.3)]"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10">{slide.ctaText}</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Left Arrow */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <FiChevronLeft size={28} />
      </button> */}

      {/* Right Arrow */}
      {/* <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <FiChevronRight size={28} />
      </button> */}

      {/* Bottom Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? 'w-10 h-2.5 bg-[#007074]' // Active dot expands and turns teal
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Tailwind Shimmer Animation for Button */}
      <style jsx="true">{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}