const router = require('express').Router();
const {isLoggedIn} = require('../Middleware/Auth');
const User = require('../Models/User');
const catchAsync = require('../Utilities/catchAsync');

router.route('/userdata')
    .get(isLoggedIn, catchAsync(async (req,res)=>{
        const id = req.user._id;
        const user = await User.findById(id).populate('quizzes');
        if(user){
            res.status(200).send({ user: user});
        } else{
            res.status(401).send({ message: 'Not logged in!' });
        }
    }));

module.exports = router;