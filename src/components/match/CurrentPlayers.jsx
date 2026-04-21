// components/match/CurrentPlayers.jsx
// Shows current batsmen at crease + current bowler
import React from 'react';

const StatPill = ({ label, value, highlight }) => (
  <div style={styles.pill}>
    <span style={styles.pillLabel}>{label}</span>
    <span style={{
      ...styles.pillValue,
      color: highlight || '#fff',
    }}>{value}</span>
  </div>
);

const CurrentPlayers = ({ batsmen = [], bowler = null }) => {
  // Calculate strike rate for each batsman
  const withSR = batsmen.map((b) => ({
    ...b,
    sr: b.balls > 0 ? ((b.runs / b.balls) * 100).toFixed(1) : '0.0',
  }));

  return (
    <div style={styles.wrapper}>
      {/* Batsmen */}
      <div style={styles.card}>
        <h3 style={styles.title}>🏏 At The Crease</h3>
        <div style={styles.playerList}>
          {withSR.length === 0 && (
            <p style={{ color: '#8899aa', fontSize: '0.9rem' }}>No data available</p>
          )}
          {withSR.map((b, i) => (
            <div key={i} style={styles.playerRow}>
              <div style={styles.playerLeft}>
                <div style={styles.avatarCircle}>
                  {b.name?.charAt(0) || '?'}
                </div>
                <div>
                  <div style={styles.playerName}>{b.name}</div>
                  <div style={styles.playerSub}>Batsman</div>
                </div>
              </div>
              <div style={styles.playerStats}>
                <StatPill label="Runs" value={b.runs} highlight="#00c896" />
                <StatPill label="Balls" value={b.balls} />
                <StatPill
                  label="SR"
                  value={b.sr}
                  highlight={
                    parseFloat(b.sr) > 150 ? '#00c896' :
                    parseFloat(b.sr) > 100 ? '#ffa502' : '#ff4757'
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bowler */}
      {bowler && (
        <div style={styles.card}>
          <h3 style={styles.title}>⚾ Current Bowler</h3>
          <div style={styles.playerRow}>
            <div style={styles.playerLeft}>
              <div style={{ ...styles.avatarCircle, background: 'rgba(255,71,87,0.2)', color: '#ff4757' }}>
                {bowler.name?.charAt(0) || '?'}
              </div>
              <div>
                <div style={styles.playerName}>{bowler.name}</div>
                <div style={styles.playerSub}>Bowler</div>
              </div>
            </div>
            <div style={styles.playerStats}>
              <StatPill label="Overs"   value={bowler.overs}   />
              <StatPill label="Wickets" value={bowler.wickets} highlight="#ff4757" />
              <StatPill label="Runs"    value={bowler.runs}    />
              <StatPill
                label="Econ"
                value={
                  bowler.overs > 0
                    ? (bowler.runs / bowler.overs).toFixed(1)
                    : '0.0'
                }
                highlight={
                  bowler.overs > 0 && (bowler.runs / bowler.overs) < 8
                    ? '#00c896' : '#ffa502'
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '1.25rem 1.5rem',
  },
  title: {
    color: '#8899aa',
    fontSize: '0.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '1rem',
  },
  playerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  playerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  playerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  avatarCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(0,200,150,0.15)',
    color: '#00c896',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '1.1rem',
    flexShrink: 0,
  },
  playerName: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.95rem',
  },
  playerSub: {
    color: '#8899aa',
    fontSize: '0.75rem',
  },
  playerStats: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  pill: {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px',
    padding: '0.35rem 0.6rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '48px',
  },
  pillLabel: {
    color: '#8899aa',
    fontSize: '0.65rem',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  pillValue: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 800,
  },
};

export default CurrentPlayers;