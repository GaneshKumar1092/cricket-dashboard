// controllers/matchController.js
const Match = require('../models/Match');

// @desc   Get all matches
// @route  GET /api/matches
const getMatches = async (req, res) => {
  try {
    const { status } = req.query; // Filter by status if provided
    const filter = status ? { status } : {};
    const matches = await Match.find(filter).populate('venue').sort({ date: -1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single match by ID
// @route  GET /api/matches/:id
const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate('venue');
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Create a new match
// @route  POST /api/matches
const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Update match (used for live score updates)
// @route  PUT /api/matches/:id
const updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!match) return res.status(404).json({ message: 'Match not found' });

    // Emit real-time update via Socket.IO
    const { getIO } = require('../config/socket');
    getIO().to(`match_${req.params.id}`).emit('scoreUpdate', match);

    res.json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Delete a match
// @route  DELETE /api/matches/:id
const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMatches, getMatchById, createMatch, updateMatch, deleteMatch };