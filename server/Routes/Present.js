const router = require('express').Router();

router.ws('/presenter', (ws, req) => {

    const dummyData = {
        text: "This is a dummy message for the presenter",
    }

    ws.send(JSON.stringify(dummyData));

    ws.on('closed', () => {
        console.log('Presenter disconnected!');
    });

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
    });
});

router.ws('/participant', (ws, req) => {

    // const {roomCode} = req.params;
    // console.log(roomCode);

    ws.on('message', function incoming(message) {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
    });

    ws.on('close', () => {
        console.log(`Participant disconnected!`);
    });

    const dummyData = {
        text: "This is a dummy message for the participant",
    }

    ws.send(JSON.stringify(dummyData));
});

module.exports = router;