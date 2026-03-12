import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatch, clearCurrentMatch, updateLiveMatch } from '../redux/slices/matchesSlice';
import Scorecard from '../components/matches/Scorecard';
import PitchReport from '../components/venues/PitchReport';
import { PageLoader, ErrorState } from '../components/common';
import { joinMatchRoom, leaveMatchRoom, initSocket } from '../services/socket';

export default function MatchDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentMatch: match, loading, error } = useSelector((state) => state.matches);

  useEffect(() => {
    dispatch(fetchMatch(id));

    // Join socket room for live updates
    joinMatchRoom(id);
    const socket = initSocket();
    if (socket) {
      socket.on('score_update', ({ matchId, data }) => {
        if (matchId === id) dispatch(updateLiveMatch({ matchId, data }));
      });
    }

    return () => {
      leaveMatchRoom(id);
      dispatch(clearCurrentMatch());
      const s = initSocket();
      if (s) s.off('score_update');
    };
  }, [id, dispatch]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => dispatch(fetchMatch(id))} />;
  if (!match) return null;

  const homeTeam = match.teams?.home || {};
  const awayTeam = match.teams?.away || {};

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link to="/" className="hover:text-green-600 dark:hover:text-green-400">Home</Link>
        <span>/</span>
        <Link to="/matches" className="hover:text-green-600 dark:hover:text-green-400">Matches</Link>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-300 truncate">{match.title}</span>
      </nav>

      {/* Match Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 rounded-3xl overflow-hidden shadow-xl mb-6">
        <div className="p-6 md:p-8">
          {/* League + Status */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs bg-white/10 text-white/80 px-2.5 py-1 rounded-full">{match.leagueName || 'Cricket Match'}</span>
            <span className="text-xs bg-white/10 text-white/80 px-2.5 py-1 rounded-full uppercase">{match.format}</span>
            {match.status === 'live' && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/20 px-2.5 py-1 rounded-full animate-pulse">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                LIVE
              </span>
            )}
            {match.status === 'completed' && (
              <span className="text-xs bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full font-medium">✅ Completed</span>
            )}
          </div>

          {/* Teams and Score */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
            {/* Home Team */}
            <div className="flex-1 text-center md:text-left flex flex-col md:flex-row items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-rajdhani font-bold text-2xl shadow-lg flex-shrink-0"
                style={{ backgroundColor: homeTeam.primaryColor || '#374151' }}
              >
                {match.teams?.homeName?.slice(0, 2) || 'HM'}
              </div>
              <div>
                <h2 className="text-white font-rajdhani font-bold text-2xl">{match.teams?.homeName}</h2>
                <p className="text-slate-400 text-sm">{homeTeam.country || ''}</p>
                {match.innings?.filter((i) => i.teamName === match.teams?.homeName).map((inn, idx) => (
                  <div key={idx} className="mt-1">
                    <span className="text-white font-rajdhani font-bold text-3xl">{inn.totalRuns}/{inn.totalWickets}</span>
                    <span className="text-slate-300 text-sm ml-2">({inn.totalOvers} ov)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* VS */}
            <div className="text-center px-6">
              <span className="text-slate-500 font-rajdhani text-xl">VS</span>
              {match.toss?.winnerName && (
                <p className="text-xs text-slate-400 mt-1">
                  🪙 {match.toss.winnerName} won toss & chose to {match.toss.decision}
                </p>
              )}
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center md:text-right flex flex-col md:flex-row-reverse items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-rajdhani font-bold text-2xl shadow-lg flex-shrink-0"
                style={{ backgroundColor: awayTeam.primaryColor || '#6b7280' }}
              >
                {match.teams?.awayName?.slice(0, 2) || 'AW'}
              </div>
              <div className="md:text-right">
                <h2 className="text-white font-rajdhani font-bold text-2xl">{match.teams?.awayName}</h2>
                <p className="text-slate-400 text-sm">{awayTeam.country || ''}</p>
                {match.innings?.filter((i) => i.teamName === match.teams?.awayName).map((inn, idx) => (
                  <div key={idx} className="mt-1">
                    <span className="text-white font-rajdhani font-bold text-3xl">{inn.totalRuns}/{inn.totalWickets}</span>
                    <span className="text-slate-300 text-sm ml-2">({inn.totalOvers} ov)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result / Live state */}
          {match.result?.description && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-center">
              <p className="text-green-300 font-semibold">{match.result.description}</p>
            </div>
          )}
          {match.status === 'live' && match.liveState && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
              <p className="text-red-300 text-sm">
                Over {match.liveState.currentOver}.{match.liveState.currentBall}
                {match.liveState.target && ` • Target: ${match.liveState.target}`}
                {match.liveState.requiredRunRate && ` • RRR: ${match.liveState.requiredRunRate}`}
                {match.liveState.currentRunRate && ` • CRR: ${match.liveState.currentRunRate}`}
              </p>
            </div>
          )}

          {/* Venue and Highlights */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {match.venueName && (
              <span className="text-xs text-slate-300 flex items-center gap-1">🏟️ {match.venueName}</span>
            )}
            {match.startDate && (
              <span className="text-xs text-slate-400">
                📅 {new Date(match.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
            {match.highlightLink && (
              <a
                href={match.highlightLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg"
              >
                ▶ Watch Highlights
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scorecard - takes 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-4">📋 Scorecard</h3>
            <Scorecard innings={match.innings} />
          </div>

          {/* Match Summary */}
          {match.matchSummary && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-3">📝 Match Summary</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{match.matchSummary}</p>
            </div>
          )}
        </div>

        {/* Sidebar - 1/3 */}
        <div className="space-y-6">
          {/* Venue & Pitch Report */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-4">
              🏟️ Venue & Pitch
            </h3>
            {match.venue && (
              <div className="mb-4">
                <Link
                  to={`/venues/${match.venue._id}`}
                  className="text-green-600 dark:text-green-400 hover:underline font-semibold text-sm"
                >
                  {match.venueName}
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {match.venue.city}, {match.venue.country}
                </p>
              </div>
            )}
            <PitchReport pitchReport={match.pitchReport} venue={match.venue} />
          </div>

          {/* Venue Stats */}
          {match.venue?.stats && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-4">📊 Venue Stats</h3>
              <div className="space-y-3">
                {[
                  { label: 'Avg 1st Innings', value: match.venue.stats.avgFirstInningsScore },
                  { label: 'Avg 2nd Innings', value: match.venue.stats.avgSecondInningsScore },
                  { label: 'Highest Total', value: match.venue.stats.highestTotal },
                  { label: 'Lowest Total', value: match.venue.stats.lowestTotal },
                ].map(({ label, value }) => value ? (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
                    <span className="font-rajdhani font-bold text-slate-900 dark:text-white">{value}</span>
                  </div>
                ) : null)}

                {/* Win pct bar */}
                {match.venue.stats.battingFirstWinPct > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Bat First {match.venue.stats.battingFirstWinPct}%</span>
                      <span>Chase {match.venue.stats.chasingWinPct}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                      <div className="bg-green-500 h-full transition-all duration-700" style={{ width: `${match.venue.stats.battingFirstWinPct}%` }}></div>
                      <div className="bg-blue-500 h-full flex-1"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-green-500">● Bat First</span>
                      <span className="text-blue-500">● Chase ●</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Head to Head */}
          {match.headToHead && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-4">⚔️ Head to Head</h3>
              <div className="text-center mb-4">
                <span className="text-3xl font-rajdhani font-bold text-slate-900 dark:text-white">
                  {match.headToHead.totalMatches}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Matches</p>
              </div>
              <div className="flex justify-around">
                <div className="text-center">
                  <span className="text-2xl font-rajdhani font-bold text-green-600 dark:text-green-400">{match.headToHead.homeWins}</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{match.teams?.homeName?.split(' ').slice(-1)[0]}</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-rajdhani font-bold text-slate-400">{match.headToHead.draws}</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Draws</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-rajdhani font-bold text-blue-600 dark:text-blue-400">{match.headToHead.awayWins}</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{match.teams?.awayName?.split(' ').slice(-1)[0]}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
