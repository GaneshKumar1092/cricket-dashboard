// venuesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { venuesAPI } from '../../services/api';

export const fetchVenues = createAsyncThunk('venues/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const res = await venuesAPI.getAll(params);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch venues');
  }
});

export const fetchVenue = createAsyncThunk('venues/fetchOne', async (id, { rejectWithValue }) => {
  try {
    const res = await venuesAPI.getOne(id);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch venue');
  }
});

const venuesSlice = createSlice({
  name: 'venues',
  initialState: { list: [], currentVenue: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues.pending, (state) => { state.loading = true; })
      .addCase(fetchVenues.fulfilled, (state, action) => { state.loading = false; state.list = action.payload.data; })
      .addCase(fetchVenues.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchVenue.pending, (state) => { state.loading = true; })
      .addCase(fetchVenue.fulfilled, (state, action) => { state.loading = false; state.currentVenue = action.payload; })
      .addCase(fetchVenue.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default venuesSlice.reducer;
