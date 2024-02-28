import React, { createContext, useContext, useEffect, useState } from 'react'
import Loading from '../../Splash/Loading';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { connectPresenterToWebSocketServer } from './connectPresenterToWebSocketServer';
import RealTimeDataContext from '../../../context providers/RealTimeData (presenter)/RealTimeDataContext';

function PresenterScreen() {

    const { setNumParticipants, setWs,
        setCurrentSlideData, setSlidesLength,
         ws, currentSlideNumber,} = useContext(RealTimeDataContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    let {user_id, quiz_id} = location.state;
    useEffect(()=>{
        console.log("user_id", user_id, "quiz_id", quiz_id);
        // const isLoadedOnceKey = `presenter-${quiz_id}`;
        if(user_id && quiz_id){
            localStorage.setItem('userId', user_id);
            localStorage.setItem('quizId', quiz_id);
            // localStorage.setItem(isLoadedOnceKey, true);
        } else{
            console.log("I entered here");
            user_id = localStorage.getItem('userId');
            quiz_id = localStorage.getItem('quizId');
            console.log("New values after reload");
            console.log("user_id", user_id, "quiz_id", quiz_id);
        }
        const connect = async () => {
            const ws = await connectPresenterToWebSocketServer(user_id, quiz_id,
                setNumParticipants, setCurrentSlideData, navigate, setSlidesLength,
                currentSlideNumber);
            console.log(ws);
            setWs(ws);
        }
        setLoading(false);
        connect();
        // setLoading(false); should be done after the connection is established, but
        // the way it is being done right now, it would happen the connection is established
    }, []);

    if (loading) {
        return <Loading />
    } else {
        return (
            <Outlet />
        );
    }

}

export default PresenterScreen;
