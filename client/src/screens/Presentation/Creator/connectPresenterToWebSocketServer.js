const connectPresenterToWebSocketServer = (user_id, quiz_id,
    setNumParticipants, setCurrentSlideData, navigate, setSlidesLength,
    currentSlideNumber, setQuizSessionId) => {
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
                // if(localStorage.getItem(`presenter-${quiz_id}`)){
                //     ws.send(JSON.stringify({...payLoad, currentSlideNumber: currentSlideNumber, method: "refreshed"}));
                // } else{
                    ws.send(JSON.stringify(payLoad));
                // }
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
                const quizSessionId = parsedMessage.quizSessionId;
                console.log(firstSlide);
                setCurrentSlideData(firstSlide);
                setSlidesLength(slidesLength);
                setQuizSessionId(quizSessionId);
                navigate('/presenter/presentation', {state: {roomCode: null, userId: null}});
            }
            if(parsedMessage.method === "slideChange"){
                console.log("slideChange");
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