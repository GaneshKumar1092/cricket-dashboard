// redux/store.js - Redux store combining all slices
import { configureStore } from '@reduxjs/toolkit';
import authReducer    from './slices/authSlice';
import matchesReducer from './slices/matchesSlice';
import playersReducer from './slices/playersSlice';
import venuesReducer  from './slices/venuesSlice';
import tweetsReducer  from './slices/tweetsSlice';

const store = configureStore({
  reducer: {
    auth:    authReducer,
    matches: matchesReducer,
    players: playersReducer,
    venues:  venuesReducer,
    tweets:  tweetsReducer,
  },
});

export default store;