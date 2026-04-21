// App.js - Main routing and layout
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages (we'll build these in future phases)
import HomePage from './pages/HomePage';

// Placeholder pages (to be built phase by phase)
const LiveMatchPage = () => <div style={{padding:'2rem',color:'white'}}>Live Match Page - Coming in Phase 3</div>;
const PlayerPage    = () => <div style={{padding:'2rem',color:'white'}}>Player Page - Coming in Phase 5</div>;
const VenuePage     = () => <div style={{padding:'2rem',color:'white'}}>Venue Page - Coming in Phase 4</div>;
const SearchPage    = () => <div style={{padding:'2rem',color:'white'}}>Smart Search - Coming in Phase 6</div>;
const SocialPage    = () => <div style={{padding:'2rem',color:'white'}}>Social Pulse - Coming in Phase 8</div>;
const PredictorPage = () => <div style={{padding:'2rem',color:'white'}}>Win Predictor - Coming in Phase 7</div>;

function App() {
  return (
    <Router>
      {/* Toast notifications - available globally */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/match/:id"     element={<LiveMatchPage />} />
        <Route path="/player/:id"    element={<PlayerPage />} />
        <Route path="/venue/:id"     element={<VenuePage />} />
        <Route path="/search"        element={<SearchPage />} />
        <Route path="/social"        element={<SocialPage />} />
        <Route path="/predictor"     element={<PredictorPage />} />
      </Routes>
    </Router>
  );
}

export default App;