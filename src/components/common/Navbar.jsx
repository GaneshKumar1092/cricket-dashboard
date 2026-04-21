// components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location  = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: '/',         label: '🏠 Home'    },
    { path: '/matches',  label: '🏏 Matches'  },
    { path: '/players',  label: '👤 Players'  },
    { path: '/venues',   label: '🏟️ Venues'   },
    { path: '/search',   label: '🔍 Search'   },
    { path: '/social',   label: '📱 Social'   },
    { path: '/predictor',label: '🎯 Predictor'},
  ];

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          🏏 <span style={styles.logoText}>CricDash</span>
        </Link>

        {/* Desktop Links */}
        <div style={styles.desktopLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.link,
                ...(isActive(link.path) ? styles.activeLink : {}),
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Live indicator */}
        <div style={styles.liveIndicator}>
          <span style={styles.liveDot} />
          <span style={{ color: '#ff4757', fontWeight: 700, fontSize: '0.85rem' }}>
            LIVE
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    background: 'rgba(10, 15, 30, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 200, 150, 0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1.5rem',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    fontSize: '1.4rem',
  },
  logoText: {
    background: 'linear-gradient(135deg, #00c896, #00e5ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 800,
    letterSpacing: '-0.5px',
  },
  desktopLinks: {
    display: 'flex',
    gap: '0.25rem',
    '@media (max-width: 768px)': { display: 'none' },
  },
  link: {
    color: '#8899aa',
    textDecoration: 'none',
    padding: '0.4rem 0.75rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  activeLink: {
    color: '#00c896',
    background: 'rgba(0, 200, 150, 0.1)',
    fontWeight: 600,
  },
  liveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'rgba(255, 71, 87, 0.1)',
    border: '1px solid rgba(255, 71, 87, 0.3)',
    padding: '0.3rem 0.75rem',
    borderRadius: '20px',
  },
  liveDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#ff4757',
    display: 'inline-block',
    animation: 'pulse 1.5s infinite',
  },
  hamburger: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.4rem',
    cursor: 'pointer',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    background: '#0a0f1e',
    borderTop: '1px solid rgba(0,200,150,0.1)',
    padding: '1rem',
    gap: '0.5rem',
  },
  mobileLink: {
    color: '#ccc',
    textDecoration: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
  },
};

export default Navbar;