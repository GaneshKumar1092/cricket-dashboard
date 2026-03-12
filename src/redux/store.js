import { configureStore } from '@reduxjs/toolkit';
import matchesReducer from './slices/matchesSlice';
import tweetsReducer from './slices/tweetsSlice';
import venuesReducer from './slices/venuesSlice';
import authReducer from './slices/authSlice';
import playersReducer from './slices/playersSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    matches: matchesReducer,
    tweets: tweetsReducer,
    venues: venuesReducer,
    auth: authReducer,
    players: playersReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
      },
    }),
});

export default store;
