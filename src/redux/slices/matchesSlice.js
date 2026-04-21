// redux/slices/matchesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { matchesAPI } from '../../services/api';

export const fetchMatches = createAsyncThunk(
  'matches/fetchAll',
  async (status, { rejectWithValue }) => {
    try {
      const { data } = await matchesAPI.getAll(status);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch matches');
    }
  }
);

export const fetchMatchById = createAsyncThunk(
  'matches/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await matchesAPI.getById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch match');
    }
  }
);

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    list: [],          // All matches
    selected: null,    // Currently viewed match
    loading: false,
    error: null,
  },
  reducers: {
    // Called by Socket.IO when live score updates arrive
    updateLiveScore: (state, action) => {
      const updated = action.payload;
      // Update in list if it exists there
      const index = state.list.findIndex((m) => m._id === updated._id);
      if (index !== -1) state.list[index] = updated;
      // Update selected match if it's the same one
      if (state.selected?._id === updated._id) state.selected = updated;
    },
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMatches.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMatchById.pending,   (state) => { state.loading = true; })
      .addCase(fetchMatchById.fulfilled, (state, action) => {
        state.loading  = false;
        state.selected = action.payload;
      })
      .addCase(fetchMatchById.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { updateLiveScore, clearSelected } = matchesSlice.actions;
export default matchesSlice.reducer;