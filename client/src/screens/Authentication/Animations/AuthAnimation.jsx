import React from 'react'
import Lottie from 'react-lottie';
import signInAnimation from '../../../assets/Sign In.json';
import signUpAnimation from '../../../assets/Sign Up.json';

function AuthAnimation({page}) {

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: page === 'signin'? signInAnimation: signUpAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
        <Lottie options={defaultOptions} height={400} width={600} />
    );
}

export default AuthAnimation;
