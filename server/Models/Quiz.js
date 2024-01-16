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
    },// set this when the first slide is created. this will be used to track expiry of room code
    lastAccessed: {
        type: Date,
        default: Date.now(), // should be time of creation
    }, // store the last time creator hit the edit endpoint of the quiz
    
});

const Quiz = mongoose.model('quiz', QuizSchema);

module.exports = Quiz;