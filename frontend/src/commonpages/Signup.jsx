import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="h-screen flex items-center justify-center bg-[#F7F3F0] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl h-[90vh] bg-white shadow-2xl rounded-[40px] overflow-hidden mx-4">
        
        {/* LEFT SIDE: BRAND SHOWCASE (Image & Gradient) */}
        <div className="hidden lg:flex relative flex-col justify-end p-12 overflow-hidden bg-[#714329]">
          {/* Background Image with Gradient Overlay */}
          <div 
            className="absolute inset-0 z-0 scale-105 hover:scale-100 transition-transform duration-700"
            style={{
              background: 'url(https://img.freepik.com/premium-vector/woman-shopping-ecommerce-store_670881-8.jpg?ga=GA1.1.2142144714.1772005373&semt=ais_hybrid&w=740&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {/* Linear Gradient for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#714329] via-[#714329]/20 to-transparent z-10" />

          <div className="relative z-20 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <span className="text-white text-xl font-light tracking-widest uppercase">tylogist</span>
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Style Meets <br /> <span className="text-[#FCD9B8]">Innovation</span>
            </h1>
            <p className="text-white/80 text-sm max-w-xs italic">
              AI-powered recommendations for the modern fashion enthusiast.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: SIGNUP FORM (Border-Bottom Inputs) */}
        <div className="flex flex-col justify-center px-8 lg:px-20 py-8 bg-white">
          <div className="max-w-md w-full mx-auto">
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-[#714329]">Join Stylogist</h2>
              <p className="text-[#B08463] text-sm mt-1">Start your personalized style journey.</p>
            </header>

            <form className="space-y-8">
              {/* Full Name */}
              <div className="relative group">
                <FiUser className={`absolute left-0 bottom-2 transition-colors ${focusedField === 'name' ? 'text-[#714329]' : 'text-[#D0B9A7]'}`} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  onChange={handleChange}
                  className="w-full pb-2 pl-8 bg-transparent border-b-2 border-[#E9DBD1] focus:border-[#714329] outline-none text-[#714329] placeholder-[#D0B9A7] transition-all"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <FiMail className={`absolute left-0 bottom-2 transition-colors ${focusedField === 'email' ? 'text-[#714329]' : 'text-[#D0B9A7]'}`} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onChange={handleChange}
                  className="w-full pb-2 pl-8 bg-transparent border-b-2 border-[#E9DBD1] focus:border-[#714329] outline-none text-[#714329] placeholder-[#D0B9A7] transition-all"
                />
              </div>

              {/* Phone */}
              <div className="relative group">
                <FiPhone className={`absolute left-0 bottom-2 transition-colors ${focusedField === 'phone' ? 'text-[#714329]' : 'text-[#D0B9A7]'}`} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  onChange={handleChange}
                  className="w-full pb-2 pl-8 bg-transparent border-b-2 border-[#E9DBD1] focus:border-[#714329] outline-none text-[#714329] placeholder-[#D0B9A7] transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <FiLock className={`absolute left-0 bottom-2 transition-colors ${focusedField === 'password' ? 'text-[#714329]' : 'text-[#D0B9A7]'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  onChange={handleChange}
                  className="w-full pb-2 pl-8 pr-10 bg-transparent border-b-2 border-[#E9DBD1] focus:border-[#714329] outline-none text-[#714329] placeholder-[#D0B9A7] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2 text-[#D0B9A7] hover:text-[#714329] transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Submit Button with Gradient */}
              <button 
                type="submit"
                className="w-full py-4 mt-4 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 bg-gradient-to-r from-[#714329] via-[#B08463] to-[#B9937B] flex items-center justify-center space-x-2"
              >
                <span>Create Account</span>
                <FiArrowRight />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#B5A192]">
              Already a member? <span className="text-[#714329] font-bold cursor-pointer hover:underline">Sign In</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}