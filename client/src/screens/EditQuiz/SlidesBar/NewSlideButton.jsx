import { Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function NewSlideButton({onClick}) {

    return (
        <Button variant="contained"
         color="primary" 
         startIcon={<AddIcon />}
         onClick={onClick}
         size="small" sx={{mt: 1, mb: 1, ml: 1, mr: 1, borderRadius: '1rem'}}>
            New Slide
         </Button>
    );
}

export default NewSlideButton
