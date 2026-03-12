import React from 'react';

// Skeleton loader for cards
export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-20"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-12"></div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full flex-1"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full flex-1"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
      </div>
      <div className="mt-3 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
    </div>
  );
}

// Loading spinner
export function Spinner({ size = 'md' }) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${sizeClasses[size]} border-2 border-slate-200 dark:border-slate-700 border-t-green-500 rounded-full animate-spin`}></div>
  );
}

// Page loading state
export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

// Error state
export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
      <div className="text-4xl mb-3">😕</div>
      <p className="text-slate-600 dark:text-slate-400 mb-4">{message || 'Something went wrong'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Empty state
export function EmptyState({ message, icon = '🏏' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-center px-4 py-8">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-slate-500 dark:text-slate-400">{message || 'No data found'}</p>
    </div>
  );
}

// Stats card
export function StatCard({ label, value, sublabel, icon, color = 'green' }) {
  const colorClasses = {
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-indigo-600',
    red: 'from-red-500 to-pink-600',
    orange: 'from-orange-500 to-amber-600',
    purple: 'from-purple-500 to-violet-600',
  };
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">{label}</p>
          <p className="text-2xl font-rajdhani font-bold mt-1 text-slate-900 dark:text-white">{value}</p>
          {sublabel && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sublabel}</p>}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white text-lg`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

// Filter button group
export function FilterGroup({ options, value, onChange, label }) {
  return (
    <div>
      {label && <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium mb-2">{label}</p>}
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value === value ? '' : opt.value)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              value === opt.value
                ? 'bg-green-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Section header
export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="font-rajdhani font-bold text-xl text-slate-900 dark:text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
