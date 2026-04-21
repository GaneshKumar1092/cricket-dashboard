// components/venue/VenueStatCard.jsx
// Single stat display card for venue analytics
import React from 'react';

const VenueStatCard = ({ icon, label, value, subValue, color = '#00c896' }) => (
  <div style={styles.card}>
    <div style={{ ...styles.iconBox, background: `${color}18`, color }}>
      {icon}
    </div>
    <div style={styles.content}>
      <div style={styles.label}>{label}</div>
      <div style={{ ...styles.value, color }}>{value}</div>
      {subValue && <div style={styles.sub}>{subValue}</div>}
    </div>
  </div>
);

const styles = {
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '1.1rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'border-color 0.2s',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    flexShrink: 0,
  },
  content: { flex: 1 },
  label: {
    color: '#8899aa',
    fontSize: '0.72rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '0.2rem',
  },
  value: {
    fontSize: '1.4rem',
    fontWeight: 800,
    lineHeight: 1.1,
  },
  sub: {
    color: '#8899aa',
    fontSize: '0.72rem',
    marginTop: '0.2rem',
  },
};

export default VenueStatCard;