import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- MATCHES ---
export const matchesAPI = {
  getAll: (params) => api.get('/matches', { params }),
  getOne: (id) => api.get(`/matches/${id}`),
  getLive: () => api.get('/matches/live'),
  create: (data) => api.post('/matches', data),
  update: (id, data) => api.put(`/matches/${id}`, data),
  delete: (id) => api.delete(`/matches/${id}`),
  getHighlights: (id) => api.get(`/matches/${id}/highlights`),
};

// --- PLAYERS ---
export const playersAPI = {
  getAll: (params) => api.get('/players', { params }),
  getOne: (id) => api.get(`/players/${id}`),
  create: (data) => api.post('/players', data),
};

// --- TEAMS ---
export const teamsAPI = {
  getAll: (params) => api.get('/teams', { params }),
  getOne: (id) => api.get(`/teams/${id}`),
};

// --- TWEETS ---
export const tweetsAPI = {
  getAll: (params) => api.get('/tweets', { params }),
  getTrending: () => api.get('/tweets/trending'),
  create: (data) => api.post('/tweets', data),
  delete: (id) => api.delete(`/tweets/${id}`),
};

// --- VENUES ---
export const venuesAPI = {
  getAll: (params) => api.get('/venues', { params }),
  getOne: (id) => api.get(`/venues/${id}`),
  create: (data) => api.post('/venues', data),
  update: (id, data) => api.put(`/venues/${id}`, data),
};

// --- LEAGUES ---
export const leaguesAPI = {
  getAll: () => api.get('/leagues'),
  getOne: (id) => api.get(`/leagues/${id}`),
};

// --- AUTH ---
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  bookmark: (matchId) => api.post(`/auth/bookmark/${matchId}`),
};

// --- ADMIN ---
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  addHighlight: (matchId, data) => api.put(`/admin/matches/${matchId}/highlight`, data),
};

export default api;
