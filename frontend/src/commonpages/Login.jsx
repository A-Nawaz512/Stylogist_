import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate()

  const handleLogin = () => {
    const loginUser = {
      name: "Allah Nawaz",
      email: "nawaz51412@gmail.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      role: "Premium Member",
      joined: "March 2026"
    };
    localStorage.setItem("user", JSON.stringify(loginUser));
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F4F6] p-2 sm:p-6 lg:p-2 font-sans">

      {/* Main Responsive Container */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1100px] min-h-[600px] lg:h-[80vh] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden">

        {/* LEFT SIDE: VIBRANT BRAND PANEL (Hidden on small mobile if needed, but here it's responsive) */}
        <div className="relative w-full lg:w-1/2 h-[250px] lg:h-full overflow-hidden bg-[#007074]">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 transition-transform duration-[10s] hover:scale-110"
            alt="Fashion"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#007074] via-transparent to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-12 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-[#007074] font-bold">S</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Premium Access</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tighter">
              Elevate your <br />
              <span className="text-teal-200 italic font-medium">Digital Style.</span>
            </h1>
          </div>
        </div>

        {/* RIGHT SIDE: CLEAN & SHARP LOGIN FORM */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 bg-white">
          <div className="w-full max-w-sm mx-auto">

            <header className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Sign In</h2>
              <p className="text-slate-500 text-sm font-medium">Welcome back to the Stylogist collective.</p>
            </header>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                <div className={`relative flex items-center border-2 rounded-2xl transition-all duration-300 ${focusedField === 'email' ? 'border-[#007074] bg-white shadow-[0_0_15px_rgba(0,112,116,0.1)]' : 'border-slate-100 bg-slate-50'}`}>
                  <FiMail className="ml-4 text-slate-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@stylogist.pk"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleChange}
                    className="w-full py-4 px-4 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Password</label>
                  <Link to="/forgot-password" size={16} className="text-[11px] font-black text-[#007074] uppercase hover:underline">Forgot?</Link>
                </div>
                <div className={`relative flex items-center border-2 rounded-2xl transition-all duration-300 ${focusedField === 'password' ? 'border-[#007074] bg-white shadow-[0_0_15px_rgba(0,112,116,0.1)]' : 'border-slate-100 bg-slate-50'}`}>
                  <FiLock className="ml-4 text-slate-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleChange}
                    className="w-full py-4 px-4 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-4 text-slate-300 hover:text-[#007074] transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <button onClick={handleLogin} className="w-full bg-[#007074] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#005a5d] shadow-xl shadow-[#007074]/20 transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-3">
                Login <FiArrowRight />
              </button>
            </form>

            <div className="mt-10 text-center">
              <Link to='/signup' className="text-[10px] font-black text-slate-400 uppercase tracking-widest group">
                New to Stylogist? <span className="text-[#007074] group-hover:underline">Create Account</span>
              </Link>
            </div>

            {/* Social Logins */}
            <div className="flex justify-center gap-4 mt-8">
              {['https://cdn-icons-png.flaticon.com/512/300/300221.png', 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png', 'https://cdn-icons-png.flaticon.com/512/0/747.png'].map((img, i) => (
                <button key={i} className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:scale-110 transition-all active:scale-90">
                  <img src={img} className="w-5 h-5 object-contain grayscale hover:grayscale-0" alt="social" />
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}