import SideNavbarTile from './SideNavbarTile.jsx';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/Quizaroo-logos_transparent.png';
import Typography from '@mui/material/Typography'

const drawerWidth = 240;

export default function SideNavbar() {

    const location = useLocation(); //gives current route. this hook runs every time the route changes

    const [selectedTile, setSelectedTile] = useState(location.pathname);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        // borderRight: 0,
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={logo} alt="Logo" style={{ height: '64px'}} />
                    <Typography variant="h5" color="initial">Quizaroo.com</Typography>
                </Toolbar>
                <Divider />
                <List>
                    <SideNavbarTile title="Home" to="/app/home" icon="home" selectedTile={selectedTile} setSelectedTile={setSelectedTile} />
                    <SideNavbarTile title="My Quizzes" to="/app/quizzes" icon="question_mark" selectedTile={selectedTile} setSelectedTile={setSelectedTile} />
                    <Divider />
                    <SideNavbarTile title="Help" to="/app/help" icon="info" selectedTile={selectedTile} setSelectedTile={setSelectedTile} />
                    <SideNavbarTile title="Feedback" to="/app/feedback" icon="feedback" selectedTile={selectedTile} setSelectedTile={setSelectedTile} />
                    <Divider />
                    <SideNavbarTile title="Participations" to="/app/participations" icon="participations" selectedTile={selectedTile} setSelectedTile={setSelectedTile} />
                </List> 
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default'}}
            >
            </Box>
         </Box>
    );
}