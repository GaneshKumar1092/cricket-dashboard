import React from 'react';

const pitchTypeConfig = {
  batting_friendly: { label: 'Batting Friendly', color: 'green', emoji: '🏏' },
  spin_friendly: { label: 'Spin Friendly', color: 'yellow', emoji: '🌀' },
  pace_friendly: { label: 'Pace Friendly', color: 'blue', emoji: '⚡' },
  balanced: { label: 'Balanced', color: 'slate', emoji: '⚖️' },
  seam_friendly: { label: 'Seam Friendly', color: 'orange', emoji: '🎯' },
};

function RatingBar({ label, value, color = 'green' }) {
  const colorClasses = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    orange: 'bg-orange-500',
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{value}/10</span>
      </div>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colorClasses[color]}`}
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function PitchReport({ pitchReport, venue }) {
  const config = pitchTypeConfig[venue?.pitchType || 'balanced'];

  return (
    <div className="space-y-4">
      {/* Pitch type badge */}
      {venue?.pitchType && (
        <div className="flex items-center gap-2">
          <span className="text-2xl">{config.emoji}</span>
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{config.label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{venue?.pitchDescription || 'No description available'}</p>
          </div>
        </div>
      )}

      {/* Conditions */}
      {pitchReport?.condition && (
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider font-medium">Conditions</p>
          <p className="text-sm text-slate-700 dark:text-slate-300">{pitchReport.condition}</p>
          {pitchReport.forecast && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">🌤️ {pitchReport.forecast}</p>
          )}
        </div>
      )}

      {/* Pitch ratings */}
      {pitchReport && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Pitch Characteristics</p>
          {pitchReport.pace > 0 && <RatingBar label="Pace" value={pitchReport.pace} color="blue" />}
          {pitchReport.spin > 0 && <RatingBar label="Spin" value={pitchReport.spin} color="yellow" />}
          {pitchReport.bounce > 0 && <RatingBar label="Bounce" value={pitchReport.bounce} color="orange" />}
        </div>
      )}

      {/* Expected score */}
      {(pitchReport?.expectedAvgScore || venue?.stats?.avgFirstInningsScore) && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <p className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wider font-medium mb-1">Expected 1st Innings Score</p>
          <p className="text-2xl font-rajdhani font-bold text-green-700 dark:text-green-300">
            {pitchReport?.expectedAvgScore || venue?.stats?.avgFirstInningsScore}
          </p>
        </div>
      )}
    </div>
  );
}
