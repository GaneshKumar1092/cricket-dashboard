// components/common/StatusBadge.jsx
// Reusable badge for match/player status labels
import React from 'react';

const STATUS_STYLES = {
  live: {
    background: 'rgba(255, 71, 87, 0.15)',
    color: '#ff4757',
    border: '1px solid rgba(255, 71, 87, 0.4)',
    label: '🔴 LIVE',
  },
  upcoming: {
    background: 'rgba(255, 165, 2, 0.15)',
    color: '#ffa502',
    border: '1px solid rgba(255, 165, 2, 0.4)',
    label: '🕐 UPCOMING',
  },
  completed: {
    background: 'rgba(0, 200, 150, 0.15)',
    color: '#00c896',
    border: '1px solid rgba(0, 200, 150, 0.4)',
    label: '✅ COMPLETED',
  },
  // Player form labels
  'in form': {
    background: 'rgba(0, 200, 150, 0.15)',
    color: '#00c896',
    border: '1px solid rgba(0, 200, 150, 0.4)',
    label: '🔥 In Form',
  },
  'average form': {
    background: 'rgba(255, 165, 2, 0.15)',
    color: '#ffa502',
    border: '1px solid rgba(255, 165, 2, 0.4)',
    label: '📊 Average Form',
  },
  'out of form': {
    background: 'rgba(255, 71, 87, 0.15)',
    color: '#ff4757',
    border: '1px solid rgba(255, 71, 87, 0.4)',
    label: '📉 Out of Form',
  },
};

const StatusBadge = ({ status, customLabel, size = 'sm' }) => {
  const key = status?.toLowerCase();
  const config = STATUS_STYLES[key] || {
    background: 'rgba(136,153,170,0.15)',
    color: '#8899aa',
    border: '1px solid rgba(136,153,170,0.3)',
    label: status,
  };

  const fontSize = size === 'lg' ? '0.9rem' : '0.75rem';
  const padding  = size === 'lg' ? '0.4rem 1rem' : '0.25rem 0.65rem';

  return (
    <span
      style={{
        background: config.background,
        color: config.color,
        border: config.border,
        padding,
        borderRadius: '20px',
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.5px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {customLabel || config.label}
    </span>
  );
};

export default StatusBadge;