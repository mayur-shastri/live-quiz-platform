const mongoose = require('mongoose');

// Questions can have only 4 options
const validateOptions = (options)=>{
    return options.length === 4;
}

const QuizSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true,
    },
    questions: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'question',
            }
        ],
        validate: validateOptions,
    }
});

const Quiz = mongoose.model('quiz', QuizSchema);

module.exports = Quiz;