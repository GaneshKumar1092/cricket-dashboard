import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { playersAPI } from '../../services/api';

export const fetchPlayers = createAsyncThunk('players/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const res = await playersAPI.getAll(params);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch players');
  }
});

export const fetchPlayer = createAsyncThunk('players/fetchOne', async (id, { rejectWithValue }) => {
  try {
    const res = await playersAPI.getOne(id);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch player');
  }
});

const playersSlice = createSlice({
  name: 'players',
  initialState: { list: [], currentPlayer: null, loading: false, error: null, total: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => { state.loading = true; })
      .addCase(fetchPlayers.fulfilled, (state, action) => { state.loading = false; state.list = action.payload.data; state.total = action.payload.total; })
      .addCase(fetchPlayers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchPlayer.pending, (state) => { state.loading = true; })
      .addCase(fetchPlayer.fulfilled, (state, action) => { state.loading = false; state.currentPlayer = action.payload; })
      .addCase(fetchPlayer.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default playersSlice.reducer;
