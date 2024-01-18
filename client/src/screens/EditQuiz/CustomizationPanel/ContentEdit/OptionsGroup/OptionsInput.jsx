import { Button } from "@mui/material";
import { useState } from "react";
import MyOption from "./MyOption";
import {v4 as uuid} from 'uuid';

export default function OptionsInput({options, setOptions}) {

    const deleteOption = (idToDelete)=>{
        setOptions(options.filter((option)=>{
            return option.id !== idToDelete;
        }));
    }

    const handleClick = ()=>{
        setOptions((currentOptions)=>{
            return [...currentOptions, {id: uuid(), value: '', correct: false}];
        });
    }

    return (
        <div className="flex flex-col">
            {
                options.map((option, index) => {
                    return <MyOption key={option.id} option={option} deleteOption={deleteOption} number={index+1} setOptions={setOptions}/>;
                })
            }
            <Button variant="contained" sx={{my: 2 }} onClick={handleClick}>Add Option</Button>
        </div>
    );
}
