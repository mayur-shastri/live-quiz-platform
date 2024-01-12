import { useState } from 'react';
import { instance as configuredAxios } from '../axiosConfig';

export default function Login() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [buttonState, setButtonState] = useState(false);

    const submitData = async (evt) => {
        evt.preventDefault();
        const res = await configuredAxios.post('/login', { username, email, password });
        console.log(res.data.message);
        setButtonState(true);
    }

    return (
        <>
            <form onSubmit={submitData}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type='submit' disabled={buttonState}>Submit</button>
            </form>
        </>
    );

}