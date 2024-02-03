import { useState } from 'react';
import RealTimeParticipantDataContext from './RealTimeParticipantDataContext';

const RealTimeParticipantDataProvider = ({ children }) => {

    const [ws, setWs] = useState(null);
    return (
        <RealTimeParticipantDataContext.Provider value={
            { ws, setWs,

            }}>
            {children}
        </RealTimeParticipantDataContext.Provider>
    );
}

export default RealTimeParticipantDataProvider;