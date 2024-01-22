import React, { useContext } from 'react'
import { MuiColorInput } from 'mui-color-input'
import QuizContext from '../../Context Provider/QuizContext'

const BackgroundColorPicker = ({ slide }) => {

    const { setSlides } = useContext(QuizContext);

    const handleChange = (newValue) => {
        setSlides((currentSlides) => {
            return currentSlides.map((s) => {
                if (s.id === slide.id) {
                    return { ...s, backgroundColor: newValue }
                };
                return s;
            });
        });
    }

    return <MuiColorInput value={slide.backgroundColor} onChange={handleChange} />
}

export default BackgroundColorPicker;