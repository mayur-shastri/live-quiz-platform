import {instance as configuredAxios} from '../../axiosConfig';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography'

export default function Dashboard(){

    const [username, setUsername] = useState("");

    useEffect(()=>{
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
        getUserData().then((data)=>{
            if(data){
                setUsername(data.user.username);
            }
        });
    },[]);

    return (
        <div className="flex flex-col h-screen items-start justify-start w-full">
            <Typography variant="h3" color="initial" sx={{marginTop: '1em', marginLeft: '1em'}}>
                Welcome {username}!
            </Typography>
        </div>
    );
}