let mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');

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
        filename: String,
        base64: String,
        // default: 'img/nophoto.jpg'
    }
});

// userchema.methods.encryptPassword = function(password){
//     return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
// };


// userchema.methods.validPassword = function(password){
//     return bcrypt.compareSync(password,this.password);
// };

module.exports = mongoose.model('User', userSchema);