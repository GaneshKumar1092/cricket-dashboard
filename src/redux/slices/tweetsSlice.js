// redux/slices/tweetsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tweetsAPI } from '../../services/api';

export const fetchTweets = createAsyncThunk(
  'tweets/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const { data } = await tweetsAPI.getAll(filters);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch tweets');
    }
  }
);

const tweetsSlice = createSlice({
  name: 'tweets',
  initialState: {
    list: [],
    loading: false,
    error: null,
    activeFilter: { player: '', team: '', sentiment: '' },
  },
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = { ...state.activeFilter, ...action.payload };
    },
    clearFilters: (state) => {
      state.activeFilter = { player: '', team: '', sentiment: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.list    = action.payload;
      })
      .addCase(fetchTweets.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { setFilter, clearFilters } = tweetsSlice.actions;
export default tweetsSlice.reducer;