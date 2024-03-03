import { useEffect, useRef } from "react";
import DefaultPreview from "../../../EditQuiz/SlidePreview/DefaultPreview";
import ImageLeftPreview from "../../../EditQuiz/SlidePreview/ImageLeftPreview";
import ImageRightPreview from "../../../EditQuiz/SlidePreview/ImageRightPreview";

export default function SlideView({ slide, scaleX = 1, scaleY = 1, infoCardPreview=false }) {

    useEffect(()=>{
        console.log("Logging slide in SlideView",slide);
    }, [slide]);

    if(!slide){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    const style = slide.imageUrl !== null ? {
        flexGrow: 1,
        backgroundImage: !infoCardPreview && slide.imageUrl ? `url(${slide.imageUrl})`: null,
        backgroundColor: slide.backgroundColor,
    } : {
        flexGrow: 1,
        backgroundColor: slide.backgroundColor,
    }

    const scaledStyle = {
        ...style,
        transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
        transformOrigin: '0 0',
        width: `${100 / scaleX}%`,
        height: `${100 / scaleY}%`,
    };

    return (
        slide.selectedLayoutButton === 'default' || infoCardPreview?
            <div
                style={scaledStyle}
            >
                <DefaultPreview slide={slide} />
            </div>
        : slide.selectedLayoutButton === 'imageLeft' ?
            <div className="w-full"
            style={{backgroundColor: slide.backgroundColor,}}>
                <div className="flex flex-row  h-full w-full">
                    <div 
                    style={{
                        flexShrink: 0,
                        backgroundImage: slide.imageUrl ? `url(${slide.imageUrl})`: null,
                    }}
                    className="w-72 rounded-2xl"
                    >
                    </div>
                    <ImageLeftPreview slide={slide} />
                </div>
            </div>
        : slide.selectedLayoutButton === 'imageRight' ?
        <div className="w-full" 
        style={{backgroundColor: slide.backgroundColor,}}>
            <div className="flex flex-row justify-between h-full w-full">
            <ImageRightPreview slide={slide} />
                    <div 
                    style={{
                        flexShrink: 0,
                        backgroundImage: slide.imageUrl ? `url(${slide.imageUrl})`: null,
                    }}
                    className="w-72 rounded-2xl"
                    >
                    </div>
                </div>
        </div>
            : null
    );
}