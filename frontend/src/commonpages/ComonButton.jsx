import React from 'react'
import { FiArrowRight } from 'react-icons/fi'

export default function ComonButton({ btntitle, icon, padding }) {
    return (
        <div>
            <button
                type="submit"
                className={`group relative ${padding ? padding : 'py-3'} w-full py-2 mt-3 overflow-hidden rounded-md cursor-pointer border border-[#007074] bg-[#007074] text-white font-bold transition-all duration-300 flex items-center justify-center space-x-2 z-10 hover:bg-[#007074] hover:text-white before:absolute before:top-0 before:-left-full before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 before:ease-in-out hover:before:left-full`}
            >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>{btntitle}</span>
                    <span className="text-white">{icon}</span>

                </span>
            </button>
        </div>
    )
}
