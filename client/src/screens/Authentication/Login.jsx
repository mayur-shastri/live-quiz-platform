import { useState } from 'react';
import { instance as configuredAxios } from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const navigate = useNavigate();

  const submitData = async (evt) => {
    evt.preventDefault();
    const res = await configuredAxios.post('/login', { username, password });
    console.log(res.data.message);
    setButtonState(true);
    if(res.data.message === 'Login successful!'){
      navigate('/app/home');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded shadow-md">
      <form onSubmit={submitData}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username:
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