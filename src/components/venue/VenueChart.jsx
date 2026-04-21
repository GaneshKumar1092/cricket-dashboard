// components/venue/VenueChart.jsx
// Bar chart comparing 1st vs 2nd innings avg scores
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const VenueChart = ({ avgFirst = 0, avgSecond = 0, highestScore = 0, lowestDefended = 0 }) => {
  const data = [
    { name: '1st Innings', score: avgFirst,      fill: '#00c896' },
    { name: '2nd Innings', score: avgSecond,     fill: '#00e5ff' },
    { name: 'Highest',     score: highestScore,  fill: '#ffa502' },
    { name: 'Lowest Def.', score: lowestDefended,fill: '#ff4757' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div style={{
          background: '#1a2332',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '8px',
          padding: '0.6rem 1rem',
        }}>
          <p style={{ color: '#8899aa', fontSize: '0.75rem', marginBottom: '0.3rem' }}>{label}</p>
          <p style={{ color: payload[0].fill, fontWeight: 800, fontSize: '1.1rem' }}>
            {payload[0].value} runs
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>📊 Historical Scoring Trends</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#8899aa', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#8899aa', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="score" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <rect key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Fix: Recharts Bar with per-cell color needs Cell
import { Cell } from 'recharts';

const VenueChartFixed = ({ avgFirst = 0, avgSecond = 0, highestScore = 0, lowestDefended = 0 }) => {
  const data = [
    { name: '1st Innings Avg', score: avgFirst      },
    { name: '2nd Innings Avg', score: avgSecond     },
    { name: 'Highest Score',   score: highestScore  },
    { name: 'Lowest Defended', score: lowestDefended},
  ];
  const COLORS = ['#00c896', '#00e5ff', '#ffa502', '#ff4757'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div style={{
          background: '#1a2332',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '8px',
          padding: '0.6rem 1rem',
        }}>
          <p style={{ color: '#8899aa', fontSize: '0.75rem', marginBottom: '0.3rem' }}>{label}</p>
          <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>
            {payload[0].value} runs
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>📊 Historical Scoring Trends</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="name" tick={{ fill: '#8899aa', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#8899aa', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="score" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
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
  },
  title: {
    color: '#8899aa',
    fontSize: '0.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '1rem',
  },
};

export default VenueChartFixed;