import React, { useState, useEffect } from 'react'
import QuizContext from './QuizContext';

function QuizProvider({ children }) {

    // {
    //     id: null,
    //     selectedSlideType: null,
    //     options: [],
    //     question: { heading: '', description: '' },
    //     selectedLayoutButton: null,
    //     imageUrl: null,
    //     correctAnswers: [], //array of correct strings of answers for descriptive type questions
    // }

    const [slides, setSlides] = useState([]);
   
    const [selectedPanelButton, setSelectedPanelButton] = useState('content');
    const [activeSlideId, setActiveSlideId] = useState(null); //null slide is the 0th slide. It is not visible to the user

    // useEffect(()=>{
    //     console.log(slides);
    //     // console.log('************');
    //     // console.log(activeSlideId);
    //     // console.log('************');
    // },[slides, activeSlideId]);

    // const [selectedLayoutButton, setSelectedLayoutButton] = useState(null);
    // const [selectedSlideType, setSelectedSlideType] = useState(null);
    // const [options, setOptions] = useState([]);
    // const [question, setQuestion] = useState({heading: '', description: ''});

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
