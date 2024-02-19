import React, { useContext } from 'react'
import RealTimeParticipantDataContext from '../../../../context providers/RealTimeData (participant)/RealTimeParticipantDataContext';

function SingleCorrectMCQ() {
    const { currentSlideData } = useContext(RealTimeParticipantDataContext);
    return (
        <div>
            <h1>Select the correct option</h1>
            <h2>{currentSlideData.question.heading}</h2>
            <h3>{currentSlideData.question.description}</h3>
            <div>
                {
                    currentSlideData.options.map((option, index) => {
                        return (
                            <div key={index}>
                                <input type="radio" name="option" value={option.id} />
                                <label>{option.value}</label>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default SingleCorrectMCQ;
