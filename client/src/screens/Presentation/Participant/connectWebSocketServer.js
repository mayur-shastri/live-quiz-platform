function connectWebSocketServer(roomCode, userId, setWs, currentSlideData, 
    setCurrentSlideData, navigate, setTakeResponses, setResetResponses) {
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
                resolve(ws);
            } catch (e) {
                console.log(e);
            }
        }
        ws.onmessage = (message) => {
            const parsedMessage = JSON.parse(message.data);
            console.log(parsedMessage);
            if(parsedMessage.method === "start"){
                console.log("start");
                const firstSlide = parsedMessage.firstSlide;
                console.log("First Slide", firstSlide);
                setCurrentSlideData(firstSlide);
                navigate('presentation', {state: {roomCode: roomCode, userId: userId}});
            }
            if(parsedMessage.method === "slideChange"){
                setTakeResponses(false);
                setResetResponses(false);
                const slideData = parsedMessage.slideData;
                console.log("slideChange", slideData);
                setCurrentSlideData(slideData);
            }
            if(parsedMessage.method === "takeResponses"){
                setTakeResponses(true);
                setResetResponses(false);
            }
            if(parsedMessage.method === "resetResponses"){
                setResetResponses(true);
            }
            if(parsedMessage.method === "stopResponses"){
                setTakeResponses(false);
                setResetResponses(false);
            }
            if(parsedMessage.method === "endPresentation"){
                setTakeResponses(false);
                setResetResponses(false);
                navigate('/end', {state: {navigatedAs: "participant"}});
            }
        }
        ws.onclose = () => {
            console.log("closed");
        }
        ws.onerror = (error) => {
            console.log(error);
        }
    });
}

export {connectWebSocketServer};