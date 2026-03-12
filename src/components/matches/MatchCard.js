import React from 'react';
import { Link } from 'react-router-dom';

const statusConfig = {
  live: { label: 'LIVE', bg: 'bg-red-500', text: 'text-white', dot: true },
  upcoming: { label: 'UPCOMING', bg: 'bg-blue-500', text: 'text-white', dot: false },
  completed: { label: 'COMPLETED', bg: 'bg-slate-400', text: 'text-white', dot: false },
  abandoned: { label: 'ABANDONED', bg: 'bg-yellow-500', text: 'text-white', dot: false },
};

const categoryColors = {
  ipl: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
  bbl: 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300',
  psl: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  international: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  domestic: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
  cpl: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
};

function ScoreDisplay({ innings }) {
  if (!innings || innings.length === 0) return <span className="text-slate-400 text-sm">Yet to bat</span>;
  return (
    <div className="text-right">
      {innings.slice(0, 2).map((inn, i) => (
        <div key={i} className={`${i === 0 ? 'text-slate-700 dark:text-slate-200 font-semibold' : 'text-slate-500 dark:text-slate-400 text-sm'}`}>
          {inn.teamName?.slice(0, 3).toUpperCase()}: {inn.totalRuns}/{inn.totalWickets}
          <span className="text-xs ml-1 text-slate-400">({inn.totalOvers} ov)</span>
        </div>
      ))}
    </div>
  );
}

export default function MatchCard({ match }) {
  const status = statusConfig[match.status] || statusConfig.upcoming;
  const catColor = categoryColors[match.category] || 'bg-slate-100 dark:bg-slate-800 text-slate-500';

  const homeTeam = match.teams?.home || {};
  const awayTeam = match.teams?.away || {};

  return (
    <Link
      to={`/matches/${match._id}`}
      className="group block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-green-400 dark:hover:border-green-600 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Card Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catColor} uppercase flex-shrink-0`}>
            {match.category || match.format}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{match.leagueName || match.matchNumber}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {match.status === 'live' && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 animate-pulse">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              LIVE
            </span>
          )}
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
            {match.format?.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Teams & Scores */}
      <div className="px-4 py-3">
        {/* Home Team */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-rajdhani shadow-sm flex-shrink-0"
              style={{ backgroundColor: homeTeam.primaryColor || '#374151' }}
            >
              {match.teams?.homeName?.slice(0, 2) || 'HM'}
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
              {match.teams?.homeName || 'Home Team'}
            </span>
          </div>
          {match.innings?.length > 0 ? (
            <div className="text-right">
              {match.innings
                .filter((inn) => inn.teamName === match.teams?.homeName)
                .map((inn, i) => (
                  <span key={i} className="font-bold text-slate-800 dark:text-slate-200">
                    {inn.totalRuns}/{inn.totalWickets}
                    <span className="text-xs text-slate-400 font-normal ml-1">({inn.totalOvers})</span>
                  </span>
                ))}
            </div>
          ) : (
            <span className="text-sm text-slate-400">-</span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-rajdhani shadow-sm flex-shrink-0"
              style={{ backgroundColor: awayTeam.primaryColor || '#6b7280' }}
            >
              {match.teams?.awayName?.slice(0, 2) || 'AW'}
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
              {match.teams?.awayName || 'Away Team'}
            </span>
          </div>
          {match.innings?.length > 1 ? (
            <div className="text-right">
              {match.innings
                .filter((inn) => inn.teamName === match.teams?.awayName)
                .map((inn, i) => (
                  <span key={i} className="font-bold text-slate-800 dark:text-slate-200">
                    {inn.totalRuns}/{inn.totalWickets}
                    <span className="text-xs text-slate-400 font-normal ml-1">({inn.totalOvers})</span>
                  </span>
                ))}
            </div>
          ) : (
            <span className="text-sm text-slate-400">-</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        {/* Live state */}
        {match.status === 'live' && match.liveState && (
          <div className="mt-1 py-2 px-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
              Over {match.liveState.currentOver}.{match.liveState.currentBall} •
              {match.liveState.target && ` Need ${match.liveState.target - (match.innings?.[1]?.totalRuns || 0)} from ${Math.ceil((20 - match.liveState.currentOver) * 6 - match.liveState.currentBall)} balls`}
              {match.liveState.currentRunRate && ` • CRR: ${match.liveState.currentRunRate}`}
            </p>
          </div>
        )}

        {/* Result */}
        {match.status === 'completed' && match.result?.description && (
          <div className="mt-1 py-2 px-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="text-xs text-green-600 dark:text-green-400 font-medium truncate">{match.result.description}</p>
          </div>
        )}

        {/* Upcoming date */}
        {match.status === 'upcoming' && (
          <div className="mt-1 py-2 px-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              📅 {new Date(match.startDate).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        )}

        {/* Venue + Highlights */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 truncate">
            🏟️ {match.venueName || 'TBD'}
          </span>
          {match.highlightLink && (
            <span className="text-xs text-green-600 dark:text-green-400 font-medium group-hover:underline flex-shrink-0">
              ▶ Highlights
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
