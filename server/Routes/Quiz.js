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

// 0) /home: client side route to render a dashboard

// 1) /create : client side route that shows the quiz creation form/whatever
/* when the create button is pressed, a post request to /:user_id/quizzes which creates the quiz and responds with
the quiz_id and the user is redirected to :user_id/:quiz_id/edit (client side route) */

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

/* results: how to display? 
1)in mentimeter, votes are immediately rendered on the presenter's screen 
2) Once the presentor clicks on show leaderboard, the leaderboard is shown 
to all the players*/

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
        });
        const user = await User.findById(user_id);
        user.quizzes.push(quiz._id);
        await quiz.save();
        await user.save();
        res.status(200).send({quiz_id: quiz._id});
    }); // this data will be used to reroute the user to :user_id/:quiz_id/edit (client side route)

module.exports = router;