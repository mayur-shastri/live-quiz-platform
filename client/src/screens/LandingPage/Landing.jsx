import NavbarLanding from "./NavbarLanding";
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'
import landingImage from '../../assets/Landing Page.png'
import { useTransition, animated } from 'react-spring';
import { useEffect, useState } from "react";

export default function Landing() {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((state) => (state + 1) % Object.keys(words).length);
    }, 2000); // change words every 2 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  const transitions = useTransition(index, {
    from: { transform: 'translate3d(0,0px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,0px,0)', opacity: 0 },
    config: { duration: 100 },
  });

  const words = {
    0: ['voices', '#a83c32'],
    1: ['teaching', '#192bcf'],
    2: ['time', '#cfcc19'],
    3: ['meetings', '#19cf56'],
  }

  const style = {
    fontWeight: 'bold',
  }

  return (
    <div className="flex flex-col h-screen">
      <NavbarLanding />
      <div className="flex flex-grow">
        <div className="w-1/2 flex flex-col h-full">
          <div className="ml-40 mt-20 mb-10">
            <Typography variant="h1" color="initial" sx={style}>Make your</Typography>
            <div className="relative" style={{ height: '1.2em' }}>
              {
                transitions((props, i) => (
                  <animated.div style={props}>
                    <Typography variant="h2" color="initial" sx={{ ...style, color: words[i][1] }}>{words[i][0]}</Typography>
                  </animated.div>
                ))
              }
            </div>
            <div className="bg-white-500">
              <Typography variant="h1" color="initial" sx={{ ...style, marginTop: '0.5em'}}>count</Typography>
            </div>
          </div>
          <div className="ml-40 mb-10">
            <Typography variant="subtitle1" color="initial">
              Gain valuable insights from everyone around
            </Typography>
            <Typography variant="subtitle1" color="initial">
              you with Word Clouds,
            </Typography>
            <Typography variant="subtitle1" color="initial">
              Polls, and Quizzes.
            </Typography>
          </div>
          <div className="ml-40">
            <Link to="register">
              <Button variant="contained"
                color="primary"
                sx={{
                  borderRadius: 10,
                  paddingX: 10,
                  paddingY: 2,
                }}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex mt-20 max-w-7xl flex-col h-full">
          <img src={landingImage} height={700} width={700} alt="" />
        </div>
      </div>
    </div>
  );

}