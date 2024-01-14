import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { cloneElement } from 'react';

const icons = {
    "home": <HomeIcon />,
    "question_mark": <QuestionMarkIcon />,
    "trash": <FolderDeleteIcon />,
    "info": <InfoIcon />,
    "feedback": <FeedbackIcon/>
}

export default function SideNavbarTile({ title, to, icon, selectedTile, setSelectedTile}) {
    
    const handleClick = () => {
        setSelectedTile(to);
    }

    return (
        <Link to={to} className={selectedTile === to ? 'text-blue-700': ''}>
        <ListItem key={title}>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {cloneElement(icons[icon], { color: selectedTile === to ? 'primary' : 'action' })}
                </ListItemIcon>
                {title}
            </ListItemButton>
        </ListItem>
        </Link>
    );
}   