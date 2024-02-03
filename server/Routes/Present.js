const router = require('express').Router();
const Quiz = require('../Models/Quiz');

const activeRooms = {};

router.ws('/presenter', (ws, req) => {

    let room_code = null;

    const dummyData = {
        text: "This is a dummy message for the presenter",
    }

    ws.send(JSON.stringify(dummyData));

    ws.on('closed', () => {
        console.log('Presenter disconnected!');
    });

    ws.on('message', async (message) => {
        const parsedMessage = JSON.parse(message);
        // console.log(parsedMessage);
        if (parsedMessage.method === "initializePresenter") {
            const quiz = await Quiz.findById(parsedMessage.quiz_id).populate('slides');
            console.log("Recieved quiz from presenter LOLOL");
            console.log(quiz);
            const roomCode = quiz.roomCode;
            room_code = roomCode;
            activeRooms[roomCode] = {
                connection: ws,
                quiz_id: parsedMessage.quiz_id,
                creator_id: parsedMessage.user_id,
                participants: [],
            } // might change later
        }

    });
});

router.ws('/participant', (ws, req) => {

    let room_code = null;

    ws.on('message', function incoming(message) {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        if (parsedMessage.method === "initializeParticipant") {
            const roomCode = parsedMessage.roomCode;
            room_code = roomCode;
            if (activeRooms[roomCode]) {
                const participantData = {
                    connection: ws,
                    user_id: parsedMessage.user_id,
                }
                activeRooms[roomCode].participants.push(participantData);
            }
            const numParticipants = activeRooms[roomCode].participants.length;
            activeRooms[roomCode].connection.send(JSON.stringify({ method: "numParticipants", numParticipants: numParticipants }));
            // console.log(activeRooms);
        }
    });

    ws.on('close', () => {
        console.log(`Participant disconnected!`);
        activeRooms[room_code].participants = activeRooms[room_code].participants.filter((participant)=>{
            return participant.connection !== ws;
        });
        const numParticipants = activeRooms[room_code].participants.length;
        activeRooms[room_code].connection.send(JSON.stringify(
            { method: "numParticipants", numParticipants: numParticipants }));
    });

    const dummyData = {
        text: "This is a dummy message for the participant",
    }

    ws.send(JSON.stringify(dummyData));
});

module.exports = router;