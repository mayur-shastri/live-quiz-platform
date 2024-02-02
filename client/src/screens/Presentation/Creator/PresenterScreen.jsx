import React, { useEffect, useState } from 'react'
import Loading from '../../Splash/Loading';
import { Outlet, useLocation } from 'react-router-dom';
import { connectPresenterToWebSocketServer } from './connectPresenterToWebSocketServer';

function PresenterScreen() {

    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const {user_id, quiz_id} = location.state;

    useEffect(() => {
        const connect = async () => {
            await connectPresenterToWebSocketServer(user_id,quiz_id);
            setLoading(false);
        }
        connect();
        // setLoading(false); should be done after the connection is established, but
        // the way it is being done right now, it would be done before the connection is established
        
    }, []);

    if (loading) {
        return <Loading />
    } else {
        return <Outlet />
    }

}

export default PresenterScreen;
