import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ComonButton from './ComonButton';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="h-screen flex items-center justify-center bg-[#F7F3F0] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl h-[95vh] bg-white shadow-2xl rounded-[40px] overflow-hidden mx-4">

        {/* LEFT SIDE: BRAND SHOWCASE */}
        <div className="hidden lg:flex relative flex-col justify-end p-12 overflow-hidden">
          <div
            className="absolute inset-0 z-0 scale-105 hover:scale-100 transition-transform duration-700"
            style={{
              background: 'url(https://img.freepik.com/premium-photo/colorful-paper-shopping-bag_1273586-38616.jpg?ga=GA1.1.2142144714.1772005373&semt=ais_hybrid&w=740&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#007074] via-[#007074]/30 to-transparent z-10" />

          <div className="relative z-20 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#007074] backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <span className="text-white text-xl font-light tracking-widest uppercase">tylogist</span>
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Welcome Back <br /> to <span className="text-[#FCD9B8]">Stylogist</span>
            </h1>
            <p className="text-white/80 text-sm max-w-xs italic">
              Access your personalized style feed and manage orders.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="flex flex-col justify-center px-8 lg:px-20 bg-white">
          <div className="max-w-md w-full mx-auto">
            <header className="mb-12">
              <h2 className="text-4xl mb-3 md:text-start text-center font-bold text-[#007074]">Sign In</h2>
              <p className="text-black text-sm mt-1 md:text-start text-center">Please enter your credentials to access your account.</p>
            </header>

            <form className="space-y-8">
              <div className="relative group">
                <FiMail className={`absolute left-0 bottom-2 transition-colors duration-300 ${focusedField === 'email' ? 'text-black' : 'text-black/40'}`} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onChange={handleChange}
                  className="w-full pb-2 pl-8 bg-transparent border-b-2 border-black/10 focus:border-black outline-none text-black placeholder-gray-400 transition-all font-medium"
                />
              </div>

              <div className="relative group">
                <FiLock className={`absolute left-0 bottom-2 transition-colors duration-300 ${focusedField === 'password' ? 'text-black' : 'text-black/40'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  onChange={handleChange}
                  className="w-full pb-2 pl-8 pr-10 bg-transparent border-b-2 border-black/10 focus:border-black outline-none text-black placeholder-gray-400 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2 text-black/40 hover:text-black"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="flex justify-start">
                <Link to="/forgot-password" className="text-md  text-[#007074] hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <ComonButton btntitle="Sign In" icon={ <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}/>
            </form>

            <div className="mt-8 text-center text-sm text-[#B5A192]">
              <Link to='/signup' className="group">
                New to Stylogist? <span className="text-[#007074] font-bold cursor-pointer group-hover:underline">Create Account</span>
              </Link>
            </div>

            {/* REAL IMAGE SOCIAL LOGINS */}
            <div className="flex justify-center space-x-6 mt-8">
              <button className="w-12 h-12 flex items-center justify-center bg-white border border-[#E9DBD1] rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300">
                <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" className="w-6 h-6 object-contain" />
              </button>
              <button className="w-12 h-12 flex items-center justify-center bg-white border border-[#E9DBD1] rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300">
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" className="w-6 h-6 object-contain" />
              </button>
              <button className="w-12 h-12 flex items-center justify-center bg-white border border-[#E9DBD1] rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300">
                <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="Apple" className="w-6 h-6 object-contain" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}