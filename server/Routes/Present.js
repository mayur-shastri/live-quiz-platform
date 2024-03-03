const mongoose = require('mongoose');
const router = require('express').Router();
const Quiz = require('../Models/Quiz');
const QuizSession = require('../Models/QuizSession');
const User = require('../Models/User');

let activeRooms = {};


router.get('/debug/:roomCode/activeRooms', (req, res) => {
    const { roomCode } = req.params;
    res.send({ ...activeRooms[roomCode].participants });
});

router.ws('/presenter', (ws, req) => {

    let room_code = null;
    let quiz_data = null;

    const dummyData = {
        text: "This is a dummy message for the presenter",
    }

    ws.on('message', async (message) => {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        if (parsedMessage.method === "initializePresenter") {
            const quiz = await Quiz.findById(parsedMessage.quiz_id).populate('slides');
            quiz_data = quiz;
            console.log("Recieved quiz from presenter LOLOL");
            const roomCode = quiz.roomCode;
            room_code = roomCode;
            if (activeRooms[roomCode]) {
                activeRooms[roomCode].connection = ws;
                console.log("Presenter reconnected!");
                ws.send(JSON.stringify({ method: "established", numParticipants: activeRooms[roomCode].participants.length }));
            }
            else {
                const quizSession = new QuizSession({
                    quizId: quiz_data._id,
                    dateTime: Date.now(),
                });
                await quizSession.save();
                activeRooms[roomCode] = {
                    connection: ws,
                    quiz_id: parsedMessage.quiz_id,
                    creator_id: parsedMessage.user_id,
                    quiz_session: quizSession._id,
                    participants: [],
                    activeSlideNumber: 0,
                } // might change later
            }
        }
        if (parsedMessage.method === "start") {
            const participants = activeRooms[room_code].participants;
            activeRooms[room_code].activeSlideNumber = 0;
            // const participantSlideData = {...quiz_data.slides[0]};
            // if(participantSlideData.options){
            //     participantSlideData.options = participantSlideData.options.map((option)=>{return {...option, correct: null}});
            // }
            // console.log("participantData", participantSlideData.options);
            participants.forEach((participant) => {
                participant.connection.send(JSON.stringify({ method: "start", firstSlide: quiz_data.slides[0] }));
            });
            console.log("Slides Length: ", quiz_data.slides.length);
            ws.send(JSON.stringify({
                method: "start",
                firstSlide: quiz_data.slides[0],
                slidesLength: quiz_data.slides.length,
                quizSessionId: activeRooms[room_code].quiz_session
            }));
        }
        if (parsedMessage.method === "slideChange") {
            const currentSlideNumber = parsedMessage.currentSlideNumber;
            activeRooms[room_code].activeSlideNumber = currentSlideNumber;
            const participants = activeRooms[room_code].participants;
            // const participantSlideData = {...quiz_data.slides[currentSlideNumber]};
            // if(participantSlideData.options){
            //     participantSlideData.options = participantSlideData.options.map((option)=>{return {...option, correct: null}});
            // }
            participants.forEach((participant) => {
                participant.connection.send(JSON.stringify({ method: "slideChange", slideData: quiz_data.slides[currentSlideNumber] }));
            });
            ws.send(JSON.stringify({ method: "slideChange", slideData: quiz_data.slides[currentSlideNumber] }));
        }
        if (parsedMessage.method === "takeResponses") {
            //...
            const participants = activeRooms[room_code].participants;
            participants.forEach((participant) => {
                participant.connection.send(JSON.stringify({ method: "takeResponses" }));
            });
        }
        if (parsedMessage.method === "resetResponses") {
            //...
        }
        if (parsedMessage.method === "stopResponses") {
            const participants = activeRooms[room_code].participants;
            participants.forEach((participant) => {
                participant.connection.send(JSON.stringify({ method: "stopResponses" }));
            });
        }
        // if(parsedMessage.method === "refreshed"){
        //     const currentSlideNumber = parsedMessage.currentSlideNumber;
        //     console.log("Refreshed", currentSlideNumber);
        //     ws.send(JSON.stringify({method: "slideChange", slideData: quiz_data.slides[currentSlideNumber]}));
        // }
        if (parsedMessage.method === "endPresentation") {
            const closePromises = activeRooms[room_code].participants.map((participant) => {
                return new Promise((resolve) => {
                    participant.connection.send(JSON.stringify({ method: "endPresentation" }));
                    participant.connection.on('close', resolve);
                    participant.connection.close();
                });
            });
            Promise.all(closePromises).then(() => {
                delete activeRooms[room_code];
                ws.close();
            });
        }
    });

    ws.send(JSON.stringify(dummyData));

    ws.on('close', () => {
        console.log('Presenter disconnected!');
    });
});

