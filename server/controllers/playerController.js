// controllers/playerController.js
const Player = require('../models/Player');

const getPlayers = async (req, res) => {
  try {
    const { country, role } = req.query;
    const filter = {};
    if (country) filter.country = country;
    if (role) filter.role = role;
    const players = await Player.find(filter).sort({ name: 1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: 'Player deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer };