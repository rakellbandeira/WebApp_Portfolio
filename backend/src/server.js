const express =  require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ContactSubmission = require('./models/ContactSubmission');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
// Models - to handle communication with MongoDB and avoid writing raw database queries everywhere
const User = require('./models/User');
const Project = require('./models/Project');
require('dotenv').config();


const app = express();

//MongoDB Connection
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on port ${PORT');
});


//swagger doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//Middlewares - functions that handle req and res efficiently
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);




//Routes
/* app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error){
        res.status(500).json({message: 'Error fetching Projects', error: error.message});        
    }
}); */

app.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/about', async (req, res) => {
    try {
        const user = await User.findOne({});
        if (!user) {
            return res.status(404).json({ message: 'User profile not found', error: message });
        }

        res.json(user);
    } catch (error){
        res.status(500).json({message: 'Error fetching User data'});        
    }
});

//critical point in API, :id. Set API Documentation
app.get('/api/projects/:id', async (req,res) => {
    try {
        const Project = require('./models/Project');
        const project = await Project.findById(req.params.id);

        if(!project) {
            return res.status(404).json({ message: 'Project not found'});
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching project details', 
            error: error.message 
        });
    }
}); 


// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // For now, just logging a message, later set nodemailer or alternative email sending
    console.log('Contact Form Submission:', { name, email, message });
    // Create new contact submission
    const newSubmission = new ContactSubmission({
      name,
      email,
      message,
      ipAddress: req.ip // Capture IP address
    });
    // Save to database
    await newSubmission.save();


    res.status(200).json({ 
      message: 'Message received successfully',
      submissionId: newSubmission._id
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ 
      message: 'Error processing contact form', 
      error: error.message 
    });
  }
});

app.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});


// Catch-all Route for Debugging
app.use('*', (req, res) => {
  console.log('Catch-all route hit');
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});


module.exports = app;





