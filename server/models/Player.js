// models/Player.js - Player data schema
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    role: {
      type: String,
      enum: ['batsman', 'bowler', 'all-rounder', 'wicket-keeper'],
      required: true,
    },
    battingStyle: { type: String, enum: ['right-handed', 'left-handed'] },
    bowlingStyle: { type: String, default: '' },
    imageUrl: { type: String, default: '' },

    // Career batting stats
    battingStats: {
      matches: { type: Number, default: 0 },
      innings: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
      strikeRate: { type: Number, default: 0 },
      hundreds: { type: Number, default: 0 },
      fifties: { type: Number, default: 0 },
      highScore: { type: Number, default: 0 },
    },

    // Career bowling stats
    bowlingStats: {
      matches: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
      economy: { type: Number, default: 0 },
      bestFigures: { type: String, default: '' },
    },

    // Recent form: last 5 match scores
    recentForm: [
      {
        matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
        runs: Number,
        balls: Number,
        wickets: Number,
        date: Date,
        opponent: String,
      },
    ],
    team: { type: String, default: '' },
    isCaptain: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);