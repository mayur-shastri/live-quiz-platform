const connectPresenterToWebSocketServer = () => {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:3000/presenter');

        ws.onopen = () => {
            try {
                ws.send(JSON.stringify({ message: "Hello. I am the presenter" }));
            } catch (e) {
                console.log(e);
            }
        }
        ws.onmessage = (message) => {
            const parsedMessage = JSON.parse(message.data);
            console.log(parsedMessage);
        }
        ws.onclose = () => {
            console.log("closed");
        }
    })
}

export { connectPresenterToWebSocketServer };