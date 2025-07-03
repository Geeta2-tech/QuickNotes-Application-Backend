const express = require('express');
const app = express();
const router = require('./routes')

app.use(express.json());
// connect to the database
const {connectToDatabase} = require('./config/db');

// Initialize database connection
connectToDatabase();    
// Use the router for handling routes

// Define the base route for the API
app.use('/api', router);


module.exports = app;