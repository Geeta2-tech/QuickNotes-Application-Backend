// Import necessary modules
const express = require('express');
const app = express();
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Enable CORS for all routes with specific configurations
app.use(cors({
  origin: 'http://localhost:5173', // Allow specific origin (can be updated for production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json()); // This must come before any routes are defined

// Connect to the database
const { connectToDatabase } = require('./config/db');

// Initialize database connection
connectToDatabase();    

// Use the router for handling API routes
app.use('/api', router);

// Load the correct .env file based on the environment
require('dotenv').config({ path: 'env/.env.staging' });

module.exports = app;
