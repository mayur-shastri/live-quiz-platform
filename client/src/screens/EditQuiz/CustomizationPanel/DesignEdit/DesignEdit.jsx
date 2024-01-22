import { Box, Divider, Drawer, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import ImageUploadButton from './ImageUploadButton';
import LayoutButtonsGrid from './LayoutButtonsGrid';
import TextColorPicker from './TextColorPicker';
import BackgroundColorPicker from './BackgroundColorPicker';
/* 
Syncing the user input with the database can be achieved using:
1) Debounce - wait for a few seconds after user input(when user input devices become inactive) to update the database
2) WebSockets - update the database in real time
*/

function DesignEdit({ drawerWidth, 
    slide
}) {

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
                        height: 'auto',
                        overflow: 'hidden', // scrollbar appears  if needed
                        boxSizing: 'border-box',
                        position: 'absolute', // position the drawer absolutely within the Box
                    },
                }}
            >
                {/* Drawer content goes here */}
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Design</Typography>
                <Divider sx={{ borderColor: 'black' }} />
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Upload Image</Typography>
                <ImageUploadButton 
                slide={slide}
                />
                <Divider sx={{ borderColor: 'black' }} />
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Slide Layout</Typography>
                <LayoutButtonsGrid 
                slide={slide}
                />
                <Divider sx={{ borderColor: 'black', p:2}} />
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Text Color</Typography>
                <TextColorPicker slide={slide}/>
                <Divider sx={{ borderColor: 'black', p:2}} />
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Background Color</Typography>
                <BackgroundColorPicker slide={slide}/>
            </Drawer>
        </Box>
    );
}

export default DesignEdit;