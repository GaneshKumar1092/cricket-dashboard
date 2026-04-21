// redux/slices/venuesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { venuesAPI } from '../../services/api';

export const fetchVenues = createAsyncThunk(
  'venues/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await venuesAPI.getAll();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch venues');
    }
  }
);

export const fetchVenueById = createAsyncThunk(
  'venues/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await venuesAPI.getById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch venue');
    }
  }
);

const venuesSlice = createSlice({
  name: 'venues',
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedVenue: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.list    = action.payload;
      })
      .addCase(fetchVenues.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      .addCase(fetchVenueById.pending,   (state) => { state.loading = true; })
      .addCase(fetchVenueById.fulfilled, (state, action) => {
        state.loading  = false;
        state.selected = action.payload;
      })
      .addCase(fetchVenueById.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { clearSelectedVenue } = venuesSlice.actions;
export default venuesSlice.reducer;