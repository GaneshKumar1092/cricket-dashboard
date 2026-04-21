// controllers/tweetController.js
const Tweet = require('../models/Tweet');

// Simple keyword-based sentiment analysis
// DSA Note: This is a linear scan approach - O(n) where n = word count
const analyzeSentiment = (text) => {
  const positiveWords = ['great','brilliant','excellent','amazing','fantastic',
    'outstanding','superb','champion','hero','legend','best','won','win','century'];
  const negativeWords = ['terrible','horrible','worst','pathetic','fail','lost',
    'lose','poor','bad','useless','disappointing','dropped','out','duck'];

  const words = text.toLowerCase().split(/\s+/);
  let score = 0;

  words.forEach((word) => {
    if (positiveWords.includes(word)) score++;
    if (negativeWords.includes(word)) score--;
  });

  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
};

const getTweets = async (req, res) => {
  try {
    const { player, team, sentiment } = req.query;
    const filter = {};
    if (player) filter.relatedPlayer = { $regex: player, $options: 'i' };
    if (team) filter.relatedTeam = { $regex: team, $options: 'i' };
    if (sentiment) filter.sentiment = sentiment;
    const tweets = await Tweet.find(filter).sort({ postedAt: -1 }).limit(50);
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTweet = async (req, res) => {
  try {
    // Auto-analyze sentiment before saving
    const sentiment = analyzeSentiment(req.body.content);
    const tweet = await Tweet.create({ ...req.body, sentiment });
    res.status(201).json(tweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTweets, createTweet };