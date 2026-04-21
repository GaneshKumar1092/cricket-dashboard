const express = require('express');
const router = express.Router();
const { getTweets, createTweet } = require('../controllers/tweetController');
const { protect } = require('../middleware/auth');

router.get('/', getTweets);
router.post('/', protect, createTweet);

module.exports = router;