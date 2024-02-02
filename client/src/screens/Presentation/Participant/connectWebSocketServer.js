function connectWebSocketServer(roomCode, userId) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:3000/participant');

        const payLoad = {
            method: "initializeParticipant",
            user_id: userId,
            roomCode: roomCode,
        }

        ws.onopen = () => {
            console.log("********connected********");
            try {
                ws.send(JSON.stringify(payLoad));
            } catch (e) {
                console.log(e);
            }
        }
        ws.onmessage = (message) => {
            const parsedMessage = JSON.parse(message.data);
            console.log(parsedMessage);
        }
        ws.onclose = () => {
            console.log(num);
            console.log("closed");
        }
        ws.onerror = (error) => {
            console.log(error);
        }
    })
} 

export {connectWebSocketServer};