let mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1/mongoose_test");

let userSchema = new Schema({
    name: {
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
        filename: String,
        base64: String,
        default: 'img/nophoto.jpg'
    }
});

module.exports = mongoose.model('User', userSchema);