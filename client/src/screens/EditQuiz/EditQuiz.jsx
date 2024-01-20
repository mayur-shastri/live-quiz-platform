import { useParams } from 'react-router-dom';
import CustomizationPanel from './CustomizationPanel/CustomizationPanel';
import SlidesBar from './SlidesBar/SlidesBar';
import SlidePreview from './SlidePreview/SlidePreview';
import Toolsbar from './Appbar/Toolsbar';
import { useContext, useState } from 'react';
import QuizContext from './Context Provider/QuizContext';

export default function EditQuiz() {

    const { user_id, quiz_id } = useParams();

    const { slides, activeSlideId } = useContext(QuizContext);

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen'
            style={{ maxWidth: '100%' }}
        >
            <Toolsbar />
            <div className='flex flex-row flex-grow w-full h-full'>
                <SlidesBar />
                {
                    slides.length === 0 || !activeSlideId ?
                        <div className='p-2 w-full'>
                            <div className="flex flex-col flex-grow justify-center items-center border border-black m-7 mt-1 mb-1 rounded-2xl h-full">
                                <div className='font-bold text-2xl'>Add a new slide</div>
                            </div>
                        </div>
                        :
                        slides.map((slide, index) => {
                            return activeSlideId === slide.id ?
                                <div key={index} className='flex flex-row flex-grow w-full' >
                                    <SlidePreview slide={slide} />
                                    <CustomizationPanel slide={slide} />
                                </div>
                                : null
                        })
                }
            </div>
        </div>
    );
}