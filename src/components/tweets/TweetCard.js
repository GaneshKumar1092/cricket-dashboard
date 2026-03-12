import React from 'react';

function timeAgo(dateString) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function formatNumber(n) {
  if (!n) return '0';
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export default function TweetCard({ tweet }) {
  return (
    <a
      href={tweet.tweetLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-lg transition-all duration-300"
    >
      {/* Author header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar - initials based */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold font-rajdhani text-sm flex-shrink-0">
            {tweet.authorName?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-900 dark:text-white text-sm">{tweet.authorName}</span>
              {tweet.isVerified && (
                <svg className="w-4 h-4 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.26 3.91.8c.66 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.33-2.19c1.4.46 2.91.2 3.92-.81s1.26-2.52.8-3.91C21.37 14.67 22.25 13.43 22.25 12zm-6.43-2L10.35 15.5l-2.85-2.85.7-.7 2.15 2.14 5.07-5.07.7.71z" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <span>{tweet.authorHandle}</span>
              <span>·</span>
              <span>{timeAgo(tweet.createdAt)}</span>
            </div>
          </div>
        </div>
        {/* Twitter X icon */}
        <svg className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Tweet content */}
      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{tweet.tweetContent}</p>

      {/* Mentioned player chip */}
      {tweet.mentionedPlayerName && (
        <div className="mt-3 inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2.5 py-1 rounded-full">
          🏏 {tweet.mentionedPlayerName}
        </div>
      )}

      {/* Engagement metrics */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {formatNumber(tweet.likes)}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          {formatNumber(tweet.retweets)}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {formatNumber(tweet.replies)}
        </div>
        <span className="ml-auto text-xs text-sky-500 group-hover:underline">View tweet →</span>
      </div>
    </a>
  );
}
