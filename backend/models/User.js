import mongoose from 'mongoose';

const MySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: 'Rakell'
        },
        email: {
            type: String,
            default: 'rakellbandeira@gmail.com'
        },
        description: {
            type: String,
            default: 'I\'m Rakell, a passionate software development student focused on creating intuitive and powerful web applications'
        }
    }
);

export default mongoose.model('User', MySchema);