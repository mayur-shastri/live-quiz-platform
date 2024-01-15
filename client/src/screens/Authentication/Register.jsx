import { instance as configuredAxios } from '../../axiosConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonState, setButtonState] = useState(false);

    const navigate = useNavigate();

    const registerUser = async (evt) => {
        evt.preventDefault();
        const response = await configuredAxios.post('/register', { username, email, password });
        console.log(response);
        setButtonState(true);
        if (response.data.message === 'User Created!') {
            navigate('/app/home'); //redirect not working
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded shadow-md">
            <form onSubmit={registerUser}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Enter your email address:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    {/* USERNAME UNIQUE HASN"T BEEN DEALT WITH YET */}
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Create a Username:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={buttonState}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}