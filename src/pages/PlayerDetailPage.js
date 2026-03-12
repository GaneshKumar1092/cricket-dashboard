import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayer } from '../redux/slices/playersSlice';
import { PageLoader, ErrorState } from '../components/common';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function CareerStats({ player }) {
  const battingFormats = player.battingStats ? Object.entries(player.battingStats).filter(([, v]) => v?.runs > 0) : [];
  const bowlingFormats = player.bowlingStats ? Object.entries(player.bowlingStats).filter(([, v]) => v?.wickets > 0) : [];

  return (
    <div className="space-y-6">
      {battingFormats.length > 0 && (
        <div>
          <h4 className="font-rajdhani font-bold text-base text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wide">🏏 Batting</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  {['Format', 'M', 'Runs', 'Avg', 'SR', '100s', '50s', 'HS'].map((h) => (
                    <th key={h} className={`py-2 ${h === 'Format' ? 'text-left' : 'text-right'} text-slate-500 dark:text-slate-400 font-medium text-xs uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {battingFormats.map(([fmt, s]) => (
                  <tr key={fmt} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300 uppercase">{fmt}</td>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">{s.matches}</td>
                    <td className="py-2.5 text-right font-bold text-slate-900 dark:text-white">{s.runs?.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">{s.avg?.toFixed(1)}</td>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">{s.strikeRate?.toFixed(1)}</td>
                    <td className="py-2.5 text-right text-green-600 dark:text-green-400 font-bold">{s.hundreds}</td>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">{s.fifties}</td>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">{s.highScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {bowlingFormats.length > 0 && (
        <div>
          <h4 className="font-rajdhani font-bold text-base text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wide">⚡ Bowling</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  {['Format', 'M', 'Wkts', 'Avg', 'Econ', 'Best', '5W'].map((h) => (
                    <th key={h} className={`py-2 ${h === 'Format' ? 'text-left' : 'text-right'} text-slate-500 dark:text-slate-400 font-medium text-xs uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bowlingFormats.map(([fmt, s]) => (
                  <tr key={fmt} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300 uppercase">{fmt}</td>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">{s.matches}</td>
                    <td className="py-2.5 text-right font-bold text-slate-900 dark:text-white">{s.wickets}</td>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">{s.avg?.toFixed(1)}</td>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">{s.economy?.toFixed(2)}</td>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">{s.bestFigures}</td>
                    <td className="py-2.5 text-right text-green-600 dark:text-green-400 font-bold">{s.fiveWickets || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlayerDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPlayer: player, loading, error } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(fetchPlayer(id));
  }, [id, dispatch]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => dispatch(fetchPlayer(id))} />;
  if (!player) return null;

  const recentData = player.recentPerformance?.map((p, i) => ({
    match: `M${i + 1}`,
    runs: p.runs || 0,
    wickets: p.wickets || 0,
  })) || [];

  const roleColors = {
    batsman: 'from-green-600 to-emerald-700',
    bowler: 'from-blue-600 to-indigo-700',
    all_rounder: 'from-purple-600 to-violet-700',
    wicket_keeper_batsman: 'from-orange-600 to-amber-700',
    wicket_keeper: 'from-yellow-600 to-amber-700',
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link to="/" className="hover:text-green-600 dark:hover:text-green-400">Home</Link>
        <span>/</span>
        <Link to="/players" className="hover:text-green-600 dark:hover:text-green-400">Players</Link>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-300">{player.name}</span>
      </nav>

      {/* Profile Hero */}
      <div className={`bg-gradient-to-r ${roleColors[player.role] || 'from-slate-700 to-slate-800'} rounded-3xl p-8 text-white mb-6 relative overflow-hidden`}>
        <div className="absolute top-4 right-8 text-8xl opacity-10">🏏</div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-rajdhani font-bold text-3xl shadow-xl">
            {player.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h1 className="font-rajdhani font-bold text-4xl mb-1">{player.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-white/80">🌍 {player.country}</span>
              <span className="text-white/80">• {player.role?.replace(/_/g, ' ')}</span>
              {player.battingStyle && <span className="text-white/80">• {player.battingStyle === 'right_hand' ? 'Right-hand Bat' : 'Left-hand Bat'}</span>}
              {player.isCapped && <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">International</span>}
            </div>
            {player.bowlingStyle && player.bowlingStyle !== 'none' && (
              <p className="text-white/70 text-sm mt-1">{player.bowlingStyle?.replace(/_/g, ' ')}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Career Stats - takes 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-5">📊 Career Statistics</h3>
            <CareerStats player={player} />
          </div>

          {/* Recent performance graph */}
          {recentData.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-5">📈 Recent Performance (Last 5 Matches)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={recentData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="match" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip
                    contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#f1f5f9' }}
                  />
                  <Bar dataKey="runs" name="Runs" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  {recentData.some((d) => d.wickets > 0) && (
                    <Bar dataKey="wickets" name="Wickets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Quick highlights */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="font-rajdhani font-bold text-lg text-slate-900 dark:text-white mb-4">🏆 Highlights</h3>
            {player.battingStats?.odi?.runs > 0 && (
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">ODI Hundreds</span>
                <span className="font-bold text-green-600 dark:text-green-400">{player.battingStats.odi.hundreds}</span>
              </div>
            )}
            {player.battingStats?.test?.hundreds > 0 && (
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">Test Hundreds</span>
                <span className="font-bold text-green-600 dark:text-green-400">{player.battingStats.test.hundreds}</span>
              </div>
            )}
            {player.bowlingStats?.test?.fiveWickets > 0 && (
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">Test 5-wicket hauls</span>
                <span className="font-bold text-green-600 dark:text-green-400">{player.bowlingStats.test.fiveWickets}</span>
              </div>
            )}
            {player.team && (
              <div className="flex justify-between py-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">Team</span>
                <span className="font-medium text-slate-900 dark:text-white text-sm">{player.team.name || player.team.shortName}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {player.description && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{player.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
