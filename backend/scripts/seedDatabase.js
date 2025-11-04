const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Project = require('../models/Project');

const seedDatabase = async () => {
  try {
    // connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // delete existing data
    await User.deleteMany({});
    await Project.deleteMany({});

    // create user
    const user = new User({
      name: 'Rakell Bandeira',
      email: 'rakellbandeira@gmail.com',
      title: 'Software Development Student',
      description: 'I am Rakell, a passionate software development student focused on creating application, with a keen interest in interfaces and aesthetic solutions that create meaningful impact.',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/rakell',
        github: 'https://github.com/rakellbandeira'
      }
    });
    await user.save();

    // Create projects
    const projects = [
      {
        title: 'Real-Time Vehicle Tracker',
        description: 'A web app that displays fleet\'s locations in real-time',
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
        githubLink: 'https://github.com/rakell/vehicle-tracker',
        featured: true
      }
      // Add more projects as needed
    ];
    await Project.insertMany(projects);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();