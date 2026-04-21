# 🏏 CricDash — Real-Time Cricket Analytics & Match Intelligence Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://mongodb.com)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black?logo=socket.io)](https://socket.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A production-style full-stack MERN application for real-time cricket analytics,
> player intelligence, venue insights, and live match tracking.

---

## 📸 Screenshots

| Home | Live Match | Player Dashboard |
|------|-----------|-----------------|
| ![Home](screenshots/home.png) | Coming Soon | Coming Soon |

---

## 🚀 Features

- 🔴 **Live Match Center** — Real-time score, ball-by-ball updates via Socket.IO
- 📊 **Player Form Dashboard** — Recent form chart, batting/bowling analytics
- 🏟️ **Venue Intelligence** — Pitch analysis, chasing stats, toss impact
- 🔍 **Smart Search** — Trie-based autocomplete for players, teams, venues
- 🎯 **Win Predictor** — Rule-based win probability engine
- 📱 **Social Pulse** — Sentiment-tagged cricket tweets feed
- 👤 **User Personalization** — Favorites, saved matches, alerts
- 🔔 **Real-time Notifications** — Wicket, fifty, hundred alerts
- 🛡️ **Admin Panel** — Manage matches, players, venues

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, Redux Toolkit |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Real-time | Socket.IO |
| Charts | Recharts |
| Auth | JWT + bcryptjs |
| HTTP Client | Axios |
| Styling | CSS Modules + Custom Design System |

---

## 📁 Project Structure

\`\`\`
cricket-dashboard/
├── client/src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Route-level page components
│   ├── redux/         # Redux Toolkit slices and store
│   ├── services/      # Axios API calls
│   ├── utils/         # Trie, sentiment, formatters
│   └── hooks/         # Custom React hooks
└── server/
    ├── config/        # DB + Socket.IO config
    ├── controllers/   # Business logic
    ├── models/        # MongoDB schemas
    ├── routes/        # Express API routes
    └── middleware/    # Auth + error handling
\`\`\`

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- npm

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/GaneshKumar1092/cricket-dashboard.git
cd cricket-dashboard
\`\`\`

### 2. Setup the Backend
\`\`\`bash
cd server
npm install
cp .env.example .env
# Edit .env and add your MongoDB Atlas URI
npm run dev
\`\`\`

### 3. Setup the Frontend
\`\`\`bash
cd ..   # back to root
npm install
npm start
\`\`\`

### 4. Seed sample data (optional)
\`\`\`bash
cd server
node utils/seedData.js
\`\`\`

---

## 🔌 API Routes

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | /api/matches | Get all matches | Public |
| GET | /api/matches/:id | Get match by ID | Public |
| POST | /api/matches | Create match | Admin |
| PUT | /api/matches/:id | Update match (triggers Socket event) | Admin |
| GET | /api/players | Get all players | Public |
| GET | /api/players/:id | Get player with form | Public |
| GET | /api/venues | Get all venues | Public |
| GET | /api/venues/:id | Get venue analytics | Public |
| GET | /api/tweets | Get social feed | Public |
| POST | /api/users/register | Register user | Public |
| POST | /api/users/login | Login | Public |
| GET | /api/users/profile | Get profile | Protected |

---

## 🔮 Future Scope

- ML-based win predictor using Python microservice
- Push notifications via Firebase
- Fantasy cricket team builder
- IPL auction simulator
- Mobile app with React Native

---

## 👨‍💻 Developer

**Ganesh Kumar**
B.Tech CSE | Full-Stack Developer
[GitHub](https://github.com/GaneshKumar1092)