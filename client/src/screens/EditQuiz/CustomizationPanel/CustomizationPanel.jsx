import { Divider, Drawer, List, Toolbar, Typography, Container, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PanelButton from "../Buttons/PanelButton";
import ContentEdit from "./ContentEdit/ContentEdit";
import DesignEdit from "./DesignEdit/DesignEdit";
import QuizContext from "../Context Provider/QuizContext";

export default function CustomizationPanel({
    slide,
}) {

    useEffect(() => {
        console.log(slide);
    });

    const { selectedPanelButton, setSelectedPanelButton } = useContext(QuizContext);
    const panelWidth = 500;
    const drawerWidth = 350;

    return (
        <Container sx={{
            display: 'flex',
            width: panelWidth,
            margin: '1.2rem',
            // border: '1px solid black',
            borderRadius: '10px',
            height: 'calc(100vh - 120px)',
            marginLeft: 'auto',
            padding: '0',
        }}>
            {selectedPanelButton === 'content' ?
                <ContentEdit drawerWidth={drawerWidth} slide={slide}
                />
                : <DesignEdit drawerWidth={drawerWidth}
                    slide={slide}
                />}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '30%',
                border: '1px solid black',
                borderRadius: '10px',
                width: panelWidth - drawerWidth,
                mt: '1rem',
                ml: '1rem',
            }}>
                <PanelButton text="Content" icon="content" />
                <PanelButton text="Design" icon="design" />
            </Box>
        </Container>
    );
}