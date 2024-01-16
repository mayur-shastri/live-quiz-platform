import { instance as configuredAxios } from '../../axiosConfig';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography'
import QuizInfoCard from '../../components/QuizInfoCard/QuizInfoCard';
import MyButton from '../../components/Button/MyButton';

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
                <Typography variant="h3" color="initial" sx={{ margin: '2rem'}}>
                    Welcome {userData.username}!
                </Typography>
            </div>
            <div className='flex flex-row justify-start items-center m-8'>
                <MyButton text="Create Quiz" icon="plusIcon" onClick={()=>{}}/>
                <MyButton text="Join Quiz" icon="groupAddIcon" onClick={()=>{}}/>
            </div>
            <div className='flex flex-row'>
                {
                    userData.quizzes ?
                        // userData.quizzes.map((quiz,index) => {
                        //     return (
                        //         <QuizInfoCard key={index} imageUrl="https://www.softmaker.com/images/smo/presentations/presentations_windows_en.png" title={quiz.title} lastAccessed={quiz.lastAccessed} />
                        //     );
                        // })
                        userData.quizzes.slice(0, 3).map((quiz, index) => {
                            return (
                                <QuizInfoCard key={index} imageUrl="https://www.softmaker.com/images/smo/presentations/presentations_windows_en.png" title={quiz.title} lastAccessed={quiz.lastAccessed} />
                            );
                        })
                        : null
                }
            </div>
        </>
    );
}