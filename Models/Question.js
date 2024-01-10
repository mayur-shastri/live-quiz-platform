const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
            questionType: {
                type: String,
                enum: ["singleMCQ","multipleMCQ","descriptive"],
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            // For option type questions
            options: {
                type: [
                    {
                        option_id: {
                            type: String,
                            required: true,
                        },
                        optionValue: {
                            type: String,
                            required: true,
                        }
                    }
                ],
                validate: validateOptions,
                required: false,
            },
            correctOptionIndex: {
                type: Number,
            },
            // For descriptive type
            correctAnswers: [String],
});

const Question = mongoose.model(QuestionSchema);

module.exports = Question;