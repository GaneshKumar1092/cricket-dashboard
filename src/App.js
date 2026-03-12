import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MatchesPage from './pages/MatchesPage';
import MatchDetailPage from './pages/MatchDetailPage';
import TweetsPage from './pages/TweetsPage';
import VenuesPage from './pages/VenuesPage';
import VenueDetailPage from './pages/VenueDetailPage';
import PlayersPage from './pages/PlayersPage';
import PlayerDetailPage from './pages/PlayerDetailPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { darkMode } = useSelector((state) => state.ui);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-dm transition-colors duration-300">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="matches" element={<MatchesPage />} />
            <Route path="matches/:id" element={<MatchDetailPage />} />
            <Route path="tweets" element={<TweetsPage />} />
            <Route path="venues" element={<VenuesPage />} />
            <Route path="venues/:id" element={<VenueDetailPage />} />
            <Route path="players" element={<PlayersPage />} />
            <Route path="players/:id" element={<PlayerDetailPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
