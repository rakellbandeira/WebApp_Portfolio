import mongoose from 'mongoose';

const ContactSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded'],
    default: 'new'
  },
  ipAddress: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('ContactSubmission', ContactSubmissionSchema);