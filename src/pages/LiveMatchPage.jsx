// pages/LiveMatchPage.jsx - Complete live match detail page
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatchById } from '../redux/slices/matchesSlice';

// Components
import Loader           from '../components/common/Loader';
import ScoreHeader      from '../components/match/ScoreHeader';
import BallTracker      from '../components/match/BallTracker';
import CurrentPlayers   from '../components/match/CurrentPlayers';
import MatchTimeline    from '../components/match/MatchTimeline';
import MiniScorecard    from '../components/match/MiniScorecard';
import WinProbabilityBar from '../components/match/WinProbabilityBar';

// Custom Socket.IO hook for real-time updates
import useSocket from '../hooks/useSocket';

const LiveMatchPage = () => {
  const { id }     = useParams();
  const dispatch   = useDispatch();
  const navigate   = useNavigate();

  const { selected: match, loading, error } = useSelector((s) => s.matches);

  // Connect to Socket.IO room for this match
  // DSA Note: Socket events are handled via event-driven queue
  useSocket(id);

  useEffect(() => {
    dispatch(fetchMatchById(id));
  }, [dispatch, id]);

  if (loading) return (
    <div style={styles.page}>
      <Loader message="Loading match data..." />
    </div>
  );

  if (error || !match) return (
    <div style={styles.page}>
      <div style={styles.errorBox}>
        <h2 style={{ color: '#ff4757', marginBottom: '1rem' }}>
          ⚠️ Match Not Found
        </h2>
        <p style={{ color: '#8899aa', marginBottom: '1.5rem' }}>{error}</p>
        <button style={styles.backBtn} onClick={() => navigate('/matches')}>
          ← Back to Matches
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Back button */}
        <button style={styles.backBtn} onClick={() => navigate('/matches')}>
          ← All Matches
        </button>

        {/* ── Score Header (full width) ── */}
        <ScoreHeader match={match} />

        {/* ── Two-column layout ── */}
        <div style={styles.grid}>

          {/* Left column */}
          <div style={styles.leftCol}>
            <BallTracker balls={match.lastSixBalls || []} />
            <CurrentPlayers
              batsmen={match.currentBatsmen || []}
              bowler={match.currentBowler}
            />
            <WinProbabilityBar match={match} />
          </div>

          {/* Right column */}
          <div style={styles.rightCol}>
            <MiniScorecard />
            <MatchTimeline timeline={match.timeline || []} />
          </div>

        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0f1e',
    paddingBottom: '3rem',
  },
  container: {
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.25rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#8899aa',
    padding: '0.5rem 1.25rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    marginBottom: '1.25rem',
    fontWeight: 600,
    transition: 'all 0.2s',
  },
  errorBox: {
    maxWidth: '500px',
    margin: '4rem auto',
    textAlign: 'center',
    background: 'rgba(255,71,87,0.05)',
    border: '1px solid rgba(255,71,87,0.2)',
    borderRadius: '16px',
    padding: '2.5rem',
  },
};

export default LiveMatchPage;