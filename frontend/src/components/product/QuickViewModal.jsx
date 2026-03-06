import React, { useState } from 'react';
import { FiX, FiShoppingCart, FiLoader } from 'react-icons/fi';

export default function QuickViewModal({ isOpen, onClose, product }) {

    console.log("product", product);


    // State for selections and loading UI
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        setIsAddingToCart(true);

        // Simulate API call to Node.js backend (takes 800ms)
        setTimeout(() => {
            setIsAddingToCart(false);
            setShowSuccess(true);

            // Reset success message and close modal after 1.5s
            setTimeout(() => {
                setShowSuccess(false);
                onClose();
            }, 1500);
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Dark Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row z-10 animate-fade-in-up">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                >
                    <FiX size={18} />
                </button>

                {/* Left: Product Image */}
                <div className="w-full md:w-5/12 bg-[#F7F3F0] relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply max-h-[300px] md:max-h-[500px]"
                    />
                </div>

                {/* Right: Product Options */}
                <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-[#222222] mb-1">
                        {product.name}
                    </h2>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl font-bold text-[#222222]">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through font-medium">${product.originalPrice}</span>
                        )}
                    </div>

                    {/* Colors */}
                    {product.colors && (
                        <div className="mb-5">
                            <h3 className="font-bold text-sm text-[#222222] mb-2">Color: <span className="font-normal text-gray-500">{selectedColor}</span></h3>
                            <div className="flex gap-2">
                                {product.colors.map(color => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-8 h-8 rounded-full transition-all ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-[#222222]' : 'ring-1 ring-gray-200 hover:ring-gray-400'}`}
                                        style={{ backgroundColor: color.hex }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sizes */}
                    {product.sizes && (
                        <div className="mb-8">
                            <h3 className="font-bold text-sm text-[#222222] mb-2">Size:</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors border ${selectedSize === size
                                                ? 'bg-[#222222] text-white border-[#222222]'
                                                : 'bg-[#F7F3F0] text-gray-600 border-transparent hover:border-[#007074]'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <button
                            onClick={handleAddToCart}
                            disabled={isAddingToCart || showSuccess}
                            className={`w-full py-3.5 rounded-full flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 ${showSuccess
                                    ? 'bg-green-500 text-white'
                                    : 'bg-[#222222] text-white hover:bg-[#007074]'
                                }`}
                        >
                            {isAddingToCart ? (
                                <><FiLoader className="animate-spin" size={18} /> Adding...</>
                            ) : showSuccess ? (
                                '✓ Added to Cart'
                            ) : (
                                <><FiShoppingCart size={18} /> Add to Cart - ${product.price}</>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}