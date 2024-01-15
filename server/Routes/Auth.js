const router = require('express').Router();
const User = require('../Models/User');
const passport = require('passport');

router.route('/register')
    .post(async (req,res)=>{
        const {username,password,email} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).send({message: 'This email is already being used by another account!'});
        }
        const newUser = new User({username,email});
        await User.register(newUser,password, (err,user)=>{
            if(err){
                return res.status(500).send({message: err.message});
            }
            req.login(user, function(err) {
                if (err) {
                    return res.status(500).send({message: err.message});
                }
                return res.status(200).send({message: 'User Created!'});
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