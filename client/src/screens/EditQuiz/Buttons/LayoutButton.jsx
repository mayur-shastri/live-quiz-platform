import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, alpha } from '@mui/material';
import theme from '../../../theme';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SquareIcon from '@mui/icons-material/Square';
import { blue } from '@mui/material/colors';

function LayoutButton({icon,selectedLayoutButton,setSelectedLayoutButton}) {

    const icons = {
        "default": <FilterListIcon/>,
        "imageLeft": <div className='flex flex-row justify-around'>
            <SquareIcon/>
            <ShortTextIcon/>
        </div>,
        "imageRight": <div className='flex flex-row justify-around'>
        <ShortTextIcon/>
        <SquareIcon/>
    </div>,
    }

    const handleClick = ()=>{
        setSelectedLayoutButton(icon);
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
                backgroundColor: selectedLayoutButton === icon ? alpha(blue[700], 0.1) : 'transparent', 
                color: theme.palette.primary,
                padding: 1,
            }}
        >
            {icons[icon]}
        </Button>
    );
}

export default LayoutButton;
