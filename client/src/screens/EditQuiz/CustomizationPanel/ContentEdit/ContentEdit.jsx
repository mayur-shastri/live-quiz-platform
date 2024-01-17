import { Box, Divider, Drawer, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import SelectSlide from './SelectSlide';
import { useState } from 'react';

function ContentEdit({ drawerWidth }) {

    useEffect(()=>{
        console.log(selectedSlideType);
    },[]);

    const [selectedSlideType, setSelectedSlideType] = useState("Single Correct MCQ");


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            border: '1px solid black',
            borderRadius: '10px',
            width: drawerWidth,
            margin: '0.5rem 0 0.5rem 0',
            overflow: 'hidden', // scrollbar appears  if needed
            position: 'relative', // so that drawer can be positioned relative to this
        }}>
            <Drawer
                variant="permanent"
                anchor="right"
                sx={{
                    width: '100%',
                    flexShrink: 0,
                    position: 'absolute', // position the drawer absolutely within the Box
                    right: 0, // align the drawer to the right of the Box
                    '& .MuiDrawer-paper': {
                        width: '100%',
                        height: '100vh',
                        overflowY: 'auto', // scrollbar appears  if needed
                        boxSizing: 'border-box',
                        position: 'absolute', // position the drawer absolutely within the Box

                    },
                }}
            >
                {/* Drawer content goes here */}
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Content</Typography>
                <Divider sx={{ borderColor: 'black' }} />
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Slide Type</Typography>
                <SelectSlide selectedSlideType={selectedSlideType} setSelectedSlideType={setSelectedSlideType}/>
                <Divider sx={{ borderColor: 'black' }} />
            </Drawer>
        </Box>
    );
}

export default ContentEdit;
