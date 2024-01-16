const router = require('express').Router();
const Quiz = require('../Models/Quiz');
const User = require('../Models/User');
const { v4: uuid, } = require('uuid');

const generateRoomCode = async ()=>{
    let roomCode;
    do{
        roomCode = uuid().substring(0,8);
    } while(await Quiz.exists({roomCode}));
    return roomCode;
}

/* Game plan */

// 0) /home: client side route to render a dashboard (done)

// 1) /create : client side route that shows the quiz creation form/whatever
/* when the create button is pressed, a post request to /:user_id/quizzes which creates the quiz and responds with
the quiz_id and the user is redirected to :user_id/:quiz_id/edit (client side route) (done)  */

// 1.5) complete the EditQuiz component

/*
    roomCode expiration logic:
    note the timeStamp of creation of first slide/question
    when a user tries to join a room using a roomCode, check if it has been >=2 days since
    the stored timeStamp. if yes, then joining not allowed until creator generates a new 
    room code using some button.
    Note: try making it work for different timezones
*/

// 2) /join: client side route that renders a form to enter a roomCode and send a 
// post request to /join/:roomCode

// 3) /quizzes: cient side route that renders a grid-view of all the quizzes created 
// by the user. (needs a server-side get route to /:user_id/quizzes for fetching image, title of the presentation)
// (done)

/* How the quiz works:
    0) A waiting screen is shown to the presenter with a start quiz button.
    until the start button is pressed, participants can join the room using the roomCode
    1) For every question slide, a leaderboard slide is created
    2) When the presenter clicks on the next button, the leaderboard slide is shown
    3) When the presenter clicks on the next button again, the next question slide is shown
    4) When the presenter clicks on the next button, updated leaderboard is shown with the new scores
    5) When previous button is clicked, the leaderboard is shown in its previous state
    6) When the presenter clicks on the end quiz button, the quiz ends and the final leaderboard is shown
*/

router.route('/:user_id/quizzes')
    .get(async (req,res)=>{
        const {user_id} = req.params;
        const user = await User.findById(user_id).populate('quizzes');
        if(user){
            res.status(200).send({quizzes: user.quizzes});
        }
    }) //this data will be used to display the quizzes on the "My quizzes" page.
    .post(async (req,res)=>{
        const {user_id} = req.params;
        
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
        res.status(200).send({quiz_id: quiz._id});
        
    }); // this data will be used to reroute the user to :user_id/:quiz_id/edit (client side route)

module.exports = router;