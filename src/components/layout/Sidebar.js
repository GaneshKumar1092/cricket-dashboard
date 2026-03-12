import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠', exact: true },
  { to: '/matches', label: 'Live Scores', icon: '📺' },
  { to: '/matches?category=ipl', label: 'IPL 2025', icon: '🏆' },
  { to: '/matches?category=bbl', label: 'BBL', icon: '🦘' },
  { to: '/matches?category=psl', label: 'PSL', icon: '🌙' },
  { to: '/matches?category=international', label: 'International', icon: '🌍' },
  { to: '/matches?category=domestic', label: 'Domestic', icon: '🏡' },
  { to: '/players', label: 'Players', icon: '🏃' },
  { to: '/tweets', label: 'Tweets', icon: '🐦' },
  { to: '/venues', label: 'Venues', icon: '🏟️' },
];

export default function Sidebar() {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" />
      )}

      <aside
        className={`fixed top-0 left-0 z-20 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">🏏</div>
            <div>
              <div className="font-rajdhani font-bold text-lg text-slate-900 dark:text-white leading-none">CricDash</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Live Cricket</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Admin Section */}
          {user?.role === 'admin' && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin</p>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`
                }
              >
                <span>⚙️</span>
                <span>Admin Panel</span>
              </NavLink>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Cricket Dashboard v1.0 © 2025
          </p>
        </div>
      </aside>
    </>
  );
}
