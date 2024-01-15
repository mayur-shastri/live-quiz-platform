const express = require("express");
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
 
const AuthRoutes = require('./Routes/Auth');
const QuizRoutes = require('./Routes/Quiz');
const UserRoutes = require('./Routes/User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./Models/User');
const session = require('express-session');

const sessionConfig = {
    secret: 'replace-with-a-real-secret',
    resave: false,
    saveUninitialized: false,
    name: 'session',
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*60*24*7, // 1 week
        expires: Date.now() + 1000*60*60*24*7,
    }
}

app.use(session(sessionConfig));
app.use(passport.session());
app.use(passport.initialize());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/live-quiz-app')
    .then(()=>console.log('Connected to MongoDB'))
    .catch(err=>console.log(err));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.use('/',AuthRoutes);
app.use('/',QuizRoutes);
app.use('/',UserRoutes);

app.get('/',(req,res)=>{
    res.send({greeting: "Hello World"});
});

const port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});