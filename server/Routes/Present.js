const router = require('express').Router();
const Quiz = require('../Models/Quiz');

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
                activeRooms[roomCode] = {
                    connection: ws,
                    quiz_id: parsedMessage.quiz_id,
                    creator_id: parsedMessage.user_id,
                    participants: [],
                } // might change later
                console.log("********");
                console.log(activeRooms[roomCode].quiz_id);
                console.log("********");
            }
        }
        if (parsedMessage.method === "start") {
            const participants = activeRooms[room_code].participants;
            participants.forEach((participant) => {
                participant.connection.send(JSON.stringify({ method: "start", firstSlide: quiz_data.slides[0] }));
            });
        }
        if (parsedMessage.method === "nextSlide") {
            //...
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

    ws.on('message', function incoming(message) {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        if (parsedMessage.method === "initializeParticipant") {
            const roomCode = parsedMessage.roomCode;
            room_code = roomCode;
            console.log(room_code);
            if (activeRooms[roomCode]) {
                const participantData = {
                    connection: ws,
                    user_id: parsedMessage.user_id,
                }
                activeRooms[roomCode].participants.push(participantData);
            }
            const numParticipants = activeRooms[roomCode].participants.length;
            activeRooms[roomCode].connection.send(JSON.stringify({ method: "numParticipants", numParticipants: numParticipants }));
            fullyEstablished = true;
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