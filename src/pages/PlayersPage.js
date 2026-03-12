import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlayers } from '../redux/slices/playersSlice';
import { PageLoader, EmptyState, FilterGroup } from '../components/common';

const roleOptions = [
  { value: 'batsman', label: '🏏 Batsman' },
  { value: 'bowler', label: '⚡ Bowler' },
  { value: 'all_rounder', label: '🌟 All Rounder' },
  { value: 'wicket_keeper_batsman', label: '🧤 WK Batsman' },
];

function PlayerCard({ player }) {
  const roleEmoji = {
    batsman: '🏏', bowler: '⚡', all_rounder: '🌟', wicket_keeper: '🧤', wicket_keeper_batsman: '🧤',
  };
  return (
    <Link
      to={`/players/${player._id}`}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-green-400 dark:hover:border-green-600 p-5 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-rajdhani font-bold text-lg flex-shrink-0">
          {player.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
            {player.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{player.country}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
          {roleEmoji[player.role]} {player.role?.replace(/_/g, ' ')}
        </span>
        {player.battingStyle && (
          <span className="text-xs text-slate-400 dark:text-slate-500">{player.battingStyle === 'right_hand' ? 'RHB' : 'LHB'}</span>
        )}
        {player.isCapped && (
          <span className="text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">Intl</span>
        )}
      </div>
      {/* Quick stats */}
      {player.battingStats?.t20?.runs > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-4">
          <div className="text-center">
            <p className="text-sm font-rajdhani font-bold text-slate-900 dark:text-white">{player.battingStats.t20.runs}</p>
            <p className="text-xs text-slate-400">T20 Runs</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-rajdhani font-bold text-slate-900 dark:text-white">{player.battingStats.t20.avg?.toFixed(1)}</p>
            <p className="text-xs text-slate-400">Avg</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-rajdhani font-bold text-slate-900 dark:text-white">{player.battingStats.t20.strikeRate?.toFixed(1)}</p>
            <p className="text-xs text-slate-400">SR</p>
          </div>
        </div>
      )}
    </Link>
  );
}

export default function PlayersPage() {
  const dispatch = useDispatch();
  const { list: players, loading, total } = useSelector((state) => state.players);
  const [role, setRole] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchPlayers({ role: role || undefined, search: search || undefined, limit: 24 }));
  }, [dispatch, role, search]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-rajdhani font-bold text-3xl text-slate-900 dark:text-white">🏃 Players</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{total} players in database</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-6 space-y-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
        />
        <FilterGroup label="Role" options={roleOptions} value={role} onChange={setRole} />
      </div>

      {loading ? (
        <PageLoader />
      ) : players.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {players.map((player) => <PlayerCard key={player._id} player={player} />)}
        </div>
      ) : (
        <EmptyState message="No players found" icon="🏏" />
      )}
    </div>
  );
}
