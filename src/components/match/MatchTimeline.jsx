// components/match/MatchTimeline.jsx
// Real-time event feed: wickets, boundaries, milestones
import React from 'react';

const EVENT_ICONS = {
  WICKET:   { icon: '🔴', color: '#ff4757', label: 'Wicket' },
  SIX:      { icon: '💥', color: '#00c896', label: 'Six'    },
  FOUR:     { icon: '🔵', color: '#00e5ff', label: 'Four'   },
  FIFTY:    { icon: '⭐', color: '#ffa502', label: 'Fifty'  },
  HUNDRED:  { icon: '🌟', color: '#ffd700', label: 'Century'},
  WIDE:     { icon: '〰️', color: '#ffa502', label: 'Wide'   },
  NORMAL:   { icon: '⚪', color: '#8899aa', label: 'Run'    },
};

const TimelineEvent = ({ event, isLatest }) => {
  const cfg = EVENT_ICONS[event.event] || EVENT_ICONS.NORMAL;

  return (
    <div style={{
      ...styles.eventRow,
      background: isLatest
        ? `rgba(${cfg.color === '#ff4757' ? '255,71,87' : '0,200,150'},0.08)`
        : 'transparent',
      borderLeft: `3px solid ${isLatest ? cfg.color : 'transparent'}`,
      animation: isLatest ? 'slideIn 0.4s ease' : 'none',
    }}>
      {/* Over badge */}
      <div style={styles.overBadge}>
        <span style={styles.overText}>
          {event.over}.{event.ball}
        </span>
      </div>

      {/* Icon */}
      <div style={{
        ...styles.iconCircle,
        background: `${cfg.color}22`,
        fontSize: '1.1rem',
      }}>
        {cfg.icon}
      </div>

      {/* Description */}
      <div style={styles.eventContent}>
        <span style={{ color: cfg.color, fontWeight: 700, fontSize: '0.8rem' }}>
          {cfg.label}
        </span>
        <p style={styles.eventDesc}>{event.description}</p>
      </div>

      {/* Timestamp */}
      <div style={styles.timestamp}>
        {event.timestamp
          ? new Date(event.timestamp).toLocaleTimeString([], {
              hour: '2-digit', minute: '2-digit',
            })
          : ''}
      </div>
    </div>
  );
};

const MatchTimeline = ({ timeline = [] }) => {
  // Show most recent events first
  const sorted = [...timeline].reverse();

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>📋 Match Timeline</h3>

      {sorted.length === 0 ? (
        <div style={styles.empty}>
          <span style={{ fontSize: '2rem' }}>🏏</span>
          <p style={{ color: '#8899aa', marginTop: '0.5rem' }}>
            Match events will appear here
          </p>
        </div>
      ) : (
        <div style={styles.eventList}>
          {sorted.map((event, i) => (
            <TimelineEvent key={i} event={event} isLatest={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '1.25rem 1.5rem',
    marginBottom: '1rem',
    maxHeight: '420px',
    overflowY: 'auto',
  },
  title: {
    color: '#8899aa',
    fontSize: '0.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '1rem',
    position: 'sticky',
    top: 0,
    background: 'rgba(10,15,30,0.95)',
    padding: '0.25rem 0',
  },
  eventList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  eventRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.6rem 0.75rem',
    borderRadius: '8px',
    transition: 'all 0.3s',
  },
  overBadge: {
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '6px',
    padding: '0.2rem 0.45rem',
    minWidth: '36px',
    textAlign: 'center',
  },
  overText: {
    color: '#8899aa',
    fontSize: '0.72rem',
    fontWeight: 700,
    fontFamily: 'monospace',
  },
  iconCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  eventContent: {
    flex: 1,
  },
  eventDesc: {
    color: '#ccc',
    fontSize: '0.82rem',
    marginTop: '0.1rem',
  },
  timestamp: {
    color: '#8899aa',
    fontSize: '0.7rem',
    whiteSpace: 'nowrap',
  },
  empty: {
    textAlign: 'center',
    padding: '2rem',
  },
};

export default MatchTimeline;