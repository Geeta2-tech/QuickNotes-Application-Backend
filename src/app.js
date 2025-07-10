const express = require('express');
const app = express();
const router = require('./routes')
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow all origins, you can specify specific origins if needed
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  credentials: true // Allow credentials if needed
}));  
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json()); // <-- This must come before app.use('/api', router)

// connect to the database
const {connectToDatabase} = require('./config/db');

// Initialize database connection
connectToDatabase();    
// Use the router for handling routes

// Define the base route for the API
app.use('/api', router);

// Load the correct .env file
require('dotenv').config({ path: 'env/.env.staging' });

  
module.exports = app;