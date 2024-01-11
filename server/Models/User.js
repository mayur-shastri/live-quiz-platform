const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    // Google authentication
    // googleId: {
    //     type: String,
    //     required: true,
    // },
    
    // Local authentication
    email: {
        type: String,
        required: true,
    }
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user', UserSchema);

module.exports = User;