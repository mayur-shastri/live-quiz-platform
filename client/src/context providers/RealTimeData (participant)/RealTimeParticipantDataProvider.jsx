import { useState } from 'react';
import RealTimeParticipantDataContext from './RealTimeParticipantDataContext';

const RealTimeParticipantDataProvider = ({ children }) => {

    const [ws, setWs] = useState(null);
    const [currentSlideData, setCurrentSlideData] = useState(null);
    // const [isRefreshed, setIsRefreshed] = useState(false);
    const [takeResponses, setTakeResponses] = useState(false);
    const [resetResponses, setResetResponses] = useState(false);
    return (
        <RealTimeParticipantDataContext.Provider value={
            { ws, setWs,
              currentSlideData, setCurrentSlideData,
            //   isRefreshed, setIsRefreshed,
            takeResponses, setTakeResponses,
            resetResponses, setResetResponses,
            }}>
            {children}
        </RealTimeParticipantDataContext.Provider>
    );
}

export default RealTimeParticipantDataProvider;