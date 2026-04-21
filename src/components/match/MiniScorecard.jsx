// components/match/MiniScorecard.jsx
// Innings summary table
import React, { useState } from 'react';

// Sample innings data structure — will come from backend in real matches
const SAMPLE_SCORECARD = {
  batting: [
    { name: 'Rohit Sharma',   runs: 56, balls: 35, fours: 6, sixes: 3, dismissal: 'b Mitchell Starc'        },
    { name: 'Shubman Gill',   runs: 31, balls: 28, fours: 3, sixes: 1, dismissal: 'c Maxwell b Hazlewood'   },
    { name: 'Virat Kohli',    runs: 82, balls: 53, fours: 7, sixes: 4, dismissal: 'not out'                 },
    { name: 'KL Rahul',       runs: 17, balls: 14, fours: 2, sixes: 0, dismissal: 'run out'                 },
  ],
  bowling: [
    { name: 'Mitchell Starc',  overs: 4, wickets: 2, runs: 32, economy: 8.0  },
    { name: 'Josh Hazlewood',  overs: 4, wickets: 1, runs: 28, economy: 7.0  },
    { name: 'Pat Cummins',     overs: 4, wickets: 1, runs: 38, economy: 9.5  },
    { name: 'Adam Zampa',      overs: 4, wickets: 1, runs: 42, economy: 10.5 },
  ],
};

const MiniScorecard = ({ scorecard = SAMPLE_SCORECARD }) => {
  const [tab, setTab] = useState('batting');

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>📊 Mini Scorecard</h3>

      {/* Tab switcher */}
      <div style={styles.tabs}>
        {['batting', 'bowling'].map((t) => (
          <button
            key={t}
            style={{
              ...styles.tab,
              ...(tab === t ? styles.activeTab : {}),
            }}
            onClick={() => setTab(t)}
          >
            {t === 'batting' ? '🏏 Batting' : '⚾ Bowling'}
          </button>
        ))}
      </div>

      {/* Batting table */}
      {tab === 'batting' && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Batsman</th>
                <th style={styles.thNum}>R</th>
                <th style={styles.thNum}>B</th>
                <th style={styles.thNum}>4s</th>
                <th style={styles.thNum}>6s</th>
                <th style={styles.thNum}>SR</th>
              </tr>
            </thead>
            <tbody>
              {scorecard.batting.map((b, i) => (
                <tr key={i} style={styles.row}>
                  <td style={styles.td}>
                    <div style={styles.playerName}>{b.name}</div>
                    <div style={styles.dismissal}>{b.dismissal}</div>
                  </td>
                  <td style={{ ...styles.tdNum, color: b.runs >= 50 ? '#00c896' : '#fff', fontWeight: 800 }}>
                    {b.runs}
                  </td>
                  <td style={styles.tdNum}>{b.balls}</td>
                  <td style={styles.tdNum}>{b.fours}</td>
                  <td style={{ ...styles.tdNum, color: b.sixes > 0 ? '#00c896' : '#fff' }}>
                    {b.sixes}
                  </td>
                  <td style={{
                    ...styles.tdNum,
                    color: (b.runs / b.balls * 100) > 150 ? '#00c896'
                         : (b.runs / b.balls * 100) > 100 ? '#ffa502' : '#ff4757',
                    fontWeight: 700,
                  }}>
                    {b.balls > 0 ? ((b.runs / b.balls) * 100).toFixed(0) : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bowling table */}
      {tab === 'bowling' && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Bowler</th>
                <th style={styles.thNum}>O</th>
                <th style={styles.thNum}>R</th>
                <th style={styles.thNum}>W</th>
                <th style={styles.thNum}>Econ</th>
              </tr>
            </thead>
            <tbody>
              {scorecard.bowling.map((b, i) => (
                <tr key={i} style={styles.row}>
                  <td style={styles.td}>
                    <div style={styles.playerName}>{b.name}</div>
                  </td>
                  <td style={styles.tdNum}>{b.overs}</td>
                  <td style={styles.tdNum}>{b.runs}</td>
                  <td style={{ ...styles.tdNum, color: b.wickets > 0 ? '#ff4757' : '#fff', fontWeight: 800 }}>
                    {b.wickets}
                  </td>
                  <td style={{
                    ...styles.tdNum,
                    color: b.economy < 8 ? '#00c896' : b.economy < 10 ? '#ffa502' : '#ff4757',
                    fontWeight: 700,
                  }}>
                    {b.economy.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  tab: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#8899aa',
    padding: '0.4rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    transition: 'all 0.2s',
  },
  activeTab: {
    background: 'rgba(0,200,150,0.15)',
    border: '1px solid rgba(0,200,150,0.4)',
    color: '#00c896',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.875rem',
  },
  th: {
    color: '#8899aa',
    fontWeight: 600,
    padding: '0.5rem 0.75rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  thNum: {
    color: '#8899aa',
    fontWeight: 600,
    padding: '0.5rem 0.75rem',
    textAlign: 'center',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  row: {
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    transition: 'background 0.2s',
  },
  td: {
    padding: '0.65rem 0.75rem',
    color: '#fff',
  },
  tdNum: {
    padding: '0.65rem 0.75rem',
    textAlign: 'center',
    color: '#fff',
  },
  playerName: {
    fontWeight: 600,
    fontSize: '0.875rem',
  },
  dismissal: {
    color: '#8899aa',
    fontSize: '0.72rem',
    marginTop: '0.1rem',
  },
};

export default MiniScorecard;