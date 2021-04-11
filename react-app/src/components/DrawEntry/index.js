import "./DrawEntry.css";
import CanvasDraw from "react-canvas-draw";
const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];



const DrawEntry = ({ drawing }) => {

    const date = new Date(drawing.created_at);
    
    return (
        <div className="draw-container">
            <div className="draw-date">
                {months[date.getUTCMonth()]}{" "}{date.getUTCDate()}, {date.getUTCFullYear()}
            </div>
            <div className="draw-title">
                {drawing.title}
            </div>
            <div className="draw-body">
                <CanvasDraw
                    disabled
                    hideGrid
                    brushRadius={0}
                    lazyRadius={0}
                    saveData={drawing.image}
                    canvasWidth={600}
                    canvasHeight={600}
                />
            </div>
        </div>
        
    );
};

export default DrawEntry;