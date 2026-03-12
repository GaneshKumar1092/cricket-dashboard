import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { matchesAPI } from '../../services/api';

// Async thunks
export const fetchMatches = createAsyncThunk(
  'matches/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const res = await matchesAPI.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch matches');
    }
  }
);

export const fetchLiveMatches = createAsyncThunk(
  'matches/fetchLive',
  async (_, { rejectWithValue }) => {
    try {
      const res = await matchesAPI.getLive();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch live matches');
    }
  }
);

export const fetchMatch = createAsyncThunk(
  'matches/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await matchesAPI.getOne(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch match');
    }
  }
);

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    list: [],
    liveMatches: [],
    currentMatch: null,
    loading: false,
    liveLoading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    total: 0,
    filters: {
      status: '',
      category: '',
      format: '',
      search: '',
    },
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = { status: '', category: '', format: '', search: '' };
    },
    updateLiveMatch(state, action) {
      const { matchId, data } = action.payload;
      const idx = state.liveMatches.findIndex((m) => m._id === matchId);
      if (idx !== -1) state.liveMatches[idx] = data;
      if (state.currentMatch?._id === matchId) state.currentMatch = data;
    },
    clearCurrentMatch(state) {
      state.currentMatch = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMatches
      .addCase(fetchMatches.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMatches.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // fetchLiveMatches
      .addCase(fetchLiveMatches.pending, (state) => { state.liveLoading = true; })
      .addCase(fetchLiveMatches.fulfilled, (state, action) => {
        state.liveLoading = false;
        state.liveMatches = action.payload.data;
      })
      .addCase(fetchLiveMatches.rejected, (state, action) => { state.liveLoading = false; state.error = action.payload; })
      // fetchMatch
      .addCase(fetchMatch.pending, (state) => { state.loading = true; state.currentMatch = null; })
      .addCase(fetchMatch.fulfilled, (state, action) => { state.loading = false; state.currentMatch = action.payload; })
      .addCase(fetchMatch.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { setFilters, clearFilters, updateLiveMatch, clearCurrentMatch } = matchesSlice.actions;
export default matchesSlice.reducer;
