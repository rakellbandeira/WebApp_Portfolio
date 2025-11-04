const express =  require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

//Middlewares - functions that handle req and res efficiently
app.use(cors());
app.use(express.json());

// Models - to handle communication with MongoDB and avoid writing raw database queries everywhere
const User = require('./models/User');
const Project = require('./models/Project');

//Routes
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

app.get('/api/projects', async (req, res) => {
    try {
        const Project = require('./models/Project');
        const projects = await Project.find();
        res.json(projects);
    } catch (error){
        res.status(500).json({message: 'Error fetching Projects', error: error.message});        
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
    const { email, message } = req.body;

    // Basic validation
    if (!email || !message) {
      return res.status(400).json({ message: 'Email and message are required' });
    }

    // For now, just logging a message, later set real email sending
    console.log('Contact Form Submission:', { email, message });

    res.status(200).json({ 
      message: 'Message received successfully',
      submission: { email, message }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error processing contact form', 
      error: error.message 
    });
  }
});


//MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on port ${PORT');
});


module.exports = app;





