import loadingAnimation from '../../assets/Loading.json';
import Lottie from 'react-lottie';

export default function Loading(){
    
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: loadingAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
        <>
        <div className="flex flex-col h-screen items-center justify-center">
            <Lottie options={defaultOptions} height={400} width={400}/>
        </div>
        </>
    );
}