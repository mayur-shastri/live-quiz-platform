import { IconButton, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

function SlideSelectButton({ slideData, deleteSlide, number }) {

    return (
        <div className='w-170 flex flex-col justify-end items-center bg-red-500 m-1 p-2'>
            <div className='flex flex-row justify-between items-center'>
                <Typography variant='body2' sx={{ color: 'white' }}>{number}</Typography>
                <IconButton sx={{ width: '1rem', height: '1rem', padding: 2 }}
                    onClick={deleteSlide}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
            <div className='flex flex-col justify-center items-center border'>
                <div className='text-white font-bold'>
                    {slideData.type}
                </div>
            </div>
        </div>
    );
}

export default SlideSelectButton;
