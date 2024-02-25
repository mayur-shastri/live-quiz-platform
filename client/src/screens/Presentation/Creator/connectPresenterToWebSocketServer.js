const connectPresenterToWebSocketServer = (user_id, quiz_id,
    setNumParticipants, setCurrentSlideData, navigate, setSlidesLength) => {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:3000/presenter');

        const payLoad = {
            method: "initializePresenter",
            // user_id: localStorage.getItem('userId'),
            // quiz_id: localStorage.getItem('quizId'),
            user_id: user_id,
            quiz_id: quiz_id,
        }

        ws.onopen = () => {
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
            if(parsedMessage.method === "numParticipants" || parsedMessage.method === "established"){
                setNumParticipants(parsedMessage.numParticipants);
            }
            if(parsedMessage.method === "start"){
                console.log("start");
                const firstSlide = parsedMessage.firstSlide;
                const slidesLength = parsedMessage.slidesLength;
                console.log(firstSlide);
                setCurrentSlideData(firstSlide);
                setSlidesLength(slidesLength);
                navigate('/presenter/presentation', {state: {roomCode: null, userId: null}});
            }
            if(parsedMessage.method === "slideChange"){
                console.log("slideChange");
                const slideData = parsedMessage.slideData;
                setCurrentSlideData(slideData);
            }
            if(parsedMessage.method === "refreshed"){
                console.log("refreshed");
                const slideData = parsedMessage.slideData;
                setCurrentSlideData(slideData);
            }
        }

        ws.onclose = () => {
            console.log("closed");
        }
    });
}

export { connectPresenterToWebSocketServer };