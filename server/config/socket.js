// config/socket.js - Socket.IO setup for real-time features
let io;

const initSocket = (server) => {
  const { Server } = require('socket.io');

  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`🟢 Client connected: ${socket.id}`);

    // Join a specific match room for live updates
    socket.on('joinMatch', (matchId) => {
      socket.join(`match_${matchId}`);
      console.log(`Socket ${socket.id} joined match room: match_${matchId}`);
    });

    socket.on('leaveMatch', (matchId) => {
      socket.leave(`match_${matchId}`);
    });

    socket.on('disconnect', () => {
      console.log(`🔴 Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

// Export io so controllers can emit events
const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized. Call initSocket first.');
  }
  return io;
};

module.exports = { initSocket, getIO };