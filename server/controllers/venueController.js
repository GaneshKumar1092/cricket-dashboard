// controllers/venueController.js
const Venue = require('../models/Venue');

const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find().sort({ name: 1 });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVenue = async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json(venue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getVenues, getVenueById, createVenue, updateVenue };