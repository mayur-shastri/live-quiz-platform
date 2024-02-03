import { useState } from 'react';
import RealTimeDataContext from './RealTimeDataContext';

const RealTimeDataProvider = ({ children }) => {

    const [numParticipants, setNumParticipants] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    return (
        <RealTimeDataContext.Provider value={
            { numParticipants, setNumParticipants,
              isStarted, setIsStarted,

            }}>
            {children}
        </RealTimeDataContext.Provider>
    );
}

export default RealTimeDataProvider;