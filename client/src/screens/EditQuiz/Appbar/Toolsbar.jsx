import "./Navbar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Lottie from 'react-lottie';
import editAnimation from '../../../assets/edit-animation.json';
import syncAnimation from '../../../assets/cloud-sync-green-2.json';
import { useLottie } from 'lottie-react';
import { useEffect } from "react";
import PresentButton from "../Buttons/PresentButton";
import BackButton from "../Buttons/BackButton";
import ProfileIcon from "../../../components/ProfileIcon/ProfileIcon";

export default function Toolsbar({ isEditing, isSaving, quiz_id, user_id }) {

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
        { height: 45, width: 50, speed: 5 });

    useEffect(() => {
        if (isSaving) {
            play();
        } else {
            setTimeout(() => {
                goToAndStop(68, true);
            }, 1000);
        }
    }, [isSaving, play, goToAndStop]);

    return (
        // Add a component to edit the name of the quiz
        <div className="flex flex-row justify-between p-2 Navbar w-full" style={{ border: '1px solid black' }}>
            <BackButton />
            <div className="flex flex-row justify-center items-center ml-40">
                <div className="flex flex-row justify-center items-center" style={{ pointerEvents: 'none' }}>
                    <Lottie options={editAnimationOptions} height={40} width={40} isStopped={!isEditing} />
                </div>
                <div className="flex flex-row justify-center items-center">
                    {View}
                </div>
            </div>
            <div className="flex flex-row">
                <PresentButton quiz_id={quiz_id} user_id={user_id}/>
                <ProfileIcon/>
            </div>
        </div>
    );
}