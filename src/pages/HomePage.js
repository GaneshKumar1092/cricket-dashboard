import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLiveMatches, fetchMatches } from '../redux/slices/matchesSlice';
import { fetchTweets, fetchTrendingPlayers } from '../redux/slices/tweetsSlice';
import MatchCard from '../components/matches/MatchCard';
import TweetCard from '../components/tweets/TweetCard';
import { SkeletonCard, StatCard, SectionHeader } from '../components/common';
import { initSocket, getSocket } from '../services/socket';
import { updateLiveMatch } from '../redux/slices/matchesSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const { liveMatches, list: allMatches, liveLoading } = useSelector((state) => state.matches);
  const { list: tweets, trending, loading: tweetLoading } = useSelector((state) => state.tweets);

  const upcomingMatches = allMatches.filter((m) => m.status === 'upcoming');

  useEffect(() => {
    dispatch(fetchLiveMatches());
    dispatch(fetchMatches({ status: 'upcoming', limit: 4 }));
    dispatch(fetchTweets({ limit: 4 }));
    dispatch(fetchTrendingPlayers());

    // Listen for live score updates
    const socket = initSocket();
    if (socket) {
      socket.on('score_update', ({ matchId, data }) => {
        dispatch(updateLiveMatch({ matchId, data }));
      });
    }

    // Refresh live scores every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchLiveMatches());
    }, 60000);

    return () => {
      clearInterval(interval);
      const s = getSocket();
      if (s) s.off('score_update');
    };
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 dark:from-green-900 dark:via-green-800 dark:to-emerald-900 rounded-3xl overflow-hidden p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 text-8xl">🏏</div>
          <div className="absolute bottom-2 left-1/3 text-6xl">⚡</div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              LIVE NOW
            </span>
            <span className="text-green-200 text-sm">{liveMatches.length} match{liveMatches.length !== 1 ? 'es' : ''} in progress</span>
          </div>
          <h1 className="font-rajdhani font-bold text-4xl md:text-5xl mb-2">Cricket Dashboard</h1>
          <p className="text-green-200 text-lg">Live scores, stats & insights from IPL, BBL, PSL & International cricket</p>
          <div className="flex gap-3 mt-4">
            <Link to="/matches" className="px-5 py-2.5 bg-white text-green-800 rounded-xl font-semibold text-sm hover:bg-green-50 transition-colors shadow-lg">
              View All Matches
            </Link>
            <Link to="/matches?status=live" className="px-5 py-2.5 bg-green-600/40 border border-green-400/50 text-white rounded-xl font-semibold text-sm hover:bg-green-600/60 transition-colors">
              Live Scores
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Live Matches" value={liveMatches.length} icon="📺" color="red" sublabel="In progress now" />
        <StatCard label="Today's Matches" value={upcomingMatches.length} icon="📅" color="blue" sublabel="Upcoming today" />
        <StatCard label="Trending Players" value={trending.length} icon="⚡" color="orange" sublabel="This week" />
        <StatCard label="Latest Tweets" value={tweets.length} icon="🐦" color="purple" sublabel="Cricket buzz" />
      </div>

      {/* Live Matches */}
      <section>
        <SectionHeader
          title="🔴 Live Matches"
          subtitle="Real-time scores updated automatically"
          action={
            <Link to="/matches?status=live" className="text-sm text-green-600 dark:text-green-400 hover:underline font-medium">
              View all →
            </Link>
          }
        />
        {liveLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : liveMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {liveMatches.map((match) => <MatchCard key={match._id} match={match} />)}
          </div>
        ) : (
          <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="text-4xl mb-2">🏏</div>
            <p className="text-slate-500 dark:text-slate-400">No live matches right now</p>
            <Link to="/matches?status=upcoming" className="text-sm text-green-600 dark:text-green-400 hover:underline mt-1 block">
              See upcoming matches
            </Link>
          </div>
        )}
      </section>

      {/* Two-column: Upcoming Matches + Tweets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Matches */}
        <section>
          <SectionHeader
            title="📅 Upcoming Matches"
            action={
              <Link to="/matches?status=upcoming" className="text-sm text-green-600 dark:text-green-400 hover:underline font-medium">
                View all →
              </Link>
            }
          />
          <div className="space-y-3">
            {upcomingMatches.slice(0, 4).map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
            {upcomingMatches.length === 0 && (
              <div className="text-center py-8 text-slate-400">No upcoming matches scheduled</div>
            )}
          </div>
        </section>

        {/* Twitter Feed */}
        <section>
          <SectionHeader
            title="🐦 Cricket Buzz"
            subtitle="Player tweets & reactions"
            action={
              <Link to="/tweets" className="text-sm text-green-600 dark:text-green-400 hover:underline font-medium">
                View all →
              </Link>
            }
          />
          <div className="space-y-3">
            {tweetLoading ? (
              [1, 2].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 animate-pulse h-32"></div>
              ))
            ) : (
              tweets.slice(0, 4).map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)
            )}
          </div>

          {/* Trending Players */}
          {trending.length > 0 && (
            <div className="mt-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <h3 className="font-rajdhani font-bold text-base text-slate-900 dark:text-white mb-3">🔥 Trending Players</h3>
              <div className="flex flex-wrap gap-2">
                {trending.map((p) => (
                  <span key={p._id} className="text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-full font-medium">
                    {p.playerName} <span className="text-amber-500">({p.count})</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
