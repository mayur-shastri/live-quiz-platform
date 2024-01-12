const router = require('express').Router();
const User = require('../Models/User');
const passport = require('passport');

router.route('/register')
    .post(async (req,res)=>{
        const {username,password,email} = req.body;
        const newUser = User({username,email});
        await User.register(newUser,password,(err,user)=>{
            if(err){
                return res.status(500).send(err.message);
            }
            req.login(user, function(err) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                return res.status(200).send(`registered and logged in: ${user}`);
            });
        });
    });

router.route('/login')
    .post(passport.authenticate('local') ,(req,res)=>{
        if(req.user){
            res.status(200).send({ message: 'Login successful!' });
        } else{
            res.status(401).send({ message: 'Login failed!' });
        } // the responses sent should be used to flash messages on the client side
    });

module.exports = router;