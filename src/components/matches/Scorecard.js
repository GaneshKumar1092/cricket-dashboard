import React, { useState } from 'react';

function BattingTable({ batting }) {
  if (!batting || batting.length === 0) return <p className="text-slate-400 text-sm py-2">No batting data available.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">Batter</th>
            <th className="text-left py-2 px-2 text-slate-500 dark:text-slate-400 font-medium hidden md:table-cell">Dismissal</th>
            <th className="text-right py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">R</th>
            <th className="text-right py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">B</th>
            <th className="text-right py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">4s</th>
            <th className="text-right py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">6s</th>
            <th className="text-right py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">SR</th>
          </tr>
        </thead>
        <tbody>
          {batting.map((b, i) => (
            <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="py-2.5 px-2">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{b.playerName || b.player?.name}</span>
                  {b.dismissal?.includes('not out') && <span className="text-xs ml-1 text-green-500">*</span>}
                </div>
              </td>
              <td className="py-2.5 px-2 text-slate-500 dark:text-slate-400 text-xs hidden md:table-cell">{b.dismissal}</td>
              <td className="py-2.5 px-2 text-right font-bold text-slate-800 dark:text-slate-200">{b.runs}</td>
              <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{b.balls}</td>
              <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{b.fours}</td>
              <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{b.sixes}</td>
              <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{b.strikeRate?.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BowlingTable({ bowling }) {
  if (!bowling || bowling.length === 0) return <p className="text-slate-400 text-sm py-2">No bowling data available.</p>;
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">Bowler</th>
            <th className="text-right py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">O</th>
            <th className="text-right py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">M</th>
            <th className="text-right py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">R</th>
            <th className="text-right py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">W</th>
            <th className="text-right py-2 px-2 text-slate-500 dark:text-slate-400 font-medium">Econ</th>
          </tr>
        </thead>
        <tbody>
          {bowling.map((b, i) => (
            <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="py-2.5 px-2 font-semibold text-slate-800 dark:text-slate-200">{b.playerName || b.player?.name}</td>
              <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{b.overs}</td>
              <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{b.maidens}</td>
              <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{b.runs}</td>
              <td className="py-2.5 px-2 text-right font-bold text-green-600 dark:text-green-400">{b.wickets}</td>
              <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-300">{b.economy?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Scorecard({ innings }) {
  const [activeInnings, setActiveInnings] = useState(0);

  if (!innings || innings.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        <p className="text-lg">Scorecard not available yet</p>
      </div>
    );
  }

  const currentInn = innings[activeInnings];

  return (
    <div>
      {/* Innings tabs */}
      <div className="flex gap-1 mb-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
        {innings.map((inn, i) => (
          <button
            key={i}
            onClick={() => setActiveInnings(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeInnings === i
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {inn.teamName?.split(' ').map((w) => w[0]).join('').slice(0, 3) || `Inn ${i + 1}`} Inn {inn.inningsNumber}
          </button>
        ))}
      </div>

      {/* Innings summary */}
      {currentInn && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-rajdhani font-bold text-xl text-slate-800 dark:text-slate-100">{currentInn.teamName}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Innings {currentInn.inningsNumber}</p>
            </div>
            <div className="text-right">
              <span className="font-rajdhani font-bold text-3xl text-slate-900 dark:text-white">
                {currentInn.totalRuns}/{currentInn.totalWickets}
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400">({currentInn.totalOvers} overs)</p>
            </div>
          </div>

          {currentInn.extras && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Extras: {currentInn.extras.total || 0}
              {currentInn.extras.wides ? ` (w ${currentInn.extras.wides})` : ''}
              {currentInn.extras.noBalls ? ` (nb ${currentInn.extras.noBalls})` : ''}
              {currentInn.extras.byes ? ` (b ${currentInn.extras.byes})` : ''}
              {currentInn.extras.legByes ? ` (lb ${currentInn.extras.legByes})` : ''}
            </p>
          )}

          <div className="mb-2">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase text-xs tracking-wider">Batting</h4>
            <BattingTable batting={currentInn.batting} />
          </div>

          {currentInn.bowling?.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 mt-4 mb-2 uppercase text-xs tracking-wider">Bowling</h4>
              <BowlingTable bowling={currentInn.bowling} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
