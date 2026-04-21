// components/common/Loader.jsx
import React from 'react';

const Loader = ({ message = 'Loading...' }) => (
  <div style={styles.wrapper}>
    <div style={styles.spinner} />
    <p style={styles.text}>{message}</p>
  </div>
);

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    gap: '1rem',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid rgba(0, 200, 150, 0.2)',
    borderTop: '4px solid #00c896',
    borderRadius: '50%',
    animation: 'spin 0.9s linear infinite',
  },
  text: {
    color: '#8899aa',
    fontSize: '0.95rem',
  },
};

// Inject keyframe animations globally once
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes spin  { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
  @keyframes fadeIn { from { opacity:0; transform:translateY(10px);} to { opacity:1; transform:translateY(0);} }
  @keyframes slideIn { from { opacity:0; transform:translateX(-20px);} to { opacity:1; transform:translateX(0);} }
`;
if (!document.getElementById('cricdash-animations')) {
  styleTag.id = 'cricdash-animations';
  document.head.appendChild(styleTag);
}

export default Loader;