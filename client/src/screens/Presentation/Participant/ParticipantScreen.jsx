import React, { useEffect, useState } from 'react'
import Loading from '../../Splash/Loading';
import { Outlet } from 'react-router-dom';
import { connectWebSocketServer } from './connectWebSocketServer';

function ParticipantScreen() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const connect = async () => {
            await connectWebSocketServer();
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
