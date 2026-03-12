import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tweetsAPI } from '../../services/api';

export const fetchTweets = createAsyncThunk('tweets/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const res = await tweetsAPI.getAll(params);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch tweets');
  }
});

export const fetchTrendingPlayers = createAsyncThunk('tweets/trending', async (_, { rejectWithValue }) => {
  try {
    const res = await tweetsAPI.getTrending();
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch trending');
  }
});

const tweetsSlice = createSlice({
  name: 'tweets',
  initialState: {
    list: [],
    trending: [],
    loading: false,
    error: null,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => { state.loading = true; })
      .addCase(fetchTweets.fulfilled, (state, action) => { state.loading = false; state.list = action.payload.data; state.total = action.payload.total; })
      .addCase(fetchTweets.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchTrendingPlayers.fulfilled, (state, action) => { state.trending = action.payload; });
  },
});

export default tweetsSlice.reducer;
