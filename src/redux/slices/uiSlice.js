import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: localStorage.getItem('darkMode') !== 'false',
    sidebarOpen: true,
    searchQuery: '',
  },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    setDarkMode(state, action) {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', action.payload);
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode, toggleSidebar, setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;
