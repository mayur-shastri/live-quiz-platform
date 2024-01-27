import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
function DropMenuItem({ title, handleClose, icon }) {

    const icons = {
        'logout': <LogoutIcon sx={{mr: 2}}/>,
        'profile': <PersonOutlineIcon sx={{mr: 2}}/>
    }

    return (
            <div className='flex flex-row justify-between items-center w-64 p-2 hover:bg-gray-200 cursor-pointer'
            onClick={()=>{
                handleClose(title);
            }}
            >
                <Typography variant="body1" 
                color="initial"
                sx={{ml: 2}}
                >{title}</Typography>
                {
                    icons[icon]
                }
            </div>
    );
}

export default DropMenuItem;
