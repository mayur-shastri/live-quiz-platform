import { useState } from 'react';
import RealTimeDataContext from './RealTimeDataContext';

const RealTimeDataProvider = ({ children }) => {

    const [numParticipants, setNumParticipants] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [ws, setWs] = useState(null);
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0);
    return (
        <RealTimeDataContext.Provider value={
            { numParticipants, setNumParticipants,
              isStarted, setIsStarted,
              ws, setWs,
              currentSlideNumber, setCurrentSlideNumber,
            }}>
            {children}
        </RealTimeDataContext.Provider>
    );
}

export default RealTimeDataProvider;