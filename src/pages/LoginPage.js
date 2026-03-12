import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, register, clearError } from '../redux/slices/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', username: '' });

  useEffect(() => {
    if (user) navigate('/');
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(register(form));
    } else {
      dispatch(login({ email: form.email, password: form.password }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">🏏</div>
            <span className="font-rajdhani font-bold text-3xl text-white">CricDash</span>
          </div>
          <p className="text-slate-400 text-sm">Live Cricket Scores & Statistics</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="font-rajdhani font-bold text-2xl text-white mb-6 text-center">
            {isRegister ? 'Create Account' : 'Sign In'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Username</label>
                <input
                  required
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="Your username"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={isRegister ? 'Min 6 characters' : 'Your password'}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg"
            >
              {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsRegister(!isRegister); dispatch(clearError()); }}
              className="text-sm text-slate-400 hover:text-green-400 transition-colors"
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
            </button>
          </div>

          {/* Demo credentials */}
          {!isRegister && (
            <div className="mt-4 p-3 bg-slate-800/60 rounded-xl text-center">
              <p className="text-xs text-slate-500">Demo admin: <span className="text-green-400">admin@cricket.com</span> / <span className="text-green-400">admin123</span></p>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-slate-500 hover:text-green-400 transition-colors">
            ← Continue without signing in
          </Link>
        </div>
      </div>
    </div>
  );
}
