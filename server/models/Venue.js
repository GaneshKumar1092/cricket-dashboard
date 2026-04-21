// models/Venue.js - Stadium/Venue analytics schema
const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    capacity: { type: Number, default: 0 },
    imageUrl: { type: String, default: '' },

    // Pitch analytics
    pitchType: {
      type: String,
      enum: ['batting', 'bowling', 'balanced', 'spin-friendly', 'pace-friendly'],
      default: 'balanced',
    },
    paceSupport: { type: Number, min: 0, max: 10, default: 5 }, // 0-10 scale
    spinSupport: { type: Number, min: 0, max: 10, default: 5 },

    // Historical stats
    avgFirstInningsScore: { type: Number, default: 0 },
    avgSecondInningsScore: { type: Number, default: 0 },
    chasingSuccessRate: { type: Number, default: 0 }, // percentage
    highestScore: { type: Number, default: 0 },
    lowestDefended: { type: Number, default: 0 },
    tossWinBatFirstWinRate: { type: Number, default: 0 }, // percentage

    matchesPlayed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Venue', venueSchema);