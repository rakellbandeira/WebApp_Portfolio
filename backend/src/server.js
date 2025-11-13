import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// MongoDB connection state
let isConnected = false;

// Connect to MongoDB
const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    isConnected = false;
    throw error;
  }
};

// Import models AFTER dotenv.config()
import Project from '../models/Project.js';
import User from '../models/User.js';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    await connectDB();
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ 
      message: 'Error fetching projects', 
      error: error.message 
    });
  }
});

// GET project by ID
app.get('/api/projects/:id', async (req, res) => {
  try {
    await connectDB();
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({
      message: 'Error fetching project details',
      error: error.message
    });
  }
});

// CREATE project
app.post('/api/projects', async (req, res) => {
  try {
    await connectDB();
    const { title, description, stack, githubLink, demoLink, featured } = req.body;

    // Validate
    if (!title || !description || !stack) {
      return res.status(400).json({
        message: 'Missing required fields: title, description, and stack are required'
      });
    }

    if (!Array.isArray(stack) || stack.length === 0) {
      return res.status(400).json({
        message: 'Stack must be a non-empty array of strings'
      });
    }

    const newProject = new Project({
      title,
      description,
      stack,
      githubLink,
      demoLink,
      featured: featured || false
    });

    const savedProject = await newProject.save();
    return res.status(201).json({
      message: 'Project created successfully',
      project: savedProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({
      message: 'Error creating project',
      error: error.message
    });
  }
});

// UPDATE project
app.put('/api/projects/:id', async (req, res) => {
  try {
    await connectDB();
    const { title, description, stack, githubLink, demoLink, featured } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (title) project.title = title;
    if (description) project.description = description;
    if (stack) {
      if (!Array.isArray(stack) || stack.length === 0) {
        return res.status(400).json({
          message: 'Stack must be a non-empty array of strings'
        });
      }
      project.stack = stack;
    }
    if (githubLink !== undefined) project.githubLink = githubLink;
    if (demoLink !== undefined) project.demoLink = demoLink;
    if (featured !== undefined) project.featured = featured;

    const updatedProject = await project.save();
    return res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({
      message: 'Error updating project',
      error: error.message
    });
  }
});

// DELETE project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await connectDB();
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json({
      message: 'Project deleted successfully',
      project: project
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({
      message: 'Error deleting project',
      error: error.message
    });
  }
});

// GET user profile
app.get('/api/users', async (req, res) => {
  try {
    await connectDB();
    const user = await User.findOne({});
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ 
      message: 'Error fetching user data', 
      error: error.message 
    });
  }
});

// Catch-all for unmatched routes
app.use('*', (req, res) => {
  console.log('Route not found:', req.method, req.path);
  return res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// For local development only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;