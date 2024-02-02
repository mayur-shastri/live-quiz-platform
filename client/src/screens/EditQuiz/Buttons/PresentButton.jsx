import { Button } from '@mui/material';
import React from 'react'
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import { useNavigate } from 'react-router-dom';

function PresentButton({user_id, quiz_id}) {

    const navigate = useNavigate();

    const onPresent = () => {
        navigate('/presenter/waiting', {state: {user_id, quiz_id}});
    }

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
