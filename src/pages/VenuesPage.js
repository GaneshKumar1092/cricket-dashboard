import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchVenues } from '../redux/slices/venuesSlice';
import { PageLoader, EmptyState } from '../components/common';

const pitchTypeConfig = {
  batting_friendly: { label: 'Batting Friendly', color: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300', emoji: '🏏' },
  spin_friendly: { label: 'Spin Friendly', color: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300', emoji: '🌀' },
  pace_friendly: { label: 'Pace Friendly', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300', emoji: '⚡' },
  balanced: { label: 'Balanced', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400', emoji: '⚖️' },
  seam_friendly: { label: 'Seam Friendly', color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300', emoji: '🎯' },
};

function VenueCard({ venue }) {
  const ptConfig = pitchTypeConfig[venue.pitchType] || pitchTypeConfig.balanced;
  return (
    <Link
      to={`/venues/${venue._id}`}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-green-400 dark:hover:border-green-600 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-5 relative overflow-hidden">
        <div className="absolute top-2 right-3 text-4xl opacity-20">🏟️</div>
        <h3 className="font-rajdhani font-bold text-white text-xl relative z-10">{venue.name}</h3>
        <p className="text-slate-300 text-sm relative z-10">📍 {venue.city}, {venue.country}</p>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-3">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ptConfig.color}`}>
          {ptConfig.emoji} {ptConfig.label}
        </span>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5">
            <p className="text-lg font-rajdhani font-bold text-slate-900 dark:text-white">{venue.stats?.avgFirstInningsScore || '-'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Avg 1st Innings</p>
          </div>
          <div className="text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5">
            <p className="text-lg font-rajdhani font-bold text-slate-900 dark:text-white">{venue.stats?.highestTotal || '-'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Highest Total</p>
          </div>
        </div>

        {/* Win pct bar */}
        {venue.stats?.battingFirstWinPct > 0 && (
          <div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Bat 1st: {venue.stats.battingFirstWinPct}%</span>
              <span>Chase: {venue.stats.chasingWinPct}%</span>
            </div>
            <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div className="bg-green-500 h-full" style={{ width: `${venue.stats.battingFirstWinPct}%` }}></div>
              <div className="bg-blue-500 h-full flex-1"></div>
            </div>
          </div>
        )}

        <p className="text-xs text-slate-400 dark:text-slate-500">
          🏏 {venue.stats?.totalMatchesPlayed || 0} matches played
        </p>
      </div>
    </Link>
  );
}

export default function VenuesPage() {
  const dispatch = useDispatch();
  const { list: venues, loading } = useSelector((state) => state.venues);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  if (loading) return <PageLoader />;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-rajdhani font-bold text-3xl text-slate-900 dark:text-white">🏟️ Venues</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Pitch reports, venue stats & match history</p>
      </div>

      {venues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {venues.map((venue) => <VenueCard key={venue._id} venue={venue} />)}
        </div>
      ) : (
        <EmptyState message="No venues available" icon="🏟️" />
      )}
    </div>
  );
}
