import React, { useEffect, useState } from 'react'
import Loading from '../../Splash/Loading';
import { Outlet, useLocation } from 'react-router-dom';
import { connectWebSocketServer } from './connectWebSocketServer';

function ParticipantScreen() {

    const location = useLocation();
    const [loading, setLoading] = useState(true);
     const {roomCode, userId} = location.state;
    useEffect(() => {
        const connect = async () => {
            await connectWebSocketServer(roomCode,userId);
        }
        connect();
        setLoading(false);
        // setLoading(false); should be done after the connection is established, but
        // the way it is being done right now, it would be done before the connection is established
    }, []);

    if (loading) {
        return <Loading />
    } else {
        return <Outlet />
    }

}

export default ParticipantScreen;
