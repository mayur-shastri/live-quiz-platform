const router = require('express').Router();
const Quiz = require('../Models/Quiz');
const User = require('../Models/User');
const Slide = require('../Models/Slide');
const { v4: uuid, } = require('uuid');
const { isLoggedIn, isAuthorized } = require('../Middleware/Auth');
const catchAsync = require('../Utilities/catchAsync');

const generateRoomCode = async () => {
    let roomCode;
    do {
        roomCode = uuid().substring(0, 8);
    } while (await Quiz.exists({ roomCode }));
    return roomCode;
}

router.route('/:user_id/quizzes')
    .get(isLoggedIn, catchAsync(async (req, res) => {
        const { user_id } = req.params;
        const user = await User.findById(user_id).populate('quizzes');
        if (user) {
            res.status(200).send({ quizzes: user.quizzes });
        }
    })) //this data will be used to display the quizzes on the "My quizzes" page.
    .post(isLoggedIn, catchAsync(async (req, res) => {
        const { user_id } = req.params;
        const quiz = new Quiz({
            title: "Untitled Quiz",
            creator: user_id,
            roomCode: await generateRoomCode(),
            creationDateTime: Date.now(),
            lastAccessed: Date.now(),
        });
        const user = await User.findById(user_id);
        user.quizzes.push(quiz._id);
        await quiz.save();
        await user.save();
        res.status(200).send({ quiz_id: quiz._id });

    })); // this data will be used to reroute the user to :user_id/:quiz_id/edit (client side route)

router.route('/:user_id/:quiz_id')
    .delete(isLoggedIn, isAuthorized, catchAsync(async (req, res, next) => {
        const { user_id, quiz_id } = req.params;
        const quiz = await Quiz.findById(quiz_id);
        if(!quiz){
            res.status(404).send({message: 'Quiz not found!', flashType: 'danger'});
        }
        await Slide.deleteMany({ _id: { $in: quiz.slides } });
        const result = await Quiz.findByIdAndDelete(quiz_id);
        if (result) {
            res.status(200).send({ message: 'Quiz deleted successfully!', flashType: 'success' });
        } else {
            res.status(404).send({ message: 'Quiz not found!', flashType: 'danger' });
        }
        next();
    }))
    .post(isLoggedIn, isAuthorized, catchAsync(async (req, res, next) => {
        try {
            const { quiz_id } = req.params;
            const existingQuiz = await Quiz.findById(quiz_id).populate('slides');
            const newQuiz = new Quiz({
                title: existingQuiz.title,
                creator: existingQuiz.creator,
                creationDateTime: Date.now(),
                lastAccessed: Date.now(),
                slides: [],
            });
            for(let slide of existingQuiz.slides){
                const newSlide = new Slide({
                    selectedSlideType: slide.selectedSlideType,
                    id: uuid(),
                    question: slide.question,
                    options: slide.options,
                    selectedLayoutButton: slide.selectedLayoutButton,
                    imageUrl: slide.imageUrl,
                    textColor: slide.textColor,
                    backgroundColor: slide.backgroundColor,
                });
                newQuiz.slides.push(newSlide._id);
            }
            newQuiz.roomCode = await generateRoomCode();
            await newQuiz.save();
            const user = await User.findById(newQuiz.creator);
            user.quizzes.push(newQuiz._id);
            await user.save();
            res.status(200).send({message: 'Quiz duplicated successfully!', flashType: 'success'});
        } catch(e){
            res.status(500).send({message: 'Internal server error!', flashType: 'danger'});
        }
    })); //duplication route

router.route('/:user_id/quizzes/search')
    .get(isLoggedIn, isAuthorized, catchAsync(async (req,res)=>{
        const {user_id} = req.params;
        const {query} = req.body;
        const foundQuizzes = await Quiz.find({
            creator: user_id,
            title: {
                $regex: query,
                $options: 'i', // case insensitive
            }
        });
        if(foundQuizzes){
            res.status(200).send({foundQuizzes, message: 'Some quizzes found!'});
        } else{
            res.status(404).send({message: 'No quizzes found!'});
        }
    }));

router.route('/:quiz_id/creator')
    .get(isLoggedIn, catchAsync(async (req,res)=>{
        const {quiz_id} = req.params;
        const quiz = await Quiz.findById(quiz_id);
        if(quiz){
            const creator = await User.findById(quiz.creator);
            const creatorUsername = creator.username;
            res.status(200).send({creator: creatorUsername});
        } else{
            res.status(404).send({message: 'Quiz not found!'});
        }
    }));

module.exports = router;