// components/match/WinProbabilityBar.jsx
// Simple rule-based win probability display
import React from 'react';

const WinProbabilityBar = ({ match }) => {
  if (!match || match.status !== 'live') return null;

  const { score, team1, team2, currentInnings } = match;
  const t1 = score?.team1 || { runs: 0, wickets: 0, overs: 0 };
  const t2 = score?.team2 || { runs: 0, wickets: 0, overs: 0 };

  // Simple rule-based probability for 2nd innings
  let team1WinPct = 50;

  if (currentInnings === 2) {
    const target      = t1.runs + 1;
    const runsNeeded  = target - t2.runs;
    const ballsLeft   = Math.max(0, (20 - t2.overs) * 6);
    const wicketsLeft = 10 - t2.wickets;

    // If easily chasing
    if (runsNeeded <= 0) {
      team1WinPct = 5;
    } else if (ballsLeft === 0) {
      team1WinPct = 95;
    } else {
      const requiredRate = (runsNeeded / ballsLeft) * 6;
      // Higher required rate = more likely batting first team wins
      const pressureFactor = Math.min(requiredRate / 18, 1);
      const wicketFactor   = 1 - (wicketsLeft / 10) * 0.4;
      team1WinPct = Math.round(50 + pressureFactor * 35 + wicketFactor * 15);
      team1WinPct = Math.max(5, Math.min(95, team1WinPct));
    }
  }

  const team2WinPct = 100 - team1WinPct;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🎯 Win Probability</h3>

      <div style={styles.teamRow}>
        <span style={styles.teamLabel}>{team1}</span>
        <span style={styles.teamLabel}>{team2}</span>
      </div>

      {/* Probability bar */}
      <div style={styles.bar}>
        <div style={{
          ...styles.fill1,
          width: `${team1WinPct}%`,
        }} />
        <div style={{
          ...styles.fill2,
          width: `${team2WinPct}%`,
        }} />
      </div>

      <div style={styles.pctRow}>
        <span style={{ color: '#00c896', fontWeight: 800, fontSize: '1.1rem' }}>
          {team1WinPct}%
        </span>
        <span style={{ color: '#8899aa', fontSize: '0.75rem' }}>Win Probability</span>
        <span style={{ color: '#00e5ff', fontWeight: 800, fontSize: '1.1rem' }}>
          {team2WinPct}%
        </span>
      </div>

      <p style={styles.note}>
        * Rule-based estimate using wickets, overs & run rate
      </p>
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
  teamRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  teamLabel: {
    color: '#ccc',
    fontSize: '0.85rem',
    fontWeight: 700,
  },
  bar: {
    height: '14px',
    borderRadius: '7px',
    overflow: 'hidden',
    display: 'flex',
    marginBottom: '0.5rem',
    background: 'rgba(0,0,0,0.3)',
  },
  fill1: {
    background: 'linear-gradient(90deg, #00c896, #00e5ff)',
    transition: 'width 1s ease',
    borderRadius: '7px 0 0 7px',
  },
  fill2: {
    background: 'linear-gradient(90deg, #6c5ce7, #a29bfe)',
    transition: 'width 1s ease',
    borderRadius: '0 7px 7px 0',
  },
  pctRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.4rem',
  },
  note: {
    color: '#8899aa',
    fontSize: '0.68rem',
    marginTop: '0.75rem',
    fontStyle: 'italic',
    textAlign: 'center',
  },
};

export default WinProbabilityBar;