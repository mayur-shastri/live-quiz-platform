import { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';

function Landing() {

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api');
      console.log(res);
      const parsedResponse = await res.json();
      setGreeting(parsedResponse.greeting);
    }
    getData();
  }, []);

  return (
    <>
      <h1>{greeting}</h1>
      <Link to="login">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </Link>
      <Link to="register">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
          Register
        </button>
      </Link>
    </>
  )
}

export default Landing