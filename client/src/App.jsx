import { useEffect, useState } from 'react'
import './App.css'
import Register from './components/Register';
import Login from './components/Login';

function App() {

  const [greeting,setGreeting] = useState("");

  useEffect(()=>{
    const getData = async ()=>{
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
      {/* <Register/> */}
      <Login/>
    </>
  )
}

export default App