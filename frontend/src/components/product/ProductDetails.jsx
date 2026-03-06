import React from 'react'
import { useState } from 'react'

const ProductDetails = () => {

    const [activeTab, setActiveTab] = useState(true)

  return (
     <div className="container mx-auto px-4 md:px-6 pb-16 max-w-6xl">

                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-10 bg-gray-50 p-2 rounded-full border border-gray-200 w-fit mx-auto">
                    {['description', 'specifications', 'reviews'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300
        ${activeTab === tab
                                    ? 'bg-[#007074] text-white shadow'
                                    : 'text-gray-500 hover:text-[#007074]'
                                }`}
                        >
                            {tab}
                            {tab === 'reviews' && ` (${PRODUCT.reviewsCount})`}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">

                    {/* DESCRIPTION */}
                    {activeTab === "description" && (
                        <div className="space-y-10">

                            {/* PRODUCT STORY */}
                            <div className="max-w-3xl mx-auto text-center">
                                <h3 className="text-xl font-semibold text-[#222] mb-3">
                                    Product Overview
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {PRODUCT.fullDescription}
                                </p>
                            </div>

                            {/* KEY BENEFITS */}
                            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">

                                <div className="p-6 border rounded-xl bg-gray-50 hover:shadow-md transition">
                                    <div className="text-3xl mb-3">⚡</div>
                                    <h4 className="font-semibold text-lg mb-1">High Performance</h4>
                                    <p className="text-sm text-gray-500">
                                        Built to deliver reliable performance and long-lasting durability.
                                    </p>
                                </div>

                                <div className="p-6 border rounded-xl bg-gray-50 hover:shadow-md transition">
                                    <div className="text-3xl mb-3">🛡</div>
                                    <h4 className="font-semibold text-lg mb-1">Premium Quality</h4>
                                    <p className="text-sm text-gray-500">
                                        Crafted with high-quality materials ensuring top-tier product standards.
                                    </p>
                                </div>

                                <div className="p-6 border rounded-xl bg-gray-50 hover:shadow-md transition">
                                    <div className="text-3xl mb-3">✨</div>
                                    <h4 className="font-semibold text-lg mb-1">Modern Design</h4>
                                    <p className="text-sm text-gray-500">
                                        Elegant design that blends perfectly with modern lifestyle needs.
                                    </p>
                                </div>

                            </div>

                            {/* FEATURE LIST */}
                            <div className="max-w-2xl mx-auto">

                                <h3 className="text-lg font-semibold text-center mb-4">
                                    Key Features
                                </h3>

                                <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                                    <li className="bg-gray-50 p-3 rounded-lg border">✔ Premium material build</li>
                                    <li className="bg-gray-50 p-3 rounded-lg border">✔ Lightweight & durable</li>
                                    <li className="bg-gray-50 p-3 rounded-lg border">✔ Modern ergonomic design</li>
                                    <li className="bg-gray-50 p-3 rounded-lg border">✔ Long-lasting performance</li>
                                </ul>

                            </div>

                        </div>
                    )}

                    {/* SPECIFICATIONS */}
                    {activeTab === 'specifications' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">

                            {Object.entries(PRODUCT.specs).map(([key, val]) => (
                                <div
                                    key={key}
                                    className="bg-gray-50 hover:bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition"
                                >
                                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                                        {key}
                                    </p>

                                    <p className="text-sm font-semibold text-[#222222]">
                                        {val}
                                    </p>
                                </div>
                            ))}

                            <div className="bg-gray-50 hover:bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                                <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                                    SKU
                                </p>

                                <p className="text-sm font-semibold text-[#222222]">
                                    {PRODUCT.sku}
                                </p>
                            </div>

                        </div>
                    )}

                    {/* REVIEWS */}
                    {activeTab === 'reviews' && (
                        <div className="space-y-8">

                            {/* Review Summary */}
                            <div className="text-center">
                                <h3 className="text-3xl font-bold mb-2">4.8 ★</h3>
                                <p className="text-gray-500">
                                    Based on {PRODUCT.reviewsCount} customer reviews
                                </p>
                            </div>

                            {/* Example Reviews */}
                            <div className="grid md:grid-cols-2 gap-6">

                                <div className="p-6 border rounded-xl bg-gray-50">
                                    <p className="text-sm text-gray-600 mb-3">
                                        "Amazing quality and super fast delivery. Highly recommended!"
                                    </p>

                                    <span className="text-xs font-semibold text-gray-500">
                                        — Verified Customer
                                    </span>
                                </div>

                                <div className="p-6 border rounded-xl bg-gray-50">
                                    <p className="text-sm text-gray-600 mb-3">
                                        "The product design is beautiful and performance is excellent."
                                    </p>

                                    <span className="text-xs font-semibold text-gray-500">
                                        — Verified Customer
                                    </span>
                                </div>

                            </div>

                        </div>
                    )}

                </div>

            </div>
  )
}

export default ProductDetails
