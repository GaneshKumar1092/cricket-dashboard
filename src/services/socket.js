import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => console.log('🔌 Socket connected:', socket.id));
    socket.on('disconnect', (reason) => console.log('🔌 Socket disconnected:', reason));
    socket.on('connect_error', (err) => console.error('Socket error:', err.message));
  }
  return socket;
};

export const getSocket = () => socket;

export const joinMatchRoom = (matchId) => {
  if (socket) socket.emit('join_match', matchId);
};

export const leaveMatchRoom = (matchId) => {
  if (socket) socket.emit('leave_match', matchId);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
