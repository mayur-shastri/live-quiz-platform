const connectPresenterToWebSocketServer = (user_id,quiz_id, setNumParticipants) => {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:3000/presenter');

        const payLoad = {
            method: "initializePresenter",
            user_id: user_id,
            quiz_id: quiz_id,
        }

        ws.onopen = () => {
            try {
                ws.send(JSON.stringify(payLoad));
            } catch (e) {
                console.log(e);
            }
        }

        ws.onmessage = (message) => {
            const parsedMessage = JSON.parse(message.data);
            console.log(parsedMessage);
            if(parsedMessage.method === "numParticipants"){
                setNumParticipants(parsedMessage.numParticipants);
            }
        }

        ws.onclose = () => {
            console.log("closed");
        }
    });
}

export { connectPresenterToWebSocketServer };