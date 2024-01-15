import {instance as configuredAxios} from '../../axiosConfig';
import { useEffect, useState } from "react";

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
        <div className="h-screen">
            <h1>Welcome {username}</h1>
        </div>
    );
}