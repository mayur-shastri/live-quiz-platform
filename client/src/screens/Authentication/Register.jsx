import {instance as configuredAxios} from '../../axiosConfig';
import { useState } from 'react';

export default function Register(){

    const [buttonStatus, setButtonStatus] = useState(false);

    const registerUser = async ()=>{
        const response = await configuredAxios.post('/register', {username: "Chintu", email: "chintu@gmail.com", password: "mypassword"});
        console.log(response.data);
        setButtonStatus(true);
    }

    return (
        <>
            <button onClick={registerUser} disabled={buttonStatus}>SubmitData</button>
        </>
    );
}