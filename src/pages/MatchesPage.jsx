// pages/MatchesPage.jsx - List of all matches with filter tabs
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMatches } from '../redux/slices/matchesSlice';
import Loader from '../components/common/Loader';
import StatusBadge from '../components/common/StatusBadge';

const MatchCard = ({ match }) => (
  <Link to={`/match/${match._id}`} style={{ textDecoration: 'none' }}>
    <div style={styles.card}>
      {/* Top row: type + status */}
      <div style={styles.cardTop}>
        <span style={styles.matchType}>{match.matchType}</span>
        <StatusBadge status={match.status} />
      </div>

      {/* Teams and scores */}
      <div style={styles.teamsRow}>
        <div style={styles.team}>
          <div style={styles.teamName}>{match.team1}</div>
          {match.score?.team1?.runs !== undefined && (
            <div style={styles.teamScore}>
              {match.score.team1.runs}/{match.score.team1.wickets}
              <span style={styles.teamOvers}> ({match.score.team1.overs})</span>
            </div>
          )}
        </div>

        <div style={styles.vsTag}>VS</div>

        <div style={{ ...styles.team, textAlign: 'right' }}>
          <div style={styles.teamName}>{match.team2}</div>
          {match.score?.team2?.runs > 0 && (
            <div style={styles.teamScore}>
              {match.score.team2.runs}/{match.score.team2.wickets}
              <span style={styles.teamOvers}> ({match.score.team2.overs})</span>
            </div>
          )}
        </div>
      </div>

      {/* Result or date */}
      <div style={styles.cardBottom}>
        {match.result
          ? <span style={{ color: '#00c896' }}>🏆 {match.result}</span>
          : <span style={{ color: '#8899aa' }}>
              📅 {new Date(match.date).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </span>
        }
        <span style={styles.viewLink}>View Details →</span>
      </div>
    </div>
  </Link>
);

const MatchesPage = () => {
  const dispatch = useDispatch();
  const { list: matches, loading, error } = useSelector((s) => s.matches);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    dispatch(fetchMatches(activeTab === 'all' ? undefined : activeTab));
  }, [dispatch, activeTab]);

  const tabs = ['all', 'live', 'upcoming', 'completed'];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>🏏 Matches</h1>
          <p style={styles.pageSubtitle}>Live scores, upcoming fixtures & results</p>
        </div>

        {/* Filter tabs */}
        <div style={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.activeTab : {}),
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'live' && '🔴 '}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* States */}
        {loading && <Loader message="Fetching matches..." />}
        {error   && (
          <div style={styles.error}>
            ⚠️ {error} — Make sure your backend is running on port 5000
          </div>
        )}

        {/* Match grid */}
        {!loading && !error && (
          <>
            {matches.length === 0 ? (
              <div style={styles.empty}>
                <span style={{ fontSize: '3rem' }}>🏏</span>
                <p style={{ color: '#8899aa', marginTop: '1rem' }}>
                  No matches found. Run the seed script to add sample data.
                </p>
                <code style={styles.seedHint}>cd server && node utils/seedData.js</code>
              </div>
            ) : (
              <div style={styles.grid}>
                {matches.map((match) => (
                  <MatchCard key={match._id} match={match} />
                ))}
              </div>
            )}
          </>
        )}
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  header: {
    marginBottom: '2rem',
  },
  pageTitle: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#fff',
  },
  pageSubtitle: {
    color: '#8899aa',
    marginTop: '0.3rem',
  },
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  tab: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#8899aa',
    padding: '0.5rem 1.25rem',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 600,
    transition: 'all 0.2s',
    textTransform: 'capitalize',
  },
  activeTab: {
    background: 'rgba(0,200,150,0.15)',
    border: '1px solid rgba(0,200,150,0.4)',
    color: '#00c896',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '1.25rem',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.25s',
    display: 'block',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  matchType: {
    color: '#8899aa',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  teamsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    gap: '0.5rem',
  },
  team: {
    flex: 1,
  },
  teamName: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '1rem',
    marginBottom: '0.25rem',
  },
  teamScore: {
    color: '#00c896',
    fontWeight: 800,
    fontSize: '1.3rem',
  },
  teamOvers: {
    color: '#8899aa',
    fontWeight: 400,
    fontSize: '0.8rem',
  },
  vsTag: {
    color: '#8899aa',
    fontWeight: 700,
    fontSize: '0.8rem',
    padding: '0 0.75rem',
  },
  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.82rem',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '0.75rem',
  },
  viewLink: {
    color: '#00c896',
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  error: {
    background: 'rgba(255,71,87,0.1)',
    border: '1px solid rgba(255,71,87,0.3)',
    color: '#ff4757',
    padding: '1.25rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  seedHint: {
    display: 'inline-block',
    marginTop: '1rem',
    background: 'rgba(0,0,0,0.4)',
    color: '#00c896',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontFamily: 'monospace',
  },
};

export default MatchesPage;