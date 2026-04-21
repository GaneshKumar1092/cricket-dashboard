// components/match/ScoreHeader.jsx
// Top section of live match: teams, scores, overs, run rate
import React from 'react';
import StatusBadge from '../common/StatusBadge';

const ScoreHeader = ({ match }) => {
  if (!match) return null;

  const { team1, team2, score, status, currentInnings,
          runRate, requiredRate, tossWinner, tossDecision, matchType } = match;

  const t1 = score?.team1 || { runs: 0, wickets: 0, overs: 0 };
  const t2 = score?.team2 || { runs: 0, wickets: 0, overs: 0 };

  // Determine which team is batting currently
  const battingTeam = currentInnings === 1 ? team1 : team2;

  return (
    <div style={styles.card}>
      {/* Match title + badges */}
      <div style={styles.topRow}>
        <div>
          <h1 style={styles.matchTitle}>{match.title}</h1>
          <p style={styles.matchMeta}>
            {matchType} • {tossWinner} won toss & chose to {tossDecision}
          </p>
        </div>
        <div style={styles.badges}>
          <StatusBadge status={status} size="lg" />
          <span style={styles.inningsBadge}>
            {currentInnings === 1 ? '1st Innings' : '2nd Innings'}
          </span>
        </div>
      </div>

      {/* Score display */}
      <div style={styles.scoreRow}>
        {/* Team 1 */}
        <div style={{
          ...styles.teamBlock,
          opacity: currentInnings === 2 ? 0.7 : 1,
        }}>
          <div style={styles.teamName}>{team1}</div>
          <div style={styles.score}>
            {t1.runs}/{t1.wickets}
          </div>
          <div style={styles.overs}>({t1.overs} ov)</div>
        </div>

        {/* VS divider */}
        <div style={styles.vsBlock}>
          <div style={styles.vsText}>VS</div>
          {status === 'live' && (
            <div style={styles.nowBatting}>
              {battingTeam} batting
            </div>
          )}
        </div>

        {/* Team 2 */}
        <div style={{
          ...styles.teamBlock,
          opacity: currentInnings === 1 ? 0.7 : 1,
        }}>
          <div style={styles.teamName}>{team2}</div>
          <div style={styles.score}>
            {t2.runs > 0 ? `${t2.runs}/${t2.wickets}` : 'Yet to bat'}
          </div>
          {t2.overs > 0 && (
            <div style={styles.overs}>({t2.overs} ov)</div>
          )}
        </div>
      </div>

      {/* Rate stats row */}
      {status === 'live' && (
        <div style={styles.rateRow}>
          <div style={styles.rateStat}>
            <span style={styles.rateLabel}>Run Rate</span>
            <span style={styles.rateValue}>{runRate?.toFixed(2) || '0.00'}</span>
          </div>
          {currentInnings === 2 && (
            <>
              <div style={styles.rateDivider} />
              <div style={styles.rateStat}>
                <span style={styles.rateLabel}>Required Rate</span>
                <span style={{
                  ...styles.rateValue,
                  color: requiredRate > 12 ? '#ff4757' : requiredRate > 9 ? '#ffa502' : '#00c896',
                }}>
                  {requiredRate?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div style={styles.rateDivider} />
              <div style={styles.rateStat}>
                <span style={styles.rateLabel}>Need</span>
                <span style={{ ...styles.rateValue, color: '#ffa502' }}>
                  {Math.max(0, t1.runs + 1 - t2.runs)} off{' '}
                  {Math.max(0, (20 - t2.overs) * 6)} balls
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Result banner */}
      {status === 'completed' && match.result && (
        <div style={styles.resultBanner}>
          🏆 {match.result}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: 'linear-gradient(135deg, rgba(0,200,150,0.08), rgba(0,229,255,0.05))',
    border: '1px solid rgba(0,200,150,0.2)',
    borderRadius: '16px',
    padding: '1.5rem 2rem',
    marginBottom: '1.5rem',
    animation: 'fadeIn 0.5s ease',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  matchTitle: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#fff',
    marginBottom: '0.25rem',
  },
  matchMeta: {
    color: '#8899aa',
    fontSize: '0.85rem',
  },
  badges: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  inningsBadge: {
    background: 'rgba(0,229,255,0.1)',
    color: '#00e5ff',
    border: '1px solid rgba(0,229,255,0.3)',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    marginBottom: '1.25rem',
    flexWrap: 'wrap',
  },
  teamBlock: {
    textAlign: 'center',
    flex: 1,
    minWidth: '120px',
    transition: 'opacity 0.3s',
  },
  teamName: {
    color: '#8899aa',
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '0.4rem',
  },
  score: {
    fontSize: '2.8rem',
    fontWeight: 900,
    color: '#fff',
    lineHeight: 1,
    marginBottom: '0.3rem',
  },
  overs: {
    color: '#8899aa',
    fontSize: '0.9rem',
  },
  vsBlock: {
    textAlign: 'center',
    padding: '0 1rem',
  },
  vsText: {
    color: '#00c896',
    fontWeight: 800,
    fontSize: '1.1rem',
    marginBottom: '0.3rem',
  },
  nowBatting: {
    color: '#ffa502',
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  rateRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '10px',
    padding: '0.75rem 1.5rem',
    flexWrap: 'wrap',
  },
  rateStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
  },
  rateLabel: {
    color: '#8899aa',
    fontSize: '0.72rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  rateValue: {
    color: '#00c896',
    fontSize: '1.25rem',
    fontWeight: 800,
  },
  rateDivider: {
    width: '1px',
    height: '32px',
    background: 'rgba(136,153,170,0.3)',
  },
  resultBanner: {
    marginTop: '1rem',
    background: 'rgba(0,200,150,0.1)',
    border: '1px solid rgba(0,200,150,0.3)',
    borderRadius: '10px',
    padding: '0.75rem 1.25rem',
    color: '#00c896',
    fontWeight: 700,
    textAlign: 'center',
    fontSize: '1.05rem',
  },
};

export default ScoreHeader;