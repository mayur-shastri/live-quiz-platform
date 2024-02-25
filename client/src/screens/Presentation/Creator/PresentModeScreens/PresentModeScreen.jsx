import React, { useContext, useEffect, useRef, useState } from 'react'
import SlideView from './SlideView';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton'
import RealTimeDataContext from '../../../../context providers/RealTimeData (presenter)/RealTimeDataContext';
import QuizContext from '../../../EditQuiz/Context Provider/QuizContext';

function PresentModeScreen() {

    const [showControls, setShowControls] = useState(true);
    const {currentSlideNumber, setCurrentSlideNumber, ws, currentSlideData, slidesLength} = useContext(RealTimeDataContext);
    // const currentSlideNumberRef = useRef(currentSlideNumber);

    useEffect(()=>{
        setCurrentSlideNumber(0);
    }, []);

    useEffect(()=>{
        // console.log("Current slide number Ref: ", currentSlideNumberRef.current);
        console.log("Current slide number: ", currentSlideNumber);
        console.log("Current slide data: ", currentSlideData);
        // currentSlideNumberRef.current = currentSlideNumber;
    }, [currentSlideNumber]);

    useEffect(()=>{
        document.addEventListener('keydown', function (e) {
            if (e.key === 'f' || e.key === 'F') {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                    document.documentElement.msRequestFullscreen();
                }
            }
        });
    
        // document.addEventListener('mousemove', function (e) {
        //     setShowControls(true);
        //     setTimeout(() => {
        //         setShowControls(false);
        //     }, 10000);
        // });
    }, []);

    const prev = () => {
        setCurrentSlideNumber((currentNumber) => {
            if (currentNumber === 0) {
                ws.send(JSON.stringify({ method: "slideChange", currentSlideNumber: currentSlideNumber}));
                return currentNumber;
            }
            ws.send(JSON.stringify({ method: "slideChange", currentSlideNumber: currentSlideNumber - 1}));
            return currentNumber - 1;
        });
    }

    const next = () => {
        setCurrentSlideNumber((currentNumber)=>{
            console.log("Length: ", slidesLength);
            if(currentNumber === slidesLength-1){
                ws.send(JSON.stringify({ method: "slideChange", currentSlideNumber: currentSlideNumber }));
                return currentNumber;
            }
            ws.send(JSON.stringify({ method: "slideChange", currentSlideNumber: currentSlideNumber + 1}));
            return currentNumber+1;
        });
    }


    return (
        <div className='flex flex-row w-100 h-screen'>
            <SlideView slide={currentSlideData} />
            {showControls && (
                <>
                    <IconButton aria-label="" onClick={prev}
                        sx={{
                            transition: 'opacity 0.5s ease-out',
                            '&:hover': {
                                opacity: 1
                            }
                            ,
                            position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)'
                        }}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton aria-label="" onClick={next}
                        sx={{
                            transition: 'opacity 0.5s ease-out',
                            '&:hover': {
                                opacity: 1
                            },
                            position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)'
                        }}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </>
            )}
        </div>
    );
}

export default PresentModeScreen;