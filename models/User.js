const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Export the model (NOT the schema!)
const User = mongoose.model('User', userSchema);
module.exports = User;
