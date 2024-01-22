import Typography from '@mui/material/Typography'
function DefaultPreview({slide}) {
    return (
        <div>
            <Typography sx={{textAlign: 'left', margin: 2, mt: 5, wordBreak: 'break-all'}} variant="h2" color={slide.textColor}>{slide.question.heading}</Typography>
            <Typography sx={{textAlign: 'left', margin: 2}} variant="body2" color={slide.textColor}>{slide.question.description}</Typography>
        </div>
    );
}

export default DefaultPreview;