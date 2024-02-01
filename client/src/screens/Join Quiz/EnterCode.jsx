import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function EnterCode() {

    const [roomCode, setRoomCode] = useState('');
    const [joinPressed, setJoinPressed] = useState(false);
    const navigate = useNavigate();;

    const joinQuiz = () => {
        navigate('/participant/waiting');
    }

    const backToHome = () => {
        navigate('/app/home');
    }

    const handleInputChange = (e) => {
        setRoomCode(e.target.value);
    }

    return (
        <section className='flex flex-col justify-center h-screen'>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="flex flex-col items-start xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md px-4  border border-gray">
                    <div className='flex flex-row justify-between'>
                        <IconButton aria-label="" onClick={backToHome} sx={{ mt: '2rem' }}>
                            <ArrowBackIcon />
                        </IconButton>
                        {/* Logo of the app */}
                        {/* <img src={logo} alt="Logo" style={{ height: '64px'}} /> */}
                        <div className=''></div> 
                        {/* dummy div to bring the logo to center using justify-between */}
                    </div>
                    <div className='flex-grow'>
                        <h2 className="text-center text-2xl mt-10 font-bold leading-tight text-black mb-10">
                            Enter the room code to join the quiz
                        </h2>
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="room-code" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Room Code{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id={'room-code'}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mb-10"
                                        placeholder="Room Code"
                                        value={roomCode}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex w-full mb-8 items-center justify-center rounded-md bg-primary-400 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-primary-700"
                                    onClick={joinQuiz}
                                >
                                    Join Quiz <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}