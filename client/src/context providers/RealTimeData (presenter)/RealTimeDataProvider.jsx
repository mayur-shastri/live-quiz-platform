import { useState } from 'react';
import RealTimeDataContext from './RealTimeDataContext';

const RealTimeDataProvider = ({ children }) => {

    const [numParticipants, setNumParticipants] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [ws, setWs] = useState(null);
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0);
    const [currentSlideData, setCurrentSlideData] = useState(null);
    const [slidesLength, setSlidesLength] = useState(0);
    const [quizId, setQuizId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [quizSessionId, setQuizSessionId] = useState(null);

    return (
        <RealTimeDataContext.Provider value={
            { numParticipants, setNumParticipants,
              isStarted, setIsStarted,
              ws, setWs,
              currentSlideNumber, setCurrentSlideNumber,
              currentSlideData, setCurrentSlideData,
              slidesLength, setSlidesLength,
              quizSessionId, setQuizSessionId,
            }}>
            {children}
        </RealTimeDataContext.Provider>
    );
}

export default RealTimeDataProvider;