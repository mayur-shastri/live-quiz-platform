import { useParams } from 'react-router-dom';
import CustomizationPanel from './CustomizationPanel/CustomizationPanel';
import SlidesBar from './SlidesBar/SlidesBar';
import SlidePreview from './SlidePreview/SlidePreview';
import Toolsbar from './Appbar/Toolsbar';

export default function EditQuiz() {

    const { user_id, quiz_id } = useParams();
    
    return (
        <div className='flex flex-col justify-center items-center'>
            <Toolsbar />
            <div className='flex flex-row flex-grow w-full'>
                {/* Each slide must have its own slidePReview and customizationPanel */}
                <SlidesBar />
                <SlidePreview />
                <CustomizationPanel />
            </div>
        </div>
    );
}