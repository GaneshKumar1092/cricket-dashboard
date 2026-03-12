import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-8xl mb-6">🏏</div>
      <h1 className="font-rajdhani font-bold text-6xl text-slate-900 dark:text-white mb-2">404</h1>
      <p className="text-xl text-slate-500 dark:text-slate-400 mb-6">Page not found. The ball went into the crowd!</p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors shadow-lg"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
