const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
            slideType: {
                type: String,
                enum: ["singleMCQ","multipleMCQ","descriptive",],
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            // For option type slides
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
                        },
                        optionImageUrl: {
                            type: String,
                        },
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
            imageUrl: {
                type: String,
            },
});

const Slide = mongoose.model('slide',SlideSchema);

module.exports = Slide;