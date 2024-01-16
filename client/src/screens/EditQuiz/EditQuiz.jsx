import { useParams } from 'react-router-dom';
import CustomizationPanel from './CustomizationPanel/CustomizationPanel';
import SlideBar from './SlidesBar';
import SlidePreview from './SlidePreview/SlidePreview';
import Toolbar from './Appbar/Toolbar';

export default function EditQuiz() {

    const { user_id, quiz_id } = useParams();

    return (
        <div className='flex flex-col justify-center items-center'>
            <Toolbar />
            <div className='flex flex-row flex-grow w-full'>
                <SlideBar />
                <SlidePreview />
                <CustomizationPanel />
            </div>
        </div>
    );
}