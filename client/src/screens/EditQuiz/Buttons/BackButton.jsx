import React from 'react'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton() {

    const handleClick = ()=>{
        window.history.back();
    }

    return (
        <IconButton aria-label="" onClick={handleClick}>
            <ArrowBackIcon />
        </IconButton>
    )
}

export default BackButton
