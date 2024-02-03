import { ArrowLeft } from 'lucide-react'
import { useContext } from 'react';
import RealTimeParticipantDataContext from '../../../context providers/RealTimeData (participant)/RealTimeParticipantDataContext';
import { useNavigate } from 'react-router-dom';

function WaitingPage() {

    const {ws} = useContext(RealTimeParticipantDataContext);
    const navigate = useNavigate();
    
    const leaveQuiz = ()=>{
        ws.close();
        navigate('/app/home');
    }

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <h1>Waiting for the presenter to start...</h1>
            <button
                type="button"
                className="inline-flex items-center rounded-md 
                bg-primary-400 px-3 py-2 text-sm font-semibold 
                text-white hover:bg-primary-700 mt-10"
                onClick={leaveQuiz}
            >
                <ArrowLeft className="ml-2 h-4 w-4" />
                Leave
            </button>
        </div>
    );
}

export default WaitingPage;