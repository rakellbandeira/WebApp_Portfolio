import mongoose from 'mongoose';
import Project from '../backend/models/Project.js';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
};

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get all projects
      const projects = await Project.find();
      return res.status(200).json(projects);
    } else if (req.method === 'POST') {
      // Create new project
      const { title, description, stack, githubLink, demoLink, featured } = req.body;

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
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      message: 'Error processing request',
      error: error.message
    });
  }
};