// components/match/BallTracker.jsx
// Last 6 balls visual — color coded by event type
import React from 'react';

// Determine ball color and label based on event code
const getBallStyle = (ball) => {
  const b = String(ball).toUpperCase();
  if (b === 'W')  return { bg: '#ff4757', color: '#fff',   label: 'W' };
  if (b === '6')  return { bg: '#00c896', color: '#000',   label: '6' };
  if (b === '4')  return { bg: '#00e5ff', color: '#000',   label: '4' };
  if (b === '0')  return { bg: 'rgba(136,153,170,0.2)', color: '#8899aa', label: '0' };
  if (b === 'WD') return { bg: '#ffa502', color: '#000',   label: 'Wd' };
  if (b === 'NB') return { bg: '#ffa502', color: '#000',   label: 'Nb' };
  return { bg: 'rgba(255,255,255,0.1)', color: '#fff', label: b };
};

const BallTracker = ({ balls = [] }) => {
  // Always show 6 slots — fill empty ones with dots
  const display = [...balls].slice(-6);
  while (display.length < 6) display.unshift(null);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Last 6 Balls</h3>
      <div style={styles.ballRow}>
        {display.map((ball, i) => {
          if (ball === null) {
            return (
              <div key={i} style={styles.emptyBall}>
                <span style={{ color: '#333', fontSize: '1.2rem' }}>·</span>
              </div>
            );
          }
          const { bg, color, label } = getBallStyle(ball);
          return (
            <div
              key={i}
              style={{
                ...styles.ball,
                background: bg,
                color,
                // Animate the last ball (most recent)
                animation: i === display.length - 1 ? 'fadeIn 0.4s ease' : 'none',
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        {[
          { bg: '#00c896', label: '6' },
          { bg: '#00e5ff', label: '4' },
          { bg: '#ff4757', label: 'W' },
          { bg: '#ffa502', label: 'Wd/Nb' },
          { bg: 'rgba(136,153,170,0.2)', label: 'Dot' },
        ].map((item) => (
          <div key={item.label} style={styles.legendItem}>
            <div style={{ ...styles.legendDot, background: item.bg }} />
            <span style={styles.legendLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '1.25rem 1.5rem',
    marginBottom: '1rem',
  },
  title: {
    color: '#8899aa',
    fontSize: '0.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '1rem',
  },
  ballRow: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  ball: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
    transition: 'transform 0.2s',
    cursor: 'default',
  },
  emptyBall: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '2px dashed rgba(136,153,170,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
  legendDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  legendLabel: {
    color: '#8899aa',
    fontSize: '0.72rem',
  },
};

export default BallTracker;