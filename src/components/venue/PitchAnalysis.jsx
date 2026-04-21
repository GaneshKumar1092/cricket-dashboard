// components/venue/PitchAnalysis.jsx
// Visual pitch type + pace vs spin support meter
import React from 'react';

const PITCH_CONFIG = {
  'batting':       { color: '#00c896', icon: '🏏', desc: 'High-scoring ground. Batsmen dominate.' },
  'bowling':       { color: '#ff4757', icon: '⚾', desc: 'Bowlers have significant advantage here.' },
  'balanced':      { color: '#ffa502', icon: '⚖️', desc: 'Fair contest between bat and ball.' },
  'spin-friendly': { color: '#a29bfe', icon: '🌀', desc: 'Spinners extract sharp turn and bounce.' },
  'pace-friendly': { color: '#00e5ff', icon: '💨', desc: 'Pace bowlers get movement off the pitch.' },
};

const MeterBar = ({ label, value, color }) => (
  <div style={styles.meterRow}>
    <div style={styles.meterLabel}>{label}</div>
    <div style={styles.meterTrack}>
      <div style={{
        ...styles.meterFill,
        width: `${(value / 10) * 100}%`,
        background: color,
      }} />
    </div>
    <div style={{ ...styles.meterValue, color }}>{value}/10</div>
  </div>
);

const PitchAnalysis = ({ pitchType = 'balanced', paceSupport = 5, spinSupport = 5 }) => {
  const cfg = PITCH_CONFIG[pitchType] || PITCH_CONFIG['balanced'];

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🏟️ Pitch Analysis</h3>

      {/* Pitch type banner */}
      <div style={{ ...styles.pitchBanner, borderColor: `${cfg.color}55`, background: `${cfg.color}12` }}>
        <span style={styles.pitchIcon}>{cfg.icon}</span>
        <div>
          <div style={{ color: cfg.color, fontWeight: 800, fontSize: '1.05rem', textTransform: 'capitalize' }}>
            {pitchType} Pitch
          </div>
          <div style={styles.pitchDesc}>{cfg.desc}</div>
        </div>
      </div>

      {/* Pace vs Spin meters */}
      <div style={styles.meters}>
        <MeterBar label="Pace Support" value={paceSupport} color="#00e5ff" />
        <MeterBar label="Spin Support" value={spinSupport} color="#a29bfe" />
      </div>

      {/* Quick verdict */}
      <div style={styles.verdict}>
        {paceSupport > spinSupport
          ? '💨 Pace bowlers will be effective here'
          : paceSupport < spinSupport
          ? '🌀 Spin is the key weapon at this venue'
          : '⚖️ Both pace and spin will play a role'}
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
  pitchBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid',
    marginBottom: '1.25rem',
  },
  pitchIcon: { fontSize: '2rem' },
  pitchDesc: { color: '#8899aa', fontSize: '0.82rem', marginTop: '0.2rem' },
  meters: { display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1rem' },
  meterRow: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  meterLabel: { color: '#ccc', fontSize: '0.82rem', fontWeight: 600, width: '100px', flexShrink: 0 },
  meterTrack: {
    flex: 1,
    height: '8px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 1s ease',
  },
  meterValue: { fontSize: '0.82rem', fontWeight: 700, width: '36px', textAlign: 'right' },
  verdict: {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '8px',
    padding: '0.6rem 1rem',
    color: '#ccc',
    fontSize: '0.82rem',
    fontStyle: 'italic',
  },
};

export default PitchAnalysis;