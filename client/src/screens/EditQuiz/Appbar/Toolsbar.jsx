import "./Navbar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Lottie from 'react-lottie';
import editAnimation from '../../../assets/edit-animation.json';
import syncAnimation from '../../../assets/cloud-sync-green-2.json';

export default function Toolsbar({isEditing, isSaving}){
    
    const editAnimationOptions = {
        loop: true,
        autoplay: true, 
        animationData: editAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const syncAnimationOptions = {
        loop: true,
        autoplay: true, 
        animationData: syncAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="flex flex-row justify-end p-2 Navbar w-full" style={{ border: '1px solid black' }}>
            <div className="flex flex-row justify-center items-center mx-2" style={{ pointerEvents: 'none' }}>
            <Lottie options={editAnimationOptions} height={40} width={40} isStopped={!isEditing}/>
            </div>
            <div className="flex flex-row justify-center items-center mx-2">
            <Lottie options={syncAnimationOptions} height={50} width={55} isStopped={!isSaving}/>
            </div>
            <div className="flex flex-row justify-center items-center p-2 mx-2"
            style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'gray', marginLeft: '10px' }}>
                <AccountCircleIcon />
            </div>
        </div>
    );
}