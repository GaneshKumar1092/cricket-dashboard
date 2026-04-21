// models/Tweet.js - Social pulse posts schema
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorHandle: { type: String, default: '' },
    authorAvatar: { type: String, default: '' },

    // Sentiment analysis result
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative'],
      default: 'neutral',
    },

    // Tags for filtering
    tags: [{ type: String }],         // e.g. ["Kohli", "IND", "WorldCup"]
    relatedPlayer: { type: String, default: '' },
    relatedTeam: { type: String, default: '' },
    relatedMatch: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },

    likes: { type: Number, default: 0 },
    retweets: { type: Number, default: 0 },
    isTrending: { type: Boolean, default: false },
    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tweet', tweetSchema);