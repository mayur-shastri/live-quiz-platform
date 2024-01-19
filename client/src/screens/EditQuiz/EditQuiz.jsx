import { useParams } from 'react-router-dom';
import CustomizationPanel from './CustomizationPanel/CustomizationPanel';
import SlidesBar from './SlidesBar/SlidesBar';
import SlidePreview from './SlidePreview/SlidePreview';
import Toolsbar from './Appbar/Toolsbar';
import { useContext, useState } from 'react';
import QuizContext from './Context Provider/QuizContext';

export default function EditQuiz() {

    // const { user_id, quiz_id } = useParams();

    const {slides, activeSlideId} = useContext(QuizContext);

    return (
        <div className='flex flex-col justify-center items-center'>
            <Toolsbar />
            <div className='flex flex-row flex-grow w-full'>
                    <SlidesBar />
                    {
                        slides.map((slide, index)=>{
                            return activeSlideId === slide.id?
                            <div key={index} className='flex flex-row flex-grow w-full' >
                            <SlidePreview slide={slide}/>
                            <CustomizationPanel slide={slide}/>
                            </div>
                            : null
                        })
                    }
            </div>
        </div>
    );
}