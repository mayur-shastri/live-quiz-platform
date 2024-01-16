import { Divider, Drawer, List, Toolbar, Typography, Container, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import PanelButton from "../Buttons/PanelButton";
import ContentEdit from "./ContentEdit";

export default function CustomizationPanel() {

    const location = useLocation();
    const [selectedPanelButton, setSelectedPanelButton] = useState('content');

    const panelWidth = 500;
    const drawerWidth = 350;

    return (
        <Container sx={{
            display: 'flex',
            width: panelWidth,
            margin: '1.2rem',
            border: '1px solid black',
            borderRadius: '10px',
            height: 'calc(100vh - 120px)',
            marginLeft: 'auto',
            padding: '0',
        }}>
            <ContentEdit drawerWidth={drawerWidth}/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '30%',
                border: '1px solid black',
                borderRadius: '10px',
                width: panelWidth - drawerWidth ,
                mt: '1rem',
                ml: '1rem',
            }}>
                <PanelButton text="Content" icon="content" selectedPanelButton={selectedPanelButton} setSelectedPanelButton={setSelectedPanelButton}/>
                <PanelButton text="Design" icon="design" selectedPanelButton={selectedPanelButton} setSelectedPanelButton={setSelectedPanelButton}/>
            </Box>
        </Container>
    );
}