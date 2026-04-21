// App.js - Main routing with Navbar
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import Navbar from './components/common/Navbar';

// Pages — Phase 2 & 3 complete
import HomePage      from './pages/HomePage';
import MatchesPage   from './pages/MatchesPage';
import LiveMatchPage from './pages/LiveMatchPage';

// Placeholder pages — built in upcoming phases
const PlayerPage    = () => <ComingSoon page="Player Dashboard"  phase={5} />;
const VenuePage     = () => <ComingSoon page="Venue Intelligence" phase={4} />;
const SearchPage    = () => <ComingSoon page="Smart Search"       phase={6} />;
const SocialPage    = () => <ComingSoon page="Social Pulse"       phase={8} />;
const PredictorPage = () => <ComingSoon page="Win Predictor"      phase={7} />;

// Generic placeholder component
const ComingSoon = ({ page, phase }) => (
  <div style={{
    minHeight: '100vh',
    background: '#0a0f1e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem',
  }}>
    <span style={{ fontSize: '3rem' }}>🚧</span>
    <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>{page}</h2>
    <p style={{ color: '#8899aa' }}>Coming in Phase {phase}</p>
  </div>
);

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Navbar appears on all pages */}
      <Navbar />

      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/matches"    element={<MatchesPage />} />
        <Route path="/match/:id"  element={<LiveMatchPage />} />
        <Route path="/players"    element={<PlayerPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
        <Route path="/venues"     element={<VenuePage />} />
        <Route path="/venue/:id"  element={<VenuePage />} />
        <Route path="/search"     element={<SearchPage />} />
        <Route path="/social"     element={<SocialPage />} />
        <Route path="/predictor"  element={<PredictorPage />} />
      </Routes>
    </Router>
  );
}

export default App;