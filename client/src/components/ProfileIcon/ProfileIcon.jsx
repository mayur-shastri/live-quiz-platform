import React, { useContext } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import DropMenuItem from './DropMenuItem';
import {instance as configuredAxios} from '../../axiosConfig';
import FlashContext  from '../../context providers/Flash/FlashContext';
function ProfileIcon() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const {setIsVisible, setFlashMessage, setFlashType} = useContext(FlashContext);
    const handleProfileIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logOut = async ()=>{
            const res = await configuredAxios.get('/logout');
            if(res.status === 200){
                window.location.href = '/';
            }
            // FlashContext is not available in edit quiz
            // setIsVisible(true);
            // setFlashMessage(res.data.message);
            // setFlashType(res.data.type);
    }

    const handleClose = (buttonType) => {
        setAnchorEl(null);
        if(buttonType === 'Logout'){
            logOut();
        } else if(buttonType === 'Edit Profile'){
            // Edit Profile
        }
    };

    return (
        <div>
            <div className="flex flex-row justify-center items-center p-2"
                style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'gray', marginLeft: '10px' }}
                onClick={handleProfileIconClick}
            >
                <AccountCircleIcon />
            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{marginTop: '1rem',padding: '2rem',}}
            >
                <DropMenuItem title="Logout" handleClose={handleClose} icon="logout" />
                <DropMenuItem title="Edit Profile" handleClose={handleClose} icon="profile" />
                {/* Add more menu items here */}
            </Menu>
        </div>
    );
}

export default ProfileIcon;