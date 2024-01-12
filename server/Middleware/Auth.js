const isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    } else{
        res.status(401).send({message: "You aren't logged in!"});
    }
}

module.exports = {isLoggedIn};