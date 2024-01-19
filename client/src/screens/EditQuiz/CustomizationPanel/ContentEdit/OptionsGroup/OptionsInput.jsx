import { Button } from "@mui/material";
import { useState } from "react";
import MyOption from "./MyOption";
import {v4 as uuid} from 'uuid';
import { useContext } from "react";
import QuizContext from "../../../Context Provider/QuizContext";

export default function OptionsInput({
    slide
}) {

    const {slides, setSlides} = useContext(QuizContext);

    const deleteOption = (idToDelete)=>{
        setSlides((currentSlides)=>{
            return currentSlides.map((s)=>{
                if(s.id === slide.id){
                    const newOptions = s.options.filter((option)=>{
                        return option.id !== idToDelete;
                    });
                    return {...s, options:  newOptions};
                }
                return s;
            })
        });
    }

    const handleClick = ()=>{
        setSlides((currentSlides)=>{
            return currentSlides.map((s)=>{
                if(s.id === slide.id){
                    const newOptions = [...s.options, {id: uuid(), value: '', correct: false}];
                    return {...s, options: newOptions};
                }
                return s;
            })
        });
    }

    return (
        <div className="flex flex-col">
            {
                slides.map((s)=>{
                    if(s.id === slide.id){
                        return s.options.map((option, index)=>{
                            return <MyOption 
                            key={option.id} option={option}
                            deleteOption={deleteOption} 
                            number={index+1} 
                            slide={slide}
                            />
                        })
                    }
                })
            }
            <Button variant="contained" sx={{my: 2 }} onClick={handleClick}>Add Option</Button>
        </div>
    );
}
