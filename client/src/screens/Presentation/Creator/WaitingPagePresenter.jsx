import { ArrowRight } from 'lucide-react'
import { useContext } from 'react';
import RealTimeDataContext from '../../../context providers/RealTimeData (presenter)/RealTimeDataContext';

function WaitingPagePresenter() {

    const {numParticipants} = useContext(RealTimeDataContext);

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <h1>Waiting for the players to join...</h1>
            <h1 className='mt-10'>Number of participants: {numParticipants}</h1>
            <button
                type="button"
                className="inline-flex items-center rounded-md 
                bg-primary-400 px-3 py-2 text-sm font-semibold 
                text-white hover:bg-primary-700 mt-10"
            >
                Start Presentation
                <ArrowRight className="ml-2 h-4 w-4" />
            </button>
        </div>
    );
}

export default WaitingPagePresenter;