import React, { useContext, useEffect, useRef, useState } from 'react'
import SlideView from './SlideView';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton'
import RealTimeDataContext from '../../../../context providers/RealTimeData (presenter)/RealTimeDataContext';
import { Button } from '@mui/material';
import LeaderboardSlide from './LeaderboardSlide';
import { instance as configuredAxios } from '../../../../axiosConfig';
import ResultsChart from './ResultsChart';

function invertColor(rgbColor) {
    const colorParts = rgbColor.match(/\d+/g);
    const invertedColorParts = colorParts.map(part => 255 - parseInt(part));
    const invertedColor = `rgb(${invertedColorParts.join(", ")})`;
    return invertedColor;
}

function PresentModeScreen() {

    const [showControls, setShowControls] = useState(true);
    const { currentSlideNumber, setCurrentSlideNumber,
        ws, currentSlideData, slidesLength, quizSessionId } = useContext(RealTimeDataContext);
    // const currentSlideNumberRef = useRef(currentSlideNumber);
    const [style, setStyle] = useState({ width: '180px', });
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);
    useEffect(() => {
        setCurrentSlideNumber(0);
    }, []);

    useEffect(() => {
        // console.log("Current slide number Ref: ", currentSlideNumberRef.current);
        console.log("Current slide number: ", currentSlideNumber);
        console.log("Current slide data: ", currentSlideData);
        // currentSlideNumberRef.current = currentSlideNumber;
    }, [currentSlideNumber]);

    useEffect(() => {
        console.log("Color badlo chalo");
        setStyle((currentStyle) => {
            console.log(currentSlideData.backgroundColor);
            console.log(invertColor(currentSlideData.backgroundColor));
            return {
                ...currentStyle,
                color: invertColor(currentSlideData.backgroundColor),
                //    color: 'white', 
            };
        });
    }, [currentSlideData]);

    useEffect(() => {
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
        setShowResults(false);
        setCurrentSlideNumber((currentNumber) => {
            if (currentNumber === 0) {
                ws.send(JSON.stringify({ method: "slideChange", currentSlideNumber: currentSlideNumber }));
                return currentNumber;
            }
            ws.send(JSON.stringify({ method: "slideChange", currentSlideNumber: currentSlideNumber - 1 }));
            return currentNumber - 1;
        });
    }

    const next = () => {
        setShowResults(false);
        setCurrentSlideNumber((currentNumber) => {
            console.log("Length: ", slidesLength);
            if (currentNumber === slidesLength - 1) {
                ws.send(JSON.stringify({ method: "slideChange", currentSlideNumber: currentSlideNumber }));
                return currentNumber;
            }
            ws.send(JSON.stringify({ method: "slideChange", currentSlideNumber: currentSlideNumber + 1 }));
            return currentNumber + 1;
        });
    }

    const takeResponses = () => {
        ws.send(JSON.stringify({ method: "takeResponses", currentSlideNumber: currentSlideNumber }));
    }

    const resetResponses = () => {
        ws.send(JSON.stringify({ method: "resetResponses", currentSlideNumber: currentSlideNumber }));
    }

    const stopResponses = () => {
        ws.send(JSON.stringify({ method: "stopResponses", currentSlideNumber: currentSlideNumber }));
    }

    const seeResults = async () => {
        // ws.send(JSON.stringify({method: "seeResults", currentSlideNumber: currentSlideNumber}));
        const results = await configuredAxios.get(`/${quizSessionId}/${currentSlideData._id}/results`);
        setResults(results.data);
        setShowResults(true);
    }

    return (
        <div className='flex flex-row w-100 h-screen'>
            {
                currentSlideData.selectedSlideType !== "Leaderboard" ?
                    <SlideView slide={currentSlideData} />
                    : <LeaderboardSlide />
            }
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
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                        <Button variant="outlined" sx={style} onClick={takeResponses}>Enable Responses</Button>
                        <Button variant="outlined" sx={style} onClick={stopResponses}>Stop Responses</Button>
                        <Button variant="outlined" sx={style} onClick={resetResponses}>Reset Responses</Button>
                        <Button variant="outlined" sx={style} onClick={seeResults}>See Results</Button>
                        {/* replace enable/disable with a toggle button */}
                        {/* replace show results with a toggle button */}
                    </div>
                    {
                        showResults ?
                            <div 
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                            >
                                <ResultsChart results={results}/>
                            </div>
                            : null
                    }
                </>
            )}
        </div>
    );
}

export default PresentModeScreen;