import { useEffect, useState } from "react";
import ParticipationTile from "./ParticipationTile";
import { instance as configuredAxios } from '../../axiosConfig';
import Loading from "../Splash/Loading";
import Typography from '@mui/material/Typography'
import {v4 as uuid} from 'uuid';

export default function Participations() {

    const [quizSessions, setQuizSessions] = useState([]); //quiz sessions
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        console.log(quizSessions);
    }, [quizSessions]);

    useEffect(() => {
        const getQuizSessions = async () => {
            const fetchedQuizSessions = await configuredAxios.get('/user-quiz-sessions');
            setQuizSessions(fetchedQuizSessions.data.participations);
            setIsLoading(false);
        }
        getQuizSessions();
    }, []);

    return (
        isLoading ? <Loading />
            : quizSessions.length >= 1 ?
                <div className="flex flex-col">
                    {
                        quizSessions.map((quizSession) => {
                            return <ParticipationTile quizSession={quizSession} key={uuid()}/>
                        })
                    }
                </div>
                : <div className="flex flex-col justify-center items-center h-full">
                    <Typography variant="h6" color="initial">No Participations</Typography>
                  </div>
    );
}