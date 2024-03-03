const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    // Google authentication
    // googleId: {
    //     type: String,
    //     required: true,
    // },
    email: {
        type: String,
        required: true,
    },
    quizzes: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'quiz',
            }
        ],
        required: false,
    },
    participations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quizsession',
        }
    ]
});

UserSchema.plugin(passportLocalMongoose); // Local authentication

const User = mongoose.model('user', UserSchema);

module.exports = User;