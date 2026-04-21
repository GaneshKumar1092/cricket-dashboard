// pages/VenuesPage.jsx — All venues list
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchVenues } from '../redux/slices/venuesSlice';
import Loader from '../components/common/Loader';

const PITCH_COLORS = {
  'batting':       '#00c896',
  'bowling':       '#ff4757',
  'balanced':      '#ffa502',
  'spin-friendly': '#a29bfe',
  'pace-friendly': '#00e5ff',
};

const VenueCard = ({ venue }) => {
  const pitchColor = PITCH_COLORS[venue.pitchType] || '#8899aa';
  return (
    <Link to={`/venue/${venue._id}`} style={{ textDecoration: 'none' }}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.cardHeader}>
          <div style={{ ...styles.pitchBadge, background: `${pitchColor}20`, color: pitchColor, borderColor: `${pitchColor}55` }}>
            {venue.pitchType}
          </div>
          <span style={styles.matchCount}>{venue.matchesPlayed} matches</span>
        </div>

        {/* Name */}
        <h3 style={styles.venueName}>{venue.name}</h3>
        <p style={styles.venueLocation}>📍 {venue.city}, {venue.country}</p>

        {/* Quick stats */}
        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <div style={styles.statVal}>{venue.avgFirstInningsScore}</div>
            <div style={styles.statLbl}>Avg 1st Inn.</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <div style={{ ...styles.statVal, color: '#00e5ff' }}>{venue.chasingSuccessRate}%</div>
            <div style={styles.statLbl}>Chase %</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <div style={{ ...styles.statVal, color: '#ffa502' }}>
              {venue.capacity?.toLocaleString()}
            </div>
            <div style={styles.statLbl}>Capacity</div>
          </div>
        </div>

        <div style={styles.viewLink}>View Full Analytics →</div>
      </div>
    </Link>
  );
};

// Fallback mock venues if DB is empty
const MOCK_VENUES = [
  {
    _id: 'mock1', name: 'Wankhede Stadium', city: 'Mumbai', country: 'India',
    capacity: 33000, pitchType: 'batting', avgFirstInningsScore: 168,
    chasingSuccessRate: 45, matchesPlayed: 48,
  },
  {
    _id: 'mock2', name: 'Eden Gardens', city: 'Kolkata', country: 'India',
    capacity: 66000, pitchType: 'balanced', avgFirstInningsScore: 162,
    chasingSuccessRate: 42, matchesPlayed: 52,
  },
  {
    _id: 'mock3', name: 'Chinnaswamy Stadium', city: 'Bengaluru', country: 'India',
    capacity: 40000, pitchType: 'batting', avgFirstInningsScore: 175,
    chasingSuccessRate: 52, matchesPlayed: 38,
  },
];

const VenuesPage = () => {
  const dispatch = useDispatch();
  const { list: venues, loading } = useSelector((s) => s.venues);
  const displayVenues = venues.length > 0 ? venues : MOCK_VENUES;

  useEffect(() => { dispatch(fetchVenues()); }, [dispatch]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>🏟️ Venue Intelligence</h1>
          <p style={styles.pageSubtitle}>
            Stadium analytics, pitch profiles & historical trends
          </p>
        </div>
        {loading && <Loader message="Loading venues..." />}
        {!loading && (
          <div style={styles.grid}>
            {displayVenues.map((v) => <VenueCard key={v._id} venue={v} />)}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#0a0f1e', paddingBottom: '3rem' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' },
  header: { marginBottom: '2rem' },
  pageTitle: { fontSize: '2rem', fontWeight: 800, color: '#fff' },
  pageSubtitle: { color: '#8899aa', marginTop: '0.3rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.25rem',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
    display: 'block',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  pitchBadge: {
    padding: '0.25rem 0.65rem',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'capitalize',
    border: '1px solid',
  },
  matchCount: { color: '#8899aa', fontSize: '0.75rem' },
  venueName: { color: '#fff', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem' },
  venueLocation: { color: '#8899aa', fontSize: '0.82rem', marginBottom: '1rem' },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '10px',
    padding: '0.75rem',
    marginBottom: '0.75rem',
  },
  stat: { textAlign: 'center' },
  statVal: { color: '#00c896', fontWeight: 800, fontSize: '1.1rem' },
  statLbl: { color: '#8899aa', fontSize: '0.65rem', marginTop: '0.2rem' },
  statDivider: { width: '1px', background: 'rgba(255,255,255,0.08)' },
  viewLink: { color: '#00c896', fontSize: '0.78rem', fontWeight: 600 },
};

export default VenuesPage;