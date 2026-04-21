// server.js - Main entry point for CricDash backend
const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config();

const connectDB = require('./config/db');
const { initSocket } = require('./config/socket');

// Import routes
const matchRoutes = require('./routes/matchRoutes');
const playerRoutes = require('./routes/playerRoutes');
const venueRoutes = require('./routes/venueRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const userRoutes = require('./routes/userRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Create HTTP server (required for Socket.IO)
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Connect to MongoDB Atlas
connectDB();

// ─── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ────────────────────────────────────────────
app.use('/api/matches', matchRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CricDash API is running 🏏',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler (must be last)
app.use(errorHandler);

// ─── Start Server ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 CricDash server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.IO ready for real-time connections`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});