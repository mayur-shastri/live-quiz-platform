import React, { useContext } from 'react'
import RealTimeParticipantDataContext from '../../../context providers/RealTimeData (participant)/RealTimeParticipantDataContext';
import SingleCorrectMCQ from './QuestionScreens/SingleCorrectMCQ';

function QuizScreen() {

    const { currentSlideData } = useContext(RealTimeParticipantDataContext);

    return (
        currentSlideData && currentSlideData.selectedSlideType === "Single Correct MCQ" ?
            <SingleCorrectMCQ />
            : currentSlideData && currentSlideData.selectedSlideType === "Multiple Correct MCQ" ?
                <MultipleCorrectMCQ />
                : currentSlideData && currentSlideData.selectedSlideType === "Descriptive Answer" ?
                    <DescriptiveAnswer />
                    : currentSlideData && currentSlideData.selectedSlideType === "Leaderboard" ?
                        <Leaderboard />
                        : null
    );

}

export default QuizScreen;
