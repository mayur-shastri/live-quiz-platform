import { Box } from '@mui/material';
import React from 'react'
import Toolbar from '../Appbar/Toolbar';

function ContentEdit({drawerWidth}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            border: '1px solid black',
            borderRadius: '10px',
            width: drawerWidth,
            margin: '0.5rem 0 0.5rem 0',
            overflow: 'auto', // scrollbar appears  if needed
        }}>
            <Toolbar/>
        </Box>
    );
}

export default ContentEdit;
