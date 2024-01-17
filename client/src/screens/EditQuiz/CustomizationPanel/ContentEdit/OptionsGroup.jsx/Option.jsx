import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Option() {
    return (
        <div className="flex flex-row">
            <Checkbox {...label} />
            <input type="text" placeholder="Option" />
            <IconButton aria-label="delete">
                <CloseIcon/>
            </IconButton>
        </div>
    );
}