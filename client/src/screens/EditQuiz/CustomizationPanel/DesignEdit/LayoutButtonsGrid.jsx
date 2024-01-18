import LayoutButton from "../../Buttons/LayoutButton";

function LayoutButtonsGrid({selectedLayoutButton,setSelectedLayoutButton}) {
    return (
        <div className='grid grid-cols-3 gap-4 mx-auto '>
            <LayoutButton icon="default" selectedLayoutButton={selectedLayoutButton} setSelectedLayoutButton={setSelectedLayoutButton}/>
            <LayoutButton icon="imageLeft" selectedLayoutButton={selectedLayoutButton} setSelectedLayoutButton={setSelectedLayoutButton}/>
            <LayoutButton icon="imageRight" selectedLayoutButton={selectedLayoutButton} setSelectedLayoutButton={setSelectedLayoutButton}/>
        </div>
    );
}

export default LayoutButtonsGrid;
