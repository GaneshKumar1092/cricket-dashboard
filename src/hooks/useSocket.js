// hooks/useSocket.js
// Custom hook to manage Socket.IO connection for live match updates
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { updateLiveScore } from '../redux/slices/matchesSlice';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

const useSocket = (matchId) => {
  // useRef keeps the socket instance alive across re-renders
  const socketRef = useRef(null);
  const dispatch  = useDispatch();

  useEffect(() => {
    if (!matchId) return;

    // Connect to Socket.IO server
    socketRef.current = io(SOCKET_URL, { transports: ['websocket'] });

    // Join the specific match room
    socketRef.current.emit('joinMatch', matchId);

    // Listen for live score updates emitted by backend
    socketRef.current.on('scoreUpdate', (updatedMatch) => {
      dispatch(updateLiveScore(updatedMatch));
    });

    // Listen for match events (wicket, boundary, etc.)
    socketRef.current.on('matchEvent', (event) => {
      // We can handle toast notifications here in Phase 8
      console.log('Match Event:', event);
    });

    // Cleanup: leave room and disconnect on unmount
    return () => {
      socketRef.current.emit('leaveMatch', matchId);
      socketRef.current.disconnect();
    };
  }, [matchId, dispatch]);

  return socketRef.current;
};

export default useSocket;