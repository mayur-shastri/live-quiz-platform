import { IconButton, Typography } from '@mui/material';
import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import QuizContext from '../Context Provider/QuizContext';

function SlideSelectButton({ slideType, deleteSlide, number, id }) {

    const {activeSlideId, setActiveSlideId} = useContext(QuizContext);

    const setToActiveSlide = ()=>{
        setActiveSlideId(id);
    }

    const handleDeleteSlide = (event)=>{
        event.stopPropagation();
        deleteSlide(id);
    }

    return (
        <div 
        onClick={setToActiveSlide}
        className={`w-170 flex flex-col justify-end items-center m-1 p-2 border  
        ${activeSlideId === id ? 'border-4 border-primary' : 'border-black'}`}
        >
            <div className='flex flex-row justify-between items-center w-full'>
                <Typography variant='body2'>{number}</Typography>
                <IconButton sx={{ width: '1rem', height: '1rem', padding: 2 }}
                    onClick={handleDeleteSlide}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
            {/* <div className='flex flex-col justify-center items-center border'> */}
                <div className='font-bold border h-14 w-full'>
                    <div className='flex h-full justify-center items-center'>{slideType}</div>
                </div>
            {/* </div> */}
        </div>
    );
}

export default SlideSelectButton;
