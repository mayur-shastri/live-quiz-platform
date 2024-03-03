import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import Lottie from 'react-lottie';
import seeResultsAnimation from '../../../assets/Presentation Over.json';
import ErrorPage from '../../ErrorPage/ErrorPage';
import { useLocation } from 'react-router-dom';

function PresentationEnded() {

    const [isParticipant, setIsParticipant] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(()=>{
        if(location.state){
            const {navigatedAs} = location.state;
            if(navigatedAs === "participant"){
                setIsParticipant(true);
            }
        }    
    }, []);

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: seeResultsAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const goToHome = () => {
        navigate('/app/home');
    }

    const goToResults = ()=>{
        // ...
    }

    return (
        <>
        {
            isParticipant ? 
            <div className='flex flex-col h-screen justify-center items-center'>
            <Typography variant="h2"
                color="initial"
            >
                The presentation has ended
            </Typography>
            <div style={{ pointerEvents: 'none' }}>
                <Lottie options={defaultOptions} height={400} width={600} />
            </div>
            <div className='flex justify-between'>
                <Button variant="contained"
                    color="primary"
                    sx={{marginRight: 5}}
                    onClick={goToResults}>
                    Analyze Performance
                </Button>
                <Button variant="contained"
                    color="primary"
                    onClick={goToHome}>
                    Go to Home
                </Button>
            </div>
        </div>
        : <div className='h-screen w-full'>
            <ErrorPage status={404}/>
        </div>
        }
        </>
    );
}

export default PresentationEnded;
