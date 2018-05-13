const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for users login information and posted images
const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    img: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
