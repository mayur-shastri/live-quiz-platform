const router = require('express').Router();
const Slide = require('../Models/Slide');
const Quiz = require('../Models/Quiz');
const { isLoggedIn, isAuthorized } = require('../Middleware/Auth');
const catchAsync = require('../Utilities/catchAsync');

router.route('/:user_id/:quiz_id/slides')
    .get(isLoggedIn, isAuthorized, catchAsync(async (req, res) => {
        const { quiz_id } = req.params;
        const quiz = await Quiz.findById(quiz_id).populate('slides');
        console.log(quiz.slides);
        if (quiz) {
            const userSlides = quiz.slides;
            if (userSlides) {
                res.status(200).send({ slides: userSlides });
            } else {
                res.status(404).send({ message: "Slides not found" });
            }
        } else {
            res.status(404).send({ message: "Quiz not found" });
        }
    }))
    .put(isLoggedIn, isAuthorized, catchAsync(async (req, res) => {
        const { user_id, quiz_id } = req.params;
        const { slides } = req.body;
        const quiz = await Quiz.findById(quiz_id).populate('slides');
        const slideIdSet = new Set(slides.map((slide) => {
            return slide.id.toString();
        }));
        const deletedSlides = quiz.slides.filter((slide) => {
            return !slideIdSet.has(slide.id.toString());
        });
        const deletedSlideIds = new Set(deletedSlides.map((slide) => {
            return slide.id.toString();
        }));
        try {
            if (quiz) {
                // for (let slideId of deletedSlideIds) {
                //     const result = await Slide.deleteOne({ id: slideId });
                // } //delete slides that are not present in the slides array
                const result = await Slide.deleteMany({id: {$in: Array.from(deletedSlideIds)}});
                quiz.slides = quiz.slides.map((slide) => {
                    return slide._id;
                });
                quiz.slides = quiz.slides.filter((slideId) => {
                    if (!deletedSlideIds.has(slideId)) {
                        return slideId;
                    }
                }); //remove reference to deleted slides from quiz.slides
                await quiz.save();
                for (let slide of slides) {
                    const slideDoc = await Slide.findOne({ id: slide.id });
                    if (slideDoc) {
                        slideDoc.selectedSlideType = slide.selectedSlideType;
                        slideDoc.options = slide.options;
                        slideDoc.question = slide.question;
                        slideDoc.selectedLayoutButton = slide.selectedLayoutButton;
                        slideDoc.imageUrl = slide.imageUrl;
                        slideDoc.textColor = slide.textColor;
                        slideDoc.backgroundColor = slide.backgroundColor;
                        await slideDoc.save(); //save changes to existing slides
                    } else {
                        const newSlide = new Slide(slide);
                        await newSlide.save(); //create new slides
                        quiz.slides.push(newSlide._id);
                        await quiz.save(); //add new slides to quiz.slides
                    }
                }
                res.status(200).send({ message: "Slides updated" });
            } else {
                res.status(404).send({ message: "Quiz not found" });
            }
        } catch (e) {
            res.status(500).send({ message: "Internal Server Error" });
        }
    }));

module.exports = router;