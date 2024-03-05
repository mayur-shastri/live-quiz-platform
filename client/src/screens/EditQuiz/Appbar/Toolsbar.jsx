import "./Navbar.css";
import Lottie from 'react-lottie';
import editAnimation from '../../../assets/edit-animation.json';
import syncAnimation from '../../../assets/cloud-sync-green-2.json';
import { useLottie } from 'lottie-react';
import { useEffect, useState } from "react";
import PresentButton from "../Buttons/PresentButton";
import BackButton from "../Buttons/BackButton";
import ProfileIcon from "../../../components/ProfileIcon/ProfileIcon";
import TextField from '@mui/material/TextField'
import { instance as configuredAxios } from '../../../axiosConfig';

export default function Toolsbar({ isEditing, quizName, setQuizName, isSaving, quiz_id, user_id }) {

    const [placeHolder, setPlaceHolder] = useState("");
    const [roomCode, setRoomCode] = useState("");

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

    useEffect(() => {
        const getQuizNameAndRoomCode = async () => {
            const res = await configuredAxios.get(`/${quiz_id}/name`);
            setPlaceHolder(res.data.title);
            setRoomCode(res.data.roomCode);
        }
        getQuizNameAndRoomCode();
    }, []);

    const editQuizName = (e) => {
        setQuizName(e.target.value);
    }

    return (
        <div className="flex flex-row justify-between p-2 Navbar w-full" style={{ border: '1px solid black' }}>
            <div className="flex">
                <BackButton />
                <div className="w-full">
                    <input
                        className="flex h-10 mt-1 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        id="quizname"
                        value={quizName}
                        placeholder={placeHolder}
                        onChange={editQuizName}
                        defaultValue={placeHolder}
                    ></input>
                </div>
                <div className="bg-gray-300 text-black font-bold p-2 mx-2 border rounded-xl">
                    {roomCode}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center mr-10">
                <div className="flex flex-row justify-center items-center" style={{ pointerEvents: 'none' }}>
                    <Lottie options={editAnimationOptions} height={40} width={40} isStopped={!isEditing} />
                </div>
                <div className="flex flex-row justify-center items-center">
                    {View}
                </div>
            </div>
            <div className="flex flex-row">
                <PresentButton quiz_id={quiz_id} user_id={user_id} />
                <ProfileIcon />
            </div>
        </div>
    );
}