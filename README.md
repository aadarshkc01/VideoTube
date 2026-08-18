# 🎬 VideoTube

VideoTube is a full-stack video-sharing web application inspired by platforms like YouTube.

Users can create accounts, upload and watch videos, interact with content through likes and comments, subscribe to channels, create playlists, manage their profiles, and view channel analytics.

## 🚀 Live Demo

**Frontend:** Coming soon

**Backend API:** Coming soon

> The application will be deployed using Vercel for the frontend and Render for the backend.

---

## ✨ Features

* 🔐 User registration and authentication
* 👤 User profiles with avatar and cover image
* 🎥 Video upload and management
* ▶️ Video playback
* 🔎 Video search
* 👍 Like videos and comments
* 💬 Comment on videos
* 🔔 Subscribe to channels
* 📂 Create and manage playlists
* 🕐 Watch history
* ❤️ Liked videos
* 📊 Creator dashboard and analytics
* 🔒 Protected routes and authentication
* ☁️ Cloud-based media storage

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Multer

### Cloud Services

* Cloudinary — media storage
* MongoDB Atlas — production database
* Vercel — frontend deployment
* Render — backend deployment

---

## 📁 Project Structure

```text
VideoTube/
│
├── frontend/          # React + Vite frontend
│
├── backend/           # Node.js + Express backend
│
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* A Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/VideoTube.git
cd VideoTube
```

### 2. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
NODE_ENV=development
PORT=8000

MONGODB_URI=your_mongodb_connection_string

CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:8000
```

### 3. Setup the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=/api/v1
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---


## 🌐 Deployment

The project uses a single GitHub repository with separate deployments for the frontend and backend.

```text
GitHub
   │
   ├── frontend/ ──→ Vercel
   │
   └── backend/ ───→ Render
                         │
                         ├── MongoDB Atlas
                         └── Cloudinary
```

### Frontend — Vercel

Set the Vercel **Root Directory** to:

```text
frontend
```

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Production environment variable:

```env
VITE_API_URL=https://YOUR-BACKEND.onrender.com/api/v1
```

### Backend — Render

Set the Render **Root Directory** to:

```text
backend
```

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Configure the required backend environment variables in Render.

---

## 🔐 Environment Variables

Never commit your actual `.env` files or secrets to GitHub.

Use placeholder values such as:

```env
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Your `.gitignore` should exclude:

```text
.env
.env.local
.env.production
node_modules/
dist/
```

---

## 📌 API

The backend API is available under:

```text
/api/v1
```

The application includes APIs for:

* Authentication and users
* Videos
* Comments
* Likes
* Subscriptions
* Playlists
* Dashboard
* Tweets

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Aadarsh**

GitHub: `https://github.com/YOUR_USERNAME`

---

⭐ If you find this project useful, consider giving the repository a star.
