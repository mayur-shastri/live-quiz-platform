function connectWebSocketServer() {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:3000/participant');
        const num = Math.floor(Math.random() * 100);
        ws.onopen = () => {
            console.log("********connected********");
            try {
                ws.send(JSON.stringify({ message: "Hello", num }));
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