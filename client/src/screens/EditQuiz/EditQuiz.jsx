import { useParams } from 'react-router-dom';
import CustomizationPanel from './CustomizationPanel/CustomizationPanel';
import SlidesBar from './SlidesBar/SlidesBar';
import SlidePreview from './SlidePreview/SlidePreview';
import Toolsbar from './Appbar/Toolsbar';
import { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import QuizProvider from './Context Provider/QuizProvider';
import QuizContext from './Context Provider/QuizContext';

export default function EditQuiz() {

    const { user_id, quiz_id } = useParams();

    const {slides, activeSlideId} = useContext(QuizContext);

    // const [slides, setSlides] = useState([]);
    // const [selectedPanelButton, setSelectedPanelButton] = useState('content');
    // const [selectedLayoutButton, setSelectedLayoutButton] = useState('default');
    // const [selectedSlideType, setSelectedSlideType] = useState("Single Correct MCQ");
    // const [options, setOptions] = useState([{ id: uuid(), value: '', correct: false }]);
    // const [question, setQuestion] = useState({ heading: '', description: '' });

    return (
        <div className='flex flex-col justify-center items-center'>
            <Toolsbar />
            <div className='flex flex-row flex-grow w-full'>
                {/* Each slide must have its own slidePReview and customizationPanel */}
                    <SlidesBar />
                    {/* <CustomizationPanel
                        selectedPanelButton={selectedPanelButton}
                        setSelectedPanelButton={setSelectedPanelButton}
                        selectedLayoutButton={selectedLayoutButton}
                        setSelectedLayoutButton={setSelectedLayoutButton}
                        selectedSlideType={selectedSlideType}
                        setSelectedSlideType={setSelectedSlideType}
                        options={options}
                        setOptions={setOptions}
                        question={question}
                        setQuestion={setQuestion}
                    /> */}
                    {
                        slides.map((slide, index)=>{
                            return activeSlideId === slide.id?
                            <div key={index} className='flex flex-row flex-grow w-full' >
                            <SlidePreview />
                            <CustomizationPanel slide={slide}/>
                            </div>
                            : null
                        })
                    }
            </div>
        </div>
    );
}