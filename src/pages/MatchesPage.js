import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchMatches, setFilters } from '../redux/slices/matchesSlice';
import MatchCard from '../components/matches/MatchCard';
import { SkeletonCard, FilterGroup, EmptyState } from '../components/common';

const statusOptions = [
  { value: 'live', label: '🔴 Live' },
  { value: 'upcoming', label: '📅 Upcoming' },
  { value: 'completed', label: '✅ Completed' },
];

const categoryOptions = [
  { value: 'ipl', label: '🏆 IPL' },
  { value: 'bbl', label: '🦘 BBL' },
  { value: 'psl', label: '🌙 PSL' },
  { value: 'international', label: '🌍 International' },
  { value: 'domestic', label: '🏡 Domestic' },
  { value: 'cpl', label: '🏝️ CPL' },
];

const formatOptions = [
  { value: 'test', label: 'Test' },
  { value: 'odi', label: 'ODI' },
  { value: 't20', label: 'T20' },
];

export default function MatchesPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { list, loading, totalPages, currentPage, total } = useSelector((state) => state.matches);
  const [localFilters, setLocalFilters] = useState({
    status: searchParams.get('status') || '',
    category: searchParams.get('category') || '',
    format: '',
    search: searchParams.get('search') || '',
    page: 1,
  });

  const fetchData = useCallback(() => {
    const params = {};
    Object.entries(localFilters).forEach(([k, v]) => { if (v) params[k] = v; });
    dispatch(fetchMatches(params));
  }, [dispatch, localFilters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilter = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setLocalFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-rajdhani font-bold text-3xl text-slate-900 dark:text-white">Cricket Matches</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {total > 0 ? `${total} match${total !== 1 ? 'es' : ''} found` : 'Browse live, upcoming & completed matches'}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search matches, teams..."
            value={localFilters.search}
            onChange={(e) => handleFilter('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
          />
        </div>
        <FilterGroup label="Status" options={statusOptions} value={localFilters.status} onChange={(v) => handleFilter('status', v)} />
        <FilterGroup label="League / Category" options={categoryOptions} value={localFilters.category} onChange={(v) => handleFilter('category', v)} />
        <FilterGroup label="Format" options={formatOptions} value={localFilters.format} onChange={(v) => handleFilter('format', v)} />

        {/* Clear filters */}
        {(localFilters.status || localFilters.category || localFilters.format || localFilters.search) && (
          <button
            onClick={() => setLocalFilters({ status: '', category: '', format: '', search: '', page: 1 })}
            className="text-xs text-red-500 hover:text-red-600 font-medium"
          >
            ✕ Clear all filters
          </button>
        )}
      </div>

      {/* Matches Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : list.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {list.map((match) => <MatchCard key={match._id} match={match} />)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                ← Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                    p === currentPage
                      ? 'bg-green-600 text-white'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState message="No matches found. Try adjusting your filters." icon="🏏" />
      )}
    </div>
  );
}
