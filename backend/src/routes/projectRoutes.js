const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Project = require('../models/Project');
const User = require('./models/User');


/* router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); */

/* router.get('/about', async (req, res) => {
  try {
    console.log('Fetching user profile...');
    const user = await User.findOne();
    console.log('User found:', user ? user.name : 'No user');
    res.json(user);
  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
}); */

router.get('/projects', async (req, res) => {
  try {
    console.log('Fetching projects...');
    const projects = await Project.find();
    console.log(`Found ${projects.length} projects`);
    res.json(projects);
  } catch (error) {
    console.error('Projects fetch error:', error);
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

/* router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}); */

// Add other CRUD routes later (update, delete, get by ID)

module.exports = router;