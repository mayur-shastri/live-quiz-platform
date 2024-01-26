import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear';
import './FlashCard.css';
import { useContext } from 'react';
import FlashContext from '../../context providers/Flash/FlashContext';

function FlashCard() {

    const {flashMessage, flashType, setIsVisible} = useContext(FlashContext);

    const onDismiss = () => {
        // hide visibility of flash message
        // if queue is maintained, delete from queue
        setIsVisible(false);
    }

    return (
        <div className={`
        flex flex-row items-center justify-between rounded-lg p-4 m-4 FlashCard
        ${flashType === 'success' ? 'bg-success-400' : 'bg-danger-400'}`} 
        >
            <div className="flex flex-grow px-2 text-white">
                {flashMessage}
            </div>
            <IconButton aria-label="dismiss message" onClick={onDismiss}>
                <ClearIcon sx={{ color: 'white' }}/>
            </IconButton>
        </div>
    );
}

export default FlashCard;