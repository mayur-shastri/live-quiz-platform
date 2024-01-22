import DefaultPreview from "./DefaultPreview";
import ImageLeftPreview from "./ImageLeftPreview";
import ImageRightPreview from "./ImageRightPreview";

export default function SlidePreview({ slide }) {

    const style = slide.backgroundImageUrl !== null ? {
        flexGrow: 1,
        // backgroundImage: `url(${slide.imageUrl})`,
        backgroundColor: slide.backgroundColor,
        backgroundImage: `url('https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    } : {
        flexGrow: 1,
        backgroundColor: slide.backgroundColor,
    }

    return (
        slide.selectedLayoutButton === 'default' ?
            <div className="border border-black m-7 mr-0 rounded-2xl"
                style={style}
            >
                <DefaultPreview slide={slide} />
            </div>
        : slide.selectedLayoutButton === 'imageLeft' ?
            <div className="border border-black m-7 mr-0 rounded-2xl w-full"
            style={{backgroundColor: slide.backgroundColor,}}>
                <div className="flex flex-row  h-full w-full">
                    <div 
                    style={{
                        flexShrink: 0,
                        // backgroundColor: slide.backgroundColor,
                        backgroundImage: `url('https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    }}
                    className="w-72 rounded-2xl"
                    >
                    </div>
                    <ImageLeftPreview slide={slide} />
                </div>
            </div>
        : slide.selectedLayoutButton === 'imageRight' ?
        <div className="border border-black m-7 mr-0 rounded-2xl w-full" 
        style={{backgroundColor: slide.backgroundColor,}}>
            <div className="flex flex-row justify-between h-full w-full">
            <ImageRightPreview slide={slide} />
                    <div 
                    style={{
                        flexShrink: 0,
                        backgroundImage: `url('https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    }}
                    className="w-72 rounded-2xl"
                    >
                    </div>
                </div>
        </div>
            : null
    );
}