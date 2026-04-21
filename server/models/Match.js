// models/Match.js - Match data schema
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },         // e.g. "IND vs AUS"
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    matchType: {
      type: String,
      enum: ['T20', 'ODI', 'Test', 'T10'],
      default: 'T20',
    },
    status: {
      type: String,
      enum: ['upcoming', 'live', 'completed'],
      default: 'upcoming',
    },
    venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
    date: { type: Date, required: true },

    // Live score data
    score: {
      team1: { runs: Number, wickets: Number, overs: Number },
      team2: { runs: Number, wickets: Number, overs: Number },
    },

    // Current match state (for live matches)
    currentInnings: { type: Number, default: 1 },
    currentBatsmen: [{ name: String, runs: Number, balls: Number }],
    currentBowler: { name: String, overs: Number, wickets: Number, runs: Number },
    lastSixBalls: [{ type: String }], // e.g. ["1","4","W","0","6","2"]
    runRate: { type: Number, default: 0 },
    requiredRate: { type: Number, default: 0 },

    result: { type: String, default: '' }, // e.g. "India won by 5 wickets"
    tossWinner: String,
    tossDecision: { type: String, enum: ['bat', 'field'] },

    // Timeline events for match feed
    timeline: [
      {
        over: Number,
        ball: Number,
        event: String, // "WICKET", "FOUR", "SIX", "NORMAL"
        description: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Match', matchSchema);