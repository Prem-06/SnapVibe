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


## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/Prem-06/Instagram.git
cd SnapVibe
```

### Setup Backend
```bash
cd backend
npm install
```
Create a .env file in the backend directory and add the following environment variables:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Setup Frontend
```bash
cd ../frontend
npm install
```
Create a .env file in the frontend directory and add the following environment variable:
```bash
VITE_BACKEND_URL=http://localhost:3000
```

### Start Server
Open two terminal windows and run the following commands:

In the first terminal (backend):

```bash
cd backend
node app.js
```

In the second terminal (frontend):

```bash
cd frontend
npm start
```
Your backend server will be running on http://localhost:3000, and the frontend will be accessible at http://localhost:5173 

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
