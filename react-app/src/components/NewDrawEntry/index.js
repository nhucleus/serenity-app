import "./NewDrawEntry.css"
import CanvasDraw from "react-canvas-draw";
import {useState, useRef, useEffect} from "react";
import {GrBrush} from "react-icons/gr"
import {useDispatch} from "react-redux";
import {createDrawing } from "../../store/entries"

const NewDrawEntry = ({addEvent}) => {
    const dispatch = useDispatch()
  const [color, setColor] = useState("#a68cc6");
  const [image, setImage] = useState();
  const [brushSize, setBrushSize] = useState(6)
   const [title, setTitle] = useState("");
  const drawRef = useRef();

  const submitDrawing = async () => {
    const canvas = {
      title,
      image
    }
    const drawing = await dispatch(createDrawing(canvas))
    console.log(drawing)
    addEvent(drawing)
  };

  return (
    <div className="new-draw-container">
      <div className="new-draw-header">DRAW</div>
      <div className="new-draw-subheader">What made you smile today?</div>
      <div className="canvas-and-picker">

        <CanvasDraw
          ref={drawRef}
          onChange={() => setImage(drawRef.current.getSaveData())}
          className="canvas-entry"
          hideGrid={true}
          canvasWidth={600}
          canvasHeight={600}
          brushColor={color}
          lazyRadius={0}
          brushRadius={brushSize}
          catenaryColor={color}
        />
        <div className="picker-and-brush">
        <div className="color-picker">
          <div onClick={() => setColor("#9e1515")} className="color-choice dark-red"></div>
          <div onClick={() => setColor("#e12120")} className="color-choice red"></div>
          <div onClick={() => setColor("#fa8223")} className="color-choice orange"></div>
          <div onClick={() => setColor("#fbb124")} className="color-choice yellow"></div>
          <div onClick={() => setColor("#06a40b")} className="color-choice dark-green"></div>
          <div onClick={() => setColor("#a6d609")} className="color-choice light-green"></div>
          <div onClick={() => setColor("#6b3fa0")} className="color-choice purple"></div>
          <div onClick={() => setColor("#a68cc6")} className="color-choice lavender"></div>
          <div onClick={() => setColor("#3895d3")} className="color-choice blue"></div>
          <div onClick={() => setColor("#bcdeff")} className="color-choice light-blue"></div>
          <div onClick={() => setColor("#49311d")} className="color-choice brown"></div>
          <div onClick={() => setColor("#dc9456")} className="color-choice tan"></div>
          <div onClick={() => setColor("black")} className="color-choice black"></div>
          <div onClick={() => setColor("grey")} className="color-choice grey"></div>
          
        </div>
        <div className="brush-size">
            <div className="brush-size-header">
                <GrBrush className="brush-icon"/>
                <span className="brush-size-text">Brush Size</span>
            </div>
            <div className="brush-choices">
                <div onClick={() => setBrushSize(4)} className="choice-one">
                    <div style={{"background-color": color}} className="choice-one-circle" />
                    <div className="choice-text one">Small</div>
                </div>
                <div onClick={() => setBrushSize(6)} className="choice-two">
                    <div style={{"background-color": color}} className="choice-two-circle" />
                    <div className="choice-text two">Medium</div>
                </div>
                <div onClick={() => setBrushSize(8)} className="choice-three">
                    <div style={{"background-color": color}} className="choice-three-circle" />
                    <div className="choice-text three">Large</div>
                </div>
            </div>
        </div>
        </div>
        
      </div>
       <div className="journal-entry-title-input-container drawing">
        <input value={title} onChange={(event) => setTitle(event.target.value)} className="journal-entry-title-input" type="text" placeholder="Title" />
      </div>
      <div className="canvas-utils">
        <button
          className="canvas-utils-button"
          onClick={() => {
            drawRef.current.undo();
          }}
        >
          Undo
            </button>
        <button
          className="canvas-utils-button"
          onClick={() => {
            drawRef.current.clear();
          }}
        >
          Clear
          </button>
      </div>
      <div className="save-draw-button">
        <button onClick={submitDrawing} className="drawing-submit">SAVE</button>    
      </div>
      
    </div>
   
  )
};

export default NewDrawEntry;