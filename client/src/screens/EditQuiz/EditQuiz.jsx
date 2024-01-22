import { useParams } from 'react-router-dom';
import CustomizationPanel from './CustomizationPanel/CustomizationPanel';
import SlidesBar from './SlidesBar/SlidesBar';
import SlidePreview from './SlidePreview/SlidePreview';
import Toolsbar from './Appbar/Toolsbar';
import { useContext, useEffect, useRef, useState } from 'react';
import QuizContext from './Context Provider/QuizContext';
import { instance as configuredAxios } from '../../axiosConfig';

export default function EditQuiz() {

    const { user_id, quiz_id } = useParams();

    const { slides, setSlides, activeSlideId } = useContext(QuizContext);

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const slidesRef = useRef(null);
    slidesRef.current = slides;

    const saveTimeoutRef = useRef(null);

    const getSlides = async () => {
        try {
            const response = await configuredAxios.get(`${user_id}/${quiz_id}/slides`);
            console.log(response.data.slides);
            return response.data.slides;
        } catch(e){
            console.log(e);
        }
    }

    const saveSlides = async (slides) => {
        setIsEditing(false);
        setIsSaving(true);
        try{
        const response = await configuredAxios.put(`${user_id}/${quiz_id}/slides`, { slides: slidesRef.current });
        return response.data.message;
        } catch(e){
            console.log(e);
        } finally{
            setIsSaving(false);
        }
    }

    useEffect(() => {
        getSlides().then((fetchedSlides) => {
            console.log("Fetched slides");
            console.log(fetchedSlides);
            setSlides(fetchedSlides);
        });
    }, []);

    const handleUserActivity = ()=>{
        setIsEditing(true);
        if(saveTimeoutRef.current){
            clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(()=>{
            saveSlides(slidesRef.current).then((message)=>{
                console.log(message);
            });
        }, 2000);
    }

    useEffect(() => {
        window.addEventListener('click', handleUserActivity);
        // window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);
        return ()=>{
            window.removeEventListener('click', handleUserActivity);
            // window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        }
    }, []); // for autosave

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen'
            style={{ maxWidth: '100%' }}
        >
            <Toolsbar isEditing={isEditing} isSaving={isSaving}/>
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