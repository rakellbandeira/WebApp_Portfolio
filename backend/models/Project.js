const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,

        },
        description: {
            type: String,
            required: true
        },
        stack: {
            type: String,
            required: true
        }, 
        githubLink: {
            type: String
    
        }, 
        demoLink: {
            type: String
        } 
    }
);

/* What about the images? See later */

module.exports = mongoose.model('Project', ProjectSchema);