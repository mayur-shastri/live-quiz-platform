import { Button } from '@mui/material';
import React from 'react'
import PresentToAllIcon from '@mui/icons-material/PresentToAll';

function PresentButton() {

    const onPresent = () => {}

    return (
        <Button variant="contained" 
        color="primary"
        sx={{ml: 1, mr: 1, borderRadius: '50px', px: '1.5rem'}}
        onClick={onPresent}
        >
            <PresentToAllIcon sx={{mr: 1}} />
            Present
        </Button>
    );
}

export default PresentButton;
