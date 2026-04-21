// redux/slices/playersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { playersAPI } from '../../services/api';

export const fetchPlayers = createAsyncThunk(
  'players/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const { data } = await playersAPI.getAll(filters);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch players');
    }
  }
);

export const fetchPlayerById = createAsyncThunk(
  'players/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await playersAPI.getById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch player');
    }
  }
);

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPlayer: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.list    = action.payload;
      })
      .addCase(fetchPlayers.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      .addCase(fetchPlayerById.pending,   (state) => { state.loading = true; })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.loading  = false;
        state.selected = action.payload;
      })
      .addCase(fetchPlayerById.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { clearSelectedPlayer } = playersSlice.actions;
export default playersSlice.reducer;