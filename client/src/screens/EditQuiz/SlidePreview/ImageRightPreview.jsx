import { Typography } from '@mui/material';
import React from 'react'

function ImageRightPreview({slide}) {
    return (
        <div className='flex flex-col h-full'>
            <Typography sx={{textAlign: 'left', margin: 2, mt: 5,  wordBreak: 'break-all'}} variant="h3" color="initial">{slide.question.heading}</Typography>
            <Typography sx={{textAlign: 'left', margin: 2}} variant="body2" color="initial">{slide.question.description}</Typography>
            {/* component to show votes */}
        </div>
    );
}

export default ImageRightPreview;
