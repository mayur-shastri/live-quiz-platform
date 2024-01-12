const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    roomCode: {
        type: String,
        required: true,
    }, // must be unique and expires in 2 days
    slides: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'slide',
            }
        ],
        required: false,
    },
    creationDateTime: {
        type: Date,
        default: Date.now(), 
    },
    firstSlideCreationTime: {
        type: Date,
        default: null,
    } // set this when the first slide is created. this will be used to track expiry of room code
});

const Quiz = mongoose.model('quiz', QuizSchema);

module.exports = Quiz;