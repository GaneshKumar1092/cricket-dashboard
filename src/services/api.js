// services/api.js - Central Axios instance for all API calls
import axios from 'axios';

// Base Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if user is logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('cricdash_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Individual named exports (used in new phases) ────────────
export const fetchMatches    = (status)  => API.get('/matches', { params: { status } });
export const fetchMatchById  = (id)      => API.get(`/matches/${id}`);
export const fetchPlayers    = (filters) => API.get('/players', { params: filters });
export const fetchPlayerById = (id)      => API.get(`/players/${id}`);
export const fetchVenues     = ()        => API.get('/venues');
export const fetchVenueById  = (id)      => API.get(`/venues/${id}`);
export const fetchTweets     = (filters) => API.get('/tweets', { params: filters });
export const registerUser    = (data)    => API.post('/users/register', data);
export const loginUser       = (data)    => API.post('/users/login', data);
export const fetchUserProfile  = ()      => API.get('/users/profile');
export const updateUserProfile = (data)  => API.put('/users/profile', data);

// ─── Grouped exports (used by existing Redux slices) ──────────
// These match what your old slices expect: authAPI, matchesAPI, etc.

export const authAPI = {
  login:    (data) => API.post('/users/login', data),
  register: (data) => API.post('/users/register', data),
  getProfile:    () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/profile', data),
};

export const matchesAPI = {
  getAll:    (status) => API.get('/matches', { params: { status } }),
  getById:   (id)     => API.get(`/matches/${id}`),
  create:    (data)   => API.post('/matches', data),
  update:    (id, data) => API.put(`/matches/${id}`, data),
  delete:    (id)     => API.delete(`/matches/${id}`),
};

export const playersAPI = {
  getAll:  (filters) => API.get('/players', { params: filters }),
  getById: (id)      => API.get(`/players/${id}`),
  create:  (data)    => API.post('/players', data),
  update:  (id, data) => API.put(`/players/${id}`, data),
  delete:  (id)      => API.delete(`/players/${id}`),
};

export const venuesAPI = {
  getAll:  ()        => API.get('/venues'),
  getById: (id)      => API.get(`/venues/${id}`),
  create:  (data)    => API.post('/venues', data),
  update:  (id, data) => API.put(`/venues/${id}`, data),
};

export const tweetsAPI = {
  getAll: (filters) => API.get('/tweets', { params: filters }),
  create: (data)    => API.post('/tweets', data),
};

export default API;