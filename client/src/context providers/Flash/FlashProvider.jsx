import { useState } from "react";
import FlashContext from "./FlashContext";

function FlashProvider({ children }) {

    const [flashMessage, setFlashMessage] = useState('');
    const [flashType, setFlashType] = useState('success');
    const [isVisible, setIsVisible] = useState(false); //set to false after testing

    return (
        <FlashContext.Provider value={
            {
                flashMessage, setFlashMessage,
                flashType, setFlashType,
                isVisible, setIsVisible,
            }
        }>
            {children}
        </FlashContext.Provider>
    );
}

export default FlashProvider;
