import LayoutButton from "../../Buttons/LayoutButton";

function LayoutButtonsGrid({
    slide
}) {
    return (
        <div className='grid grid-cols-3 gap-4 mx-auto '>
            <LayoutButton icon="default" 
            slide={slide}
            />
            <LayoutButton icon="imageLeft" 
            slide={slide}
            />
            <LayoutButton icon="imageRight" 
            slide={slide}
            />
        </div>
    );
}

export default LayoutButtonsGrid;
