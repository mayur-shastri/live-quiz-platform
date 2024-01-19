import DefaultPreview from "./DefaultPreview";
import ImageLeftPreview from "./ImageLeftPreview";
import ImageRightPreview from "./ImageRightPreview";

export default function SlidePreview({slide}){

    return (

        <div className="border border-black m-7 mr-0" style={{flexGrow: 1}}>
            {
            slide.selectedLayoutButton === 'default'?
                <DefaultPreview/>
            : slide.selectedLayoutButton === 'imageLeft'?
                <ImageLeftPreview/> 
            : slide.selectedLayoutButton === 'imageRight'?
                <ImageRightPreview/>
            : null
            }
        </div>
    );
}