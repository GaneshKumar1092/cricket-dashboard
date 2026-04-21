// utils/seedData.js - Populate DB with sample data for testing
// Run with: node utils/seedData.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Venue = require('../models/Venue');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Tweet = require('../models/Tweet');

const seed = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing. Check server/.env file.');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas...');

    await Venue.deleteMany();
    await Player.deleteMany();
    await Match.deleteMany();
    await Tweet.deleteMany();

    const venues = await Venue.insertMany([
      {
        name: 'Wankhede Stadium',
        city: 'Mumbai',
        country: 'India',
        capacity: 33000,
        pitchType: 'batting',
        avgFirstInningsScore: 168,
        avgSecondInningsScore: 155,
        chasingSuccessRate: 45,
        highestScore: 235,
        lowestDefended: 140,
        paceSupport: 6,
        spinSupport: 4,
        matchesPlayed: 48,
        tossWinBatFirstWinRate: 52,
      },
      {
        name: 'Eden Gardens',
        city: 'Kolkata',
        country: 'India',
        capacity: 66000,
        pitchType: 'balanced',
        avgFirstInningsScore: 162,
        avgSecondInningsScore: 148,
        chasingSuccessRate: 42,
        highestScore: 218,
        lowestDefended: 132,
        paceSupport: 5,
        spinSupport: 6,
        matchesPlayed: 52,
        tossWinBatFirstWinRate: 48,
      },
    ]);

    await Player.insertMany([
      {
        name: 'Virat Kohli',
        country: 'India',
        role: 'batsman',
        battingStyle: 'right-handed',
        team: 'India',
        battingStats: {
          matches: 115,
          innings: 111,
          runs: 3994,
          average: 52.73,
          strikeRate: 137.96,
          hundreds: 1,
          fifties: 37,
          highScore: 122,
        },
        recentForm: [
          {
            runs: 82,
            balls: 53,
            wickets: 0,
            opponent: 'Australia',
            date: new Date('2024-11-24'),
          },
          {
            runs: 11,
            balls: 12,
            wickets: 0,
            opponent: 'Australia',
            date: new Date('2024-11-28'),
          },
          {
            runs: 5,
            balls: 6,
            wickets: 0,
            opponent: 'Australia',
            date: new Date('2024-12-06'),
          },
          {
            runs: 100,
            balls: 118,
            wickets: 0,
            opponent: 'Australia',
            date: new Date('2024-12-26'),
          },
          {
            runs: 17,
            balls: 22,
            wickets: 0,
            opponent: 'Australia',
            date: new Date('2025-01-03'),
          },
        ],
      },
      {
        name: 'Jasprit Bumrah',
        country: 'India',
        role: 'bowler',
        battingStyle: 'right-handed',
        bowlingStyle: 'right-arm fast',
        team: 'India',
        bowlingStats: {
          matches: 90,
          wickets: 149,
          average: 21.3,
          economy: 7.4,
          bestFigures: '6/19',
        },
        recentForm: [
          {
            runs: 0,
            balls: 2,
            wickets: 3,
            opponent: 'Australia',
            date: new Date('2024-11-22'),
          },
          {
            runs: 0,
            balls: 1,
            wickets: 2,
            opponent: 'Australia',
            date: new Date('2024-11-28'),
          },
        ],
      },
    ]);

    await Match.insertMany([
      {
        title: 'IND vs AUS - 1st T20I',
        team1: 'India',
        team2: 'Australia',
        matchType: 'T20',
        status: 'live',
        venue: venues[0]._id,
        date: new Date(),
        score: {
          team1: { runs: 186, wickets: 5, overs: 20 },
          team2: { runs: 142, wickets: 7, overs: 17.3 },
        },
        currentInnings: 2,
        currentBatsmen: [
          { name: 'Matthew Wade', runs: 34, balls: 28 },
          { name: 'Tim David', runs: 18, balls: 14 },
        ],
        currentBowler: {
          name: 'Jasprit Bumrah',
          overs: 3.3,
          wickets: 2,
          runs: 24,
        },
        lastSixBalls: ['1', 'W', '4', '0', '1', '6'],
        runRate: 8.11,
        requiredRate: 14.2,
        tossWinner: 'India',
        tossDecision: 'bat',
      },
    ]);

    await Tweet.insertMany([
      {
        content: 'Kohli is absolutely brilliant today! What a champion batsman!',
        author: 'CricFan01',
        authorHandle: '@CricFan01',
        sentiment: 'positive',
        relatedPlayer: 'Virat Kohli',
        relatedTeam: 'India',
        tags: ['Kohli', 'IND', 'T20'],
        likes: 234,
        retweets: 56,
        isTrending: true,
      },
      {
        content: 'Australia is playing poor cricket. Very disappointing performance.',
        author: 'DownUnderFan',
        authorHandle: '@DownUnderFan',
        sentiment: 'negative',
        relatedPlayer: '',
        relatedTeam: 'Australia',
        tags: ['AUS', 'T20'],
        likes: 89,
        retweets: 12,
      },
    ]);

    console.log('✅ Seed data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();