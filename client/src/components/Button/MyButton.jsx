import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Button } from '@mui/material';

export default function MyButton({ icon, text, onClick }) {

    const icons = {
        "plusIcon": <AddIcon />,
        "groupAddIcon": <GroupAddIcon />
    }

    return (
        <Button variant="contained" 
        startIcon={icons[icon]} 
        onClick={onClick}
        sx={{marginLeft: '1rem', borderRadius: '1.5rem', padding: '1rem'}}>
            {text}
        </Button>
    );
}