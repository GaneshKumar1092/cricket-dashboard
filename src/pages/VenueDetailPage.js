import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVenue } from '../redux/slices/venuesSlice';
import { PageLoader, ErrorState } from '../components/common';
import PitchReport from '../components/venues/PitchReport';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#22c55e', '#3b82f6'];

export default function VenueDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentVenue: venue, loading, error } = useSelector((state) => state.venues);

  useEffect(() => {
    dispatch(fetchVenue(id));
  }, [id, dispatch]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => dispatch(fetchVenue(id))} />;
  if (!venue) return null;

  const winData = [
    { name: 'Bat First Wins', value: venue.stats?.battingFirstWinPct || 50 },
    { name: 'Chase Wins', value: venue.stats?.chasingWinPct || 50 },
  ];

  const formatBarData = [
    { format: 'T20', avg: venue.formatStats?.t20?.avgFirstInnings || venue.stats?.avgFirstInningsScore || 0 },
    { format: 'ODI', avg: venue.formatStats?.odi?.avgFirstInnings || 0 },
    { format: 'Test', avg: venue.formatStats?.test?.avgFirstInnings || 0 },
  ].filter((d) => d.avg > 0);

  const avgScoreTrend = venue.stats?.avgScoreTrend || [];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link to="/" className="hover:text-green-600 dark:hover:text-green-400">Home</Link>
        <span>/</span>
        <Link to="/venues" className="hover:text-green-600 dark:hover:text-green-400">Venues</Link>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-300">{venue.name}</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-4 right-8 text-8xl opacity-10">🏟️</div>
        <div className="relative z-10">
          <h1 className="font-rajdhani font-bold text-4xl mb-1">{venue.name}</h1>
          <p className="text-slate-300 text-lg">📍 {venue.city}, {venue.country}</p>
          {venue.capacity && <p className="text-slate-400 text-sm mt-1">Capacity: {venue.capacity?.toLocaleString()}</p>}
          {venue.established && <p className="text-slate-400 text-sm">Est. {venue.established}</p>}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Avg 1st Innings', value: venue.stats?.avgFirstInningsScore, suffix: 'runs' },
          { label: 'Avg 2nd Innings', value: venue.stats?.avgSecondInningsScore, suffix: 'runs' },
          { label: 'Highest Total', value: venue.stats?.highestTotal, suffix: 'runs' },
          { label: 'Lowest Total', value: venue.stats?.lowestTotal, suffix: 'runs' },
        ].map(({ label, value, suffix }) => (
          <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
            <p className="text-2xl font-rajdhani font-bold text-slate-900 dark:text-white">{value || '-'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
            {value && <p className="text-xs text-slate-400 dark:text-slate-500">{suffix}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Win percentage Pie Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-4">📊 Win Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={winData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {winData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => `${val}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Bat First ({venue.stats?.battingFirstWinPct || 50}%)
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              Chase ({venue.stats?.chasingWinPct || 50}%)
            </div>
          </div>
        </div>

        {/* Average score by format */}
        {formatBarData.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-4">📈 Avg Score by Format</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={formatBarData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="format" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#f1f5f9' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Bar dataKey="avg" name="Avg Score" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pitch Report */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-4">🏏 Pitch Report</h3>
          <PitchReport venue={venue} />
        </div>

        {/* Matches count */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-4">🏟️ Venue Info</h3>
          {venue.description && <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{venue.description}</p>}
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400">Total Matches Played</span>
              <span className="font-rajdhani font-bold text-slate-900 dark:text-white">{venue.stats?.totalMatchesPlayed || 0}</span>
            </div>
            {venue.capacity && (
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">Capacity</span>
                <span className="font-rajdhani font-bold text-slate-900 dark:text-white">{venue.capacity?.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">Location</span>
              <span className="font-medium text-slate-900 dark:text-white">{venue.city}, {venue.country}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
