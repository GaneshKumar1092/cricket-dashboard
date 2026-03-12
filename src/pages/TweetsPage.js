import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets, fetchTrendingPlayers } from '../redux/slices/tweetsSlice';
import TweetCard from '../components/tweets/TweetCard';
import { PageLoader, EmptyState } from '../components/common';

export default function TweetsPage() {
  const dispatch = useDispatch();
  const { list: tweets, trending, loading } = useSelector((state) => state.tweets);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchTweets({ limit: 30 }));
    dispatch(fetchTrendingPlayers());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchTweets({ search, limit: 30 }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-rajdhani font-bold text-3xl text-slate-900 dark:text-white">🐦 Cricket Tweets</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Player reactions, praise, and cricket buzz from legends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main tweets feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search tweets, players..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
            <button type="submit" className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors">
              Search
            </button>
            {search && (
              <button type="button" onClick={() => { setSearch(''); dispatch(fetchTweets({ limit: 30 })); }} className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                ✕
              </button>
            )}
          </form>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 animate-pulse h-36"></div>
              ))}
            </div>
          ) : tweets.length > 0 ? (
            <div className="space-y-3">
              {tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)}
            </div>
          ) : (
            <EmptyState message="No tweets found" icon="🐦" />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Players */}
          {trending.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="font-rajdhani font-bold text-lg text-slate-900 dark:text-white mb-4">🔥 Trending This Week</h3>
              <div className="space-y-2">
                {trending.map((player, i) => (
                  <div key={player._id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 w-5">#{i + 1}</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{player.playerName}</span>
                    </div>
                    <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-medium">
                      {player.count} tweets
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info box */}
          <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-2xl p-5">
            <h3 className="font-semibold text-sky-800 dark:text-sky-300 mb-2">ℹ️ About Tweets</h3>
            <p className="text-sm text-sky-700 dark:text-sky-400 leading-relaxed">
              Tweets from cricket legends, commentators, and fans are curated and linked to original sources.
              Click any tweet to view the original on X (Twitter).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
