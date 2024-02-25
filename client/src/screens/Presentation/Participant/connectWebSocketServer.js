function connectWebSocketServer(roomCode, userId, setWs, currentSlideData, setCurrentSlideData, navigate) {
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
                setCurrentSlideData(firstSlide);
                navigate('presentation', {state: {roomCode: roomCode, userId: userId}});
            }
            if(parsedMessage.method === "slideChange"){
                console.log("slideChange");
                // if(currentSlideData.selectedSlideType === ){

                // } else if()
                // kuch aisa karna chahiye ki presenter button dabayegatabhi question
                // open hoga, aur jab dusra button dabayega to question ke liye responses
                // disable ho jayenge
                const slideData = parsedMessage.slideData;
                setCurrentSlideData(slideData);
                
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