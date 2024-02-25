import { useEffect, useRef } from "react";
import DefaultPreview from "../../../EditQuiz/SlidePreview/DefaultPreview";
import ImageLeftPreview from "../../../EditQuiz/SlidePreview/ImageLeftPreview";
import ImageRightPreview from "../../../EditQuiz/SlidePreview/ImageRightPreview";

export default function SlideView({ slide }) {

    const slideRef = useRef(slide);

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
        backgroundImage: slide.imageUrl ? `url(${slide.imageUrl})`: null,
        backgroundColor: slide.backgroundColor,
        // backgroundImage: `url('https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    } : {
        flexGrow: 1,
        backgroundColor: slide.backgroundColor,
    }

    return (
        slide.selectedLayoutButton === 'default' ?
            <div
                style={style}
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
                        // backgroundImage: `url('https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
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