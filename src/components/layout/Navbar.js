import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleDarkMode, toggleSidebar, setSearchQuery } from '../../redux/slices/uiSlice';
import { logout } from '../../redux/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(search));
    navigate(`/matches?search=${encodeURIComponent(search)}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-rajdhani font-bold text-green-600 dark:text-green-400">🏏 CricDash</span>
          </Link>
        </div>

        {/* Center: Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search matches, players, teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 transition-all"
            />
          </div>
        </form>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-rajdhani font-bold text-sm">
                  {user.username?.[0]?.toUpperCase()}
                </div>
                <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-300">{user.username}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50 animate-slide-in">
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                      <span>⚙️</span> Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
