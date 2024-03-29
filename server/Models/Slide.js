const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    selectedSlideType: {
        type: String,
        // enum: [
        //     // fill this...
        // ],
        required: true,
    },
    question: {
        type: {
            heading: {
                type: String,
                requnired: true,
            },
            description: {
                type: String,
            },
        }
    },
    // For option type slides
    options: {
        type: [
            {
                id: {
                    type: String,
                    required: true,
                },
                value: {
                    type: String,
                    required: true,
                },
                correct: {
                    type: Boolean,
                    required: true,
                }
                // optionImageUrl: {
                //     type: String,
                // },
            }
        ],
        required: false,
    },
    selectedLayoutButton: {
        type: String,
        enum: [
            // fill this...
        ],
        required: false,
    },
    // For descriptive type
    // correctAnswers: [String],
    imageUrl: {
        type: String,
    },
    textColor: {
        type: String,
        required: true,
    },
    backgroundColor : {
        type: String,
        required: true,
    },
});

const Slide = mongoose.model('slide', SlideSchema);

module.exports = Slide;