router.ws('/participant', (ws, req) => {

    let room_code = null;
    let fullyEstablished = false;
    let userId = null;

    ws.on('message', async function incoming(message) {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        if (parsedMessage.method === "initializeParticipant") {
            const roomCode = parsedMessage.roomCode;
            userId = parsedMessage.user_id;
            room_code = roomCode;
            console.log(room_code);
            if (activeRooms[roomCode]) {
                const participantData = {
                    connection: ws,
                    user_id: parsedMessage.user_id,
                }
                activeRooms[roomCode].participants.push(participantData);
                const user = await User.findById(parsedMessage.user_id);
                const quizSessionObjectId = new mongoose.Types.ObjectId(activeRooms[roomCode].quiz_session);
                const isParticipationAdded = user.participations.find((participation) => {
                    if (participation._id.equals(quizSessionObjectId)) {
                        return true;
                    }
                });
                if (!isParticipationAdded) {
                    user.participations.push(quizSessionObjectId);
                    await user.save();
                }
            }
            const numParticipants = activeRooms[roomCode].participants.length;
            activeRooms[roomCode].connection.send(JSON.stringify({ method: "numParticipants", numParticipants: numParticipants }));
            fullyEstablished = true;
        }
        if (parsedMessage.method === "response") {
            const questionType = parsedMessage.questionType;
            if (questionType === "Single Correct MCQ") {
                const optionId = parsedMessage.option;
                const slideId = parsedMessage.slideId;
                const quizSession = await QuizSession.findById(activeRooms[room_code].quiz_session);
                quizSession.responses.push({
                    userId: userId,
                    questionType: questionType,
                    optionId: optionId,
                    slideId: slideId,
                });
                await quizSession.save();
            } else if (questionType === "Multiple Correct MCQ") {
                const optionIds = parsedMessage.options;
                const slideId = parsedMessage.slideId;
                const quizSession = await QuizSession.findById(activeRooms[room_code].quiz_session);
                quizSession.responses.push({
                    userId: userId,
                    questionType: questionType,
                    optionIds: optionIds,
                    slideId: slideId,
                });
                await quizSession.save();
            } else if (questionType === "Descriptive Answer") {
                const typedAnswer = parsedMessage.answer;
                console.log("Typed Answer: ", typedAnswer);
                const slideId = parsedMessage.slideId;
                const quizSession = await QuizSession.findById(activeRooms[room_code].quiz_session);
                quizSession.responses.push({
                    userId: userId,
                    questionType: questionType,
                    typedAnswer: typedAnswer,
                    slideId: slideId,
                });
                await quizSession.save();
            }
        }
    });

    ws.on('close', () => {
        console.log(`Participant disconnected!`);
        if (fullyEstablished) {
            activeRooms[room_code].participants = activeRooms[room_code].participants.filter((participant) => {
                return participant.connection !== ws;
            });
            const numParticipants = activeRooms[room_code].participants.length;
            activeRooms[room_code].connection.send(JSON.stringify(
                { method: "numParticipants", numParticipants: numParticipants }));
        }

    });

    const dummyData = {
        text: "This is a dummy message for the participant",
    }

    ws.send(JSON.stringify(dummyData));
});

module.exports = router;