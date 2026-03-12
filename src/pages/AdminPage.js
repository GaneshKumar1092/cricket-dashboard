import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminAPI, tweetsAPI, matchesAPI, venuesAPI } from '../services/api';
import { StatCard, PageLoader } from '../components/common';

export default function AdminPage() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  // Tweet form
  const [tweetForm, setTweetForm] = useState({
    authorName: '', authorHandle: '', tweetContent: '', tweetLink: '', mentionedPlayerName: '', isVerified: false,
  });

  // Redirect non-admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    adminAPI.getStats().then((res) => setStats(res.data.data)).catch(console.error);
  }, []);

  const handleTweetSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      await tweetsAPI.create(tweetForm);
      setMsg('Tweet added successfully!');
      setTweetForm({ authorName: '', authorHandle: '', tweetContent: '', tweetLink: '', mentionedPlayerName: '', isVerified: false });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add tweet');
    }
  };

  if (!user || user.role !== 'admin') return <PageLoader />;

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'tweets', label: '🐦 Add Tweet' },
    { id: 'highlights', label: '▶️ Highlights' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="font-rajdhani font-bold text-3xl text-slate-900 dark:text-white">⚙️ Admin Panel</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage cricket dashboard content</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats && (
            <>
              <StatCard label="Total Matches" value={stats.totalMatches} icon="🏏" color="green" />
              <StatCard label="Live Now" value={stats.liveMatches} icon="📺" color="red" />
              <StatCard label="Players" value={stats.totalPlayers} icon="🏃" color="blue" />
              <StatCard label="Tweets" value={stats.totalTweets} icon="🐦" color="purple" />
            </>
          )}
        </div>
      )}

      {/* Add Tweet */}
      {activeTab === 'tweets' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-2xl">
          <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-5">🐦 Add New Tweet</h3>

          {msg && <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 text-sm">{msg}</div>}
          {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">{error}</div>}

          <form onSubmit={handleTweetSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Author Name *</label>
                <input
                  required
                  type="text"
                  value={tweetForm.authorName}
                  onChange={(e) => setTweetForm({ ...tweetForm, authorName: e.target.value })}
                  placeholder="Sachin Tendulkar"
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Handle *</label>
                <input
                  required
                  type="text"
                  value={tweetForm.authorHandle}
                  onChange={(e) => setTweetForm({ ...tweetForm, authorHandle: e.target.value })}
                  placeholder="@sachin_rt"
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Tweet Content * (max 280 chars)</label>
              <textarea
                required
                maxLength={280}
                rows={3}
                value={tweetForm.tweetContent}
                onChange={(e) => setTweetForm({ ...tweetForm, tweetContent: e.target.value })}
                placeholder="What a knock by @imVkohli! Absolutely brilliant..."
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 resize-none"
              />
              <p className="text-xs text-slate-400 mt-1">{tweetForm.tweetContent.length}/280</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Tweet URL *</label>
              <input
                required
                type="url"
                value={tweetForm.tweetLink}
                onChange={(e) => setTweetForm({ ...tweetForm, tweetLink: e.target.value })}
                placeholder="https://twitter.com/sachin_rt/status/..."
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Mentioned Player</label>
              <input
                type="text"
                value={tweetForm.mentionedPlayerName}
                onChange={(e) => setTweetForm({ ...tweetForm, mentionedPlayerName: e.target.value })}
                placeholder="Virat Kohli"
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isVerified"
                checked={tweetForm.isVerified}
                onChange={(e) => setTweetForm({ ...tweetForm, isVerified: e.target.checked })}
                className="w-4 h-4 text-green-600 rounded"
              />
              <label htmlFor="isVerified" className="text-sm text-slate-600 dark:text-slate-400">Verified account (blue tick)</label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-sm transition-colors"
            >
              Add Tweet
            </button>
          </form>
        </div>
      )}

      {/* Highlights */}
      {activeTab === 'highlights' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-2xl">
          <h3 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white mb-5">▶️ Add Highlight Link</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            To add highlight links to matches, use the API endpoint:
          </p>
          <pre className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto">
{`PUT /api/admin/matches/:matchId/highlight
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "highlightLink": "https://youtube.com/watch?v=...",
  "thumbnailUrl": "https://img.youtube.com/..."
}`}
          </pre>
        </div>
      )}
    </div>
  );
}
