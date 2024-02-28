const mongoose = require('mongoose');

const QuizSessionSchema = mongoose.Schema({
    quizId: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    responses: [{
        userId: {
            type: String,
            required: true,
        },
        questionType: String,
        optionId: String,
        optionIds: [String],
        typedAnswer: String,
        slideId: {
            type: String,
            required: true,
        }
    }],
    
    // results: something
});

const QuizSession = mongoose.model('quizsession',QuizSessionSchema);

module.exports = QuizSession;