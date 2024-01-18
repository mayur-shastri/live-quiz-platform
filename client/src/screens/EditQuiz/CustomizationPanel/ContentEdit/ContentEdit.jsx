import { Box, Divider, Drawer, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import SelectSlide from './SelectSlide';
import { useState } from 'react';
import QuestionInput from './QuestionInput';
import OptionsInput from './OptionsGroup/OptionsInput';
import {v4 as uuid} from 'uuid';

/* 
Syncing the user input with the database can be achieved using:
1) Debounce - wait for a few seconds after user input(when user input devices become inactive) to update the database
2) WebSockets - update the database in real time
*/

function ContentEdit({ drawerWidth, slide
    // selectedSlideType, setSelectedSlideType,
    // options, setOptions,
    // question, setQuestion
}) {

    // useEffect(()=>{
    //     console.log(selectedSlideType);
    //     console.log(options);
    //     console.log(question);
    // },[options,selectedSlideType,question]);

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
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Content</Typography>
                <Divider sx={{ borderColor: 'black' }} />
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Slide Type</Typography>
                <SelectSlide 
                slide={slide}
                // selectedSlideType={selectedSlideType} setSelectedSlideType={setSelectedSlideType}
                />
                <Divider sx={{ borderColor: 'black' }} />
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Question</Typography>
                <QuestionInput 
                slide={slide}
                // question={question} setQuestion={setQuestion}
                />
                <Typography variant="body1" sx={{ p: 2, fontWeight: 'bold', textAlign: 'start' }}>Options</Typography>
                <OptionsInput 
                slide={slide}
                // options={options} setOptions={setOptions}
                />
                {/* time limit input component (maybe) */}
                {/* image input component */}
            </Drawer>
        </Box>
    );
}

export default ContentEdit;