import { instance as configuredAxios } from '../axiosConfig';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography'
import QuizInfoCard from '../components/QuizInfoCard/QuizInfoCard';

export default function Quizzes() {

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
        <div className='flex flex-col items-start'>
                <Typography variant="body1" color="initial" sx={{marginBottom: '1rem', marginLeft: '1rem', fontWeight: 'bold'}}>
                    My Quizzes
                </Typography>
            <div className='grid grid-cols-3'>
                {
                    userData.quizzes ?
                        userData.quizzes.map((quiz, index) => {
                            return (
                                <QuizInfoCard key={index} imageUrl="https://www.softmaker.com/images/smo/presentations/presentations_windows_en.png" title={quiz.title} lastAccessed={quiz.lastAccessed} />
                            );
                        })
                        : null
                }
                {/* cards to test the grid */}
                {/* <QuizInfoCard imageUrl="https://www.softmaker.com/images/smo/presentations/presentations_windows_en.png" title="Untitled Quiz" lastAccessed={Date.now()} />
                <QuizInfoCard imageUrl="https://www.softmaker.com/images/smo/presentations/presentations_windows_en.png" title="Untitled Quiz" lastAccessed={Date.now()} />
                <QuizInfoCard imageUrl="https://www.softmaker.com/images/smo/presentations/presentations_windows_en.png" title="Untitled Quiz" lastAccessed={Date.now()} />
                <QuizInfoCard imageUrl="https://www.softmaker.com/images/smo/presentations/presentations_windows_en.png" title="Untitled Quiz" lastAccessed={Date.now()} />
                <QuizInfoCard imageUrl="https://www.softmaker.com/images/smo/presentations/presentations_windows_en.png" title="Untitled Quiz" lastAccessed={Date.now()} /> */}
            </div>
        </div>
    );
}