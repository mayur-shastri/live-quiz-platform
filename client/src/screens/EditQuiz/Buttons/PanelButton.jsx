import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { alpha } from '@mui/system';
import { blue } from '@mui/material/colors';
import theme from '../../../theme';
export default function PanelButton({ text, icon, selectedPanelButton, setSelectedPanelButton }) {

    const icons = {
        "content": <EditIcon />,
        "design": <ColorLensIcon />
    }

    const handleClick = ()=>{
        setSelectedPanelButton(icon);
    }

    return (
        <Button
            variant="outlined"
            onClick={handleClick}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: selectedPanelButton === icon ? alpha(blue[700], 0.1) : 'transparent', 
                color: theme.palette.primary,
            }}
        >
            {icons[icon]}
            {text}
        </Button>
    );
}