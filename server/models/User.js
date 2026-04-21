// models/User.js - User account + personalization schema
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String, default: '' },

    // Personalization data
    favoriteTeams: [{ type: String }],
    favoritePlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    savedMatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
    recentlyViewed: [
      {
        itemType: { type: String, enum: ['match', 'player', 'venue'] },
        itemId: mongoose.Schema.Types.ObjectId,
        viewedAt: { type: Date, default: Date.now },
      },
    ],

    // Notification preferences
    alertPreferences: {
      wicketAlert: { type: Boolean, default: true },
      fiftyAlert: { type: Boolean, default: true },
      hundredAlert: { type: Boolean, default: true },
      matchStartAlert: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);