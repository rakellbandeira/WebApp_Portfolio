import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        stack: {
            type: [String],
            required: true
        }, 
        githubLink: {
            type: String
    
        }, 
        demoLink: {
            type: String
        },
        //critical point!!! see project image management later
        images: [{
            type: String,
            validate: {
            validator: function(v) {
                return /\.(jpg|jpeg|png|gif|webp)$/.test(v);
            },
            message: 'Image must be a valid image file'
            }
            }], 
        featured: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true });

/* What about the images? See later */

export default mongoose.model('Project', ProjectSchema);