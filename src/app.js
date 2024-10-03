const express = require('express');
const app = express();
const usersRoutes = require('./routes/users');

app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('API is healthy!');
});

// Users routes for CRUD operations
app.use('/api', usersRoutes);

module.exports = app;
