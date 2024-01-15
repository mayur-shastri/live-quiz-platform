const router = require('express').Router();
const {isLoggedIn} = require('../Middleware/Auth');

router.route('/userdata')
    .get(isLoggedIn, async (req,res)=>{
        if(req.user){
            res.status(200).send({ user: req.user});
        } else{
            res.status(401).send({ message: 'Not logged in!' });
        }
    });

module.exports = router;