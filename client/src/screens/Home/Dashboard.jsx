import { instance as configuredAxios } from '../../axiosConfig';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography'
import QuizInfoCard from '../../components/QuizInfoCard/QuizInfoCard';

export default function Dashboard() {

    const [userData, setUserData] = useState({});
    useEffect(() => {
        const getUserData = async () => {
            const userData = await configuredAxios.get(`/userdata`);
            return userData.data;
            /* 
            The userData object looks like this:
            {
                "user": {
                    "username": "user1",
                    "email": "......",
                    "id": 1
                },
            */
        }
        getUserData().then((data) => {
            if (data) {
                setUserData(data.user);
            }
        });
    }, []);

    return (
        <>
            <div className="flex flex-col items-start justify-start w-full">
                <Typography variant="h3" color="initial" sx={{ marginTop: '1rem', marginLeft: '1rem' }}>
                    Welcome {userData.username}!
                </Typography>
            </div>
            <div className='flex flex-row '>
                { // don't map, just return 3 recently accessed quizzes as cards
                    userData.quizzes ?
                        userData.quizzes.map((quiz) => {
                            return (
                                <QuizInfoCard imageUrl="https://www.softmaker.com/images/smo/presentations/presentations_windows_en.png" title={quiz.title} lastAccessed={quiz.lastAccessed} />
                            );
                        })
                        : null
                }
            </div>
        </>
    );
}