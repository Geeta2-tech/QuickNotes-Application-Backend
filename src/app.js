const express = require('express');
const app = express();
const router = require('./routes')

// Middleware to parse JSON bodies
app.use(express.json()); // <-- This must come before app.use('/api', router)

// connect to the database
const {connectToDatabase} = require('./config/db');

// Initialize database connection
connectToDatabase();    
// Use the router for handling routes

// Define the base route for the API
app.use('/api', router);


module.exports = app;