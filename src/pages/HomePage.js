// pages/HomePage.jsx - Landing page placeholder
import React from 'react';

const HomePage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
        🏏 CricDash
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>
        Real-Time Cricket Analytics & Match Intelligence Platform
      </p>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '1.5rem 2.5rem',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.2)',
      }}>
        <p>✅ Phase 2 Complete — Backend + Structure Ready</p>
        <p>🔜 Phase 3 — Live Match Center coming next</p>
      </div>
    </div>
  );
};

export default HomePage;