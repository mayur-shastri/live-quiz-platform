import React, { useState, useEffect } from 'react'
import QuizContext from './QuizContext';

function QuizProvider({ children }) {
    
    // Example slide data
    // {
    //     id: null,
    //     selectedSlideType: null,
    //     options: [],
    //     question: { heading: '', description: '' },
    //     selectedLayoutButton: null,
    //     imageUrl: null,
    //     backgroundImageUrl: null, // add sometime later
    //     correctAnswers: [], //array of correct strings of answers for descriptive type questions
    // }

    const [slides, setSlides] = useState([]);
   
    const [selectedPanelButton, setSelectedPanelButton] = useState('content');
    const [activeSlideId, setActiveSlideId] = useState(null); //null slide is the 0th slide. It is not visible to the user

    useEffect(()=>{
        console.log(slides);
    },[slides]);

    return (
        <QuizContext.Provider value={{
            slides, setSlides,
            selectedPanelButton, setSelectedPanelButton,
            activeSlideId, setActiveSlideId,
        }}>
            {children}
        </QuizContext.Provider>
    );
}

export default QuizProvider;