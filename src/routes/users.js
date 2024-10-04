const express = require('express');
const router = express.Router();

// In-memory array to store users as a mock database
let users = [];

// Create a new user
router.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // const newUser = { id: users.length + 1, name, email };
  // users.push(newUser);

  res.status(201).json(newUser);
});

// Get all users
router.get('/users', (req, res) => {
  res.status(200).json(users);
});

// Get a specific user by ID
router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
});

// Update a user by ID
router.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email } = req.body;

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  users[userIndex] = { id: userId, name, email };
  res.status(200).json(users[userIndex]);
});

// Delete a user by ID
router.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router;
