const mongoose = require('mongoose');

const MySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: 'Rakell Bandeira'
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

module.exports = mongoose.model('User', MySchema);