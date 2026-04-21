const express = require('express');
const router = express.Router();
const { getVenues, getVenueById, createVenue, updateVenue } = require('../controllers/venueController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getVenues);
router.get('/:id', getVenueById);
router.post('/', protect, adminOnly, createVenue);
router.put('/:id', protect, adminOnly, updateVenue);

module.exports = router;