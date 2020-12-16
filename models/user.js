let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: 'none'
    }
});

module.exports = mongoose.model('User', userSchema);