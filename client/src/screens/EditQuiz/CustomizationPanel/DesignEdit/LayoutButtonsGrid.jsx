import LayoutButton from "../../Buttons/LayoutButton";

function LayoutButtonsGrid({
    // selectedLayoutButton,setSelectedLayoutButton
    slide
}) {
    return (
        <div className='grid grid-cols-3 gap-4 mx-auto '>
            <LayoutButton icon="default" 
            slide={slide}
            // selectedLayoutButton={selectedLayoutButton} setSelectedLayoutButton={setSelectedLayoutButton}
            />
            <LayoutButton icon="imageLeft" 
            slide={slide}
            // selectedLayoutButton={selectedLayoutButton} setSelectedLayoutButton={setSelectedLayoutButton}
            />
            <LayoutButton icon="imageRight" 
            slide={slide}
            // selectedLayoutButton={selectedLayoutButton} setSelectedLayoutButton={setSelectedLayoutButton}
            />
        </div>
    );
}

export default LayoutButtonsGrid;
