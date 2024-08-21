# SnapVibe(Social Media App)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
  

## Introduction

This project is a social media app built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to sign up, log in, upload posts, like posts, comment on posts, follow/unfollow users, and view a feed of posts from users they follow.

## Features

- User Authentication (Signup/Login)
- JWT-based authentication
- Create, Read, Update, Delete (CRUD) operations for posts
- Like and comment on posts
- Follow and unfollow other users
- User profile management
- Responsive UI

## Tech Stack

- **Frontend:**
  - React.js
  - CSS (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB 

- **Authentication:**
  - JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js
- MongoDB

### Setup

# Clone the repository
git clone https://github.com/Prem-06/Instagram.git
cd SnapVibe

# Setup backend
cd backend
npm install

# Create .env file for backend
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_jwt_secret" >> .env

# Setup frontend
cd ../frontend
npm install

# Create .env file for frontend
echo "VITE_BACKEND_URL=http://localhost:3000" > .env

# Start backend and frontend servers
# Open two terminal windows and run the following commands in each:

# In the first terminal (backend):
# cd SnapVibe/backend
# npm start

# In the second terminal (frontend):
# cd SnapVibe/frontend
# npm run dev


## Project Structure

```bash
SnapVibe/
├── frontend/                # Frontend project files
│   ├── public/              # Public assets (index.html, favicon, etc.)
│   ├── src/                 # Source files (React components, styles, etc.)
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS or styled-components
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point for React
│   ├── package.json         # Frontend dependencies and scripts
│   └── .env                 # Environment variables for frontend
├── backend/                 # Backend project files
│   ├── controllers/         # Request handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Middleware (authentication, etc.)
│   ├── config/              # Configuration files (database, server settings, etc.)
│   ├── app.js               # Main app entry point
│   ├── package.json         # Backend dependencies and scripts
│   └── .env                 # Environment variables for backend
└── README.md                # Project overview and setup instructions
```
Just copy and paste the code above into your `README.md` file, and you're all set!
