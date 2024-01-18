import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import NewSlideButton from './NewSlideButton';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import SlideSelectButton from './SlideSelectButton';

const drawerWidth = 180;

export default function SlidesBar() {

    const [slides, setSlides] = useState([]);

    const handleDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) {
            return;
        }
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }
        setSlides((currentSlides) => {
            const newSlides = Array.from(currentSlides);
            const [removed] = newSlides.splice(source.index, 1);
            newSlides.splice(destination.index, 0, removed);
            return newSlides;
        });
    }

    const addSlide = () => {
        setSlides((currentSlides) => {
            const newSlide = {
                id: uuid(),
                slideData: {
                    type: 'Single Correct MCQ'
                },
            }
            return [...currentSlides, newSlide];
        });
    }

    const deleteSlide = (id)=>{
        setSlides((currentSlides)=>{
            return currentSlides.filter((slide)=>{
                return slide.id !== id;
            });
        });
    }

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
                        mt: 10,
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    <NewSlideButton onClick={addSlide} />
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="slides">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {slides.map((slide, index) => {
                                        return (
                                            <Draggable key={slide.id} draggableId={slide.id} index={index}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <SlideSelectButton deleteSlide={()=>{deleteSlide(slide.id);}} slideData={slide.slideData} number={index+1}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default' }}
            >
            </Box>
        </Box>
    );
}