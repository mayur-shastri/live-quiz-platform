import React, { useEffect, useState } from 'react'
import { instance as configuredAxios } from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react'
import Button from '@mui/material/Button'

function ParticipationTile({ quizSession }) {

    
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [creatorUsername, setCreatorUsername] = useState("");
    const [participationData, setParticipationData] = useState({});
    const navigate = useNavigate();

    const initializeDate = ()=>{
        let initialDate = new Date(Date.now());
        return initialDate;
    }

    const [date, setDate] = useState(initializeDate);

    const onSeeResult = () => {
        navigate(`/${quizSession._id}/result`, { state: { participationData } });
    }

    useEffect(() => {
        setDate(() => {
            const quizDate = new Date(quizSession.dateTime);
            return quizDate;
        });
        const getTileData = async () => {
            const fetchedUsername = await configuredAxios.get('/username')
                .catch((err) => {
                    console.log(err.response.data.message);
                });
            const fetchedCreatorUsername = await configuredAxios.get(`${quizSession.quizId}/creator`)
                .catch((err) => {
                    console.log(err.response.data.message);
                });

            setUsername(fetchedUsername.data.username);
            setUserId(fetchedUsername.data.userId);
            setCreatorUsername(fetchedCreatorUsername.data.creator);
        }
        getTileData();
    }, []);

    useEffect(() => {
        const getParticipationData = async () => {
            const leaderboardData = await configuredAxios.get(`/${quizSession._id}/leaderboard`);
            const res = leaderboardData.data.find((user) => {
                return user._id === userId;
            });
            if(!res){
                setParticipationData(()=>{
                    return {
                        _id: userId,
                        username,
                        correctAnswers: 0,
                        totalAnswers: 0,
                        points: 0,
                        accuracy: 100, 
                    }
                });
                return;
            }
            setParticipationData(res);
        }
        getParticipationData();
    }, [username, creatorUsername]);

    useEffect(()=>{
        console.log(participationData);
    }, [participationData]);

    return (
        <div className='flex flex-grow'>
            <div className="flex justify-between mx-2 my-1 mb-1 w-full items-center rounded-md border shadow-lg md:flex-row">
                <div className='flex flex-col'>
                    <div className="p-4">
                        <h1 className="inline-flex items-center text-lg font-semibold">
                            Presentation By {creatorUsername}
                        </h1>
                        <p className="mt-3 text-sm mb-2 text-gray-700">
                            Presented: {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
                        </p>
                    </div>
                </div>
                <div className='m-4'>
                    <Button variant="contained" 
                    color="primary"
                    onClick={onSeeResult}>
                        See Results
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ParticipationTile;
