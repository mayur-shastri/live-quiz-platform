import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import QuizContext from '../../../Context Provider/QuizContext';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function MyOption({
    option, deleteOption, number,
    slide
}) {

    const { slides, setSlides } = useContext(QuizContext);

    const handleChange = (e) => {
        setSlides((currentSlides) => {
            return currentSlides.map((s) => {
                if (s.id === slide.id) {
                   const newOptions = s.options.map((option) => {
                        if (option.id === e.target.id) {
                            return { ...option, value: e.target.value };
                        }
                        return option;
                    });
                    return {...s, options: newOptions};
                }
                return s;
            });
        });
    }

    const handleCheck = (e) => {
        setSlides((currentSlides) => {
            return currentSlides.map((s) => {
                if (s.id === slide.id) {
                    const newOptions = s.options.map((option) => {
                        if (option.id === e.target.id) {
                            return { ...option, correct: e.target.checked };
                        }
                        return option;
                    });
                    return {...s, options: newOptions};
                }
                return s;
            })
        });
    }

    return (
        <div className="flex flex-row m-1.5">
            <Checkbox {...label}
                value={option.correct}
                id={option.id}
                checked={option.correct}
                onChange={handleCheck} />
            <input type="text"
                onChange={handleChange}
                value={option.value}
                id={option.id}
                placeholder={`Option ${number}`} />
            <IconButton aria-label="delete option" onClick={() => {
                deleteOption(option.id);
            }}>
                <CloseIcon />
            </IconButton>
        </div>
    );
}