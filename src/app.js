const express = require('express');
const app = express();


app.use(express.json());
// connect to the database
const {connectToDatabase} = require('./config/db');

// Initialize database connection
connectToDatabase();    
// Use the router for handling routes


module.exports = app;