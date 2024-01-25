import "./Navbar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Lottie from 'react-lottie';
import editAnimation from '../../../assets/edit-animation.json';
import syncAnimation from '../../../assets/cloud-sync-green-2.json';
import { useLottie } from 'lottie-react';
import { useEffect } from "react";

export default function Toolsbar({ isEditing, isSaving }) {

    const editAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: editAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    };

    const syncAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: syncAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    };

    const { View, play, stop, goToAndStop } = useLottie(syncAnimationOptions, 
        { height: 45, width: 50 , speed: 5});

    useEffect(() => {
        if (isSaving) {
            play();
        } else {
            setTimeout(()=>{
                goToAndStop(68, true);
            }, 1000);
        }
    }, [isSaving, play, goToAndStop]);
    
    return (
        <div className="flex flex-row justify-end p-2 Navbar w-full" style={{ border: '1px solid black' }}>
            <div className="flex flex-row justify-center items-center mx-2" style={{ pointerEvents: 'none' }}>
                <Lottie options={editAnimationOptions} height={40} width={40} isStopped={!isEditing} />
            </div>
            <div className="flex flex-row justify-center items-center mx-2">
                {View}
            </div>
            <div className="flex flex-row justify-center items-center p-2 mx-2"
                style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'gray', marginLeft: '10px' }}>
                <AccountCircleIcon />
            </div>
        </div>
    );
}