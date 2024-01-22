const router = require('express').Router();
const Slide = require('../Models/Slide');
const Quiz = require('../Models/Quiz');
const { isLoggedIn, isAuthorized } = require('../Middleware/Auth');

router.route('/:user_id/:quiz_id/slides')
    .get(isLoggedIn, isAuthorized, async (req, res) => {
        const { quiz_id } = req.params;
        const quiz = await Quiz.findById(quiz_id).populate('slides');
        if (quiz) {
            const userSlides = quiz.slides;
            // console.log(userSlides);
            if (userSlides) {
                res.status(200).send({ slides: userSlides });
            } else {
                res.status(404).send({ message: "Slides not found" });
            }
        } else {
            res.status(404).send({ message: "Quiz not found" });
        }
    })
    .put(isLoggedIn, isAuthorized, async (req,res)=>{
        const { user_id, quiz_id } = req.params;
        const { slides } = req.body;
        const quiz = await Quiz.findById(quiz_id);
        console.log("******Slides recieved******");
        console.log(slides);
        /*
        slides contains 1) new slides
                        2) edited slides
        slides doesn't contain deleted slides
        */
        const deletedSlideIds = new Set();
        try{
            if(quiz){
                for(let slide of slides){
                    const slideDoc = await Slide.findOne({id: slide.id});
                    if(slideDoc){
                        slideDoc.selectedSlideType = slide.selectedSlideType;
                        slideDoc.options = slide.options;
                        slideDoc.question = slide.question;
                        slideDoc.selectedLayoutButton = slide.selectedLayoutButton;
                        slideDoc.imageUrl = slide.imageUrl;
                        slideDoc.textColor = slide.textColor;
                        slideDoc.backgroundColor = slide.backgroundColor;
                        await slideDoc.save();
                    } else{
                        const newSlide = new Slide(slide);
                        await newSlide.save();
                        quiz.slides.push(newSlide._id);
                        await quiz.save();
                    }
                }
            } else{
                res.status(404).send({ message: "Quiz not found" });
            }
        } catch(e){
            res.status(500).send({message: "Internal Server Error"});
        }
    });

module.exports = router;


// .put(isLoggedIn, isAuthorized, async (req, res) => {
//     const { user_id, quiz_id } = req.params;
//     const { slides } = req.body;
//     const quiz = await Quiz.findById(quiz_id);
//     const slideIds = new Set(
//         slides.map((slide) => {
//             return slide._id;
//         })
//     );
//     const deletedSlideIds = new Set();
//     if (quiz) {
//         try {
//             for (let slide of slides) {
//                 const slideDoc = await Slide.findById(slide._id);
//                 if (slideDoc) {
//                     Object.assign(slideDoc, slide);
//                     console.log("************");
//                     console.log("Edited Existing Slide",slideDoc);
//                     console.log("************");
//                     await slideDoc.save();
//                 } else {
//                     const newSlide = new Slide(slide);
//                     await newSlide.save();
//                     quiz.slides.push(newSlide._id);
//                     console.log("************");
//                     console.log("New Slide",newSlide);
//                     console.log("************");
//                     await quiz.save();
//                 }
//             }
//             for (let slideId of quiz.slides) {
//                 if (!slideIds.has(slideId)) {
//                     deletedSlideIds.add(slideId);
//                 }
//             }
//             quiz.slides = quiz.slides.filter((slideId) => {
//                 return !deletedSlideIds.has(slideId);
//             });
//             await quiz.save();
//             console.log("Done saving");
//             res.status(200).send({ message: "Slides updated successfully" });
//         } catch (e) {
//             console.log(e);
//             res.status(500).send({ message: "Internal Server Error" });
//         }
//     } else {
//         res.status(404).send({ message: "Quiz not found" });
//     }
// }); // this route will be used to update the slide

// .put(isLoggedIn, isAuthorized, async (req, res) => {
//     const { user_id, quiz_id } = req.params;
//     const { slides } = req.body;
//     const quiz = await Quiz.findById(quiz_id);
//     const slideIds = new Set(
//         slides.map((slide) => {
//             return slide._id;
//         })
//     );
//     const deletedSlideIds = new Set();
//     if (quiz) {
//         try {
//             for (let slide of slides) {
//                 const slideDoc = await Slide.findById(slide._id);
//                 if (slideDoc) {
//                     slideDoc.selectedSlideType = slide.selectedSlideType;
//                     slideDoc.options = slide.options;
//                     slideDoc.question = slide.question;
//                     slideDoc.selectedLayoutButton = slide.selectedLayoutButton;
//                     slideDoc.imageUrl = slide.imageUrl;
//                     slideDoc.textColor = slide.textColor;
//                     slideDoc.backgroundColor = slide.backgroundColor;
//                     slideDoc.id = slide.id;
//                     // console.log("************");
//                     // console.log("Edited Existing Slide", slideDoc);
//                     // console.log("************");
//                     await slideDoc.save();
//                 } else {
//                     const newSlide = new Slide(slide);
//                     await newSlide.save();
//                     quiz.slides.push(newSlide._id);
//                     // console.log("************");
//                     // console.log("New Slide", newSlide);
//                     // console.log("************");
//                     try{
//                         await quiz.save();
//                         console.log(quiz);
//                     } catch(e){
//                         console.log(e);
//                     }
//                 }
//             }
//             for (let slideId of quiz.slides) {
//                 if (!slideIds.has(slideId)) {
//                     deletedSlideIds.add(slideId);
//                 }
//             }
//             quiz.slides = quiz.slides.filter((slideId) => {
//                 return !deletedSlideIds.has(slideId);
//             });
//             await quiz.save();
//             console.log("Done saving");
//             res.status(200).send({ message: "Slides updated successfully" });
//         } catch (e) {
//             console.log(e);
//             res.status(500).send({ message: "Internal Server Error" });
//         }
//     } else {
//         res.status(404).send({ message: "Quiz not found" });
//     }
// }); // this route will be used to update the slide