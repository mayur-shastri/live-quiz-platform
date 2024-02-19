import { useState } from 'react';
import RealTimeParticipantDataContext from './RealTimeParticipantDataContext';

const RealTimeParticipantDataProvider = ({ children }) => {

    const [ws, setWs] = useState(null);
    const [currentSlideData, setCurrentSlideData] = useState(null);
    return (
        <RealTimeParticipantDataContext.Provider value={
            { ws, setWs,
              currentSlideData, setCurrentSlideData,
            }}>
            {children}
        </RealTimeParticipantDataContext.Provider>
    );
}

export default RealTimeParticipantDataProvider;