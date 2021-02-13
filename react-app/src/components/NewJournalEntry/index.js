import "./NewJournalEntry.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJournalEntry, editJournalEntry } from "../../store/entries"
import {RiHeartAddLine} from "react-icons/ri"
import {FiMinusCircle} from "react-icons/fi"


const NewJournalEntry = ({onClose}) => {
  const current = useSelector(state => state.entries.journals.current);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (current) {
      setTitle(current.title)
      setBody(current.body)
      setPreview(current.photo)
    }
  }, [current]);
  
  const updatePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  
  const submitJournal = () => {
    const entry = {
      title,
      body,
    }
    if (current) {
      console.log("PREVIEW", preview)
      console.log("CURETTNT", current.photo)
      entry.id = current.id
      if (preview !== current.photo) {
        dispatch(editJournalEntry(entry, photo));
      } else {
        dispatch(editJournalEntry(entry, null, preview));
      }
    } else {
      if (photo) {
        dispatch(createJournalEntry(entry, photo));
      } else {
        dispatch(createJournalEntry(entry));
      }
    }
    
    onClose();

  };

  return (
    <div className="new-journal-entry-container">
      <div className="journal-entry-header">
        {current ? "Edit Today's Entry" : "New Journal Entry"}
      </div>
      <div className="journal-entry-title-input-container">
        <input value={title} onChange={(event) => setTitle(event.target.value)} className="journal-entry-title-input" type="text" placeholder="Title" />
      </div>
      <div className="journal-entry-body-input-container">
        <textarea value={body} onChange={(event) => setBody(event.target.value)} className="journal-entry-body-input" />
      </div>
      <div className="journal-entry-photo-input-container">
        <div className="journal-entry-photo-label">Photo (Optional)</div>
        <div className="photo-buttons">
          <label htmlFor="photo-input" className="photo-upload">
                <RiHeartAddLine className="upload-heart"/>
          </label>
          {preview && <FiMinusCircle onClick={() => {
            setPhoto(null);
            setPreview(null);
            document.getElementById("photo-input").value = ""
          }} className="remove-heart"/>}
        </div>
        <input id="photo-input" type="file" onChange={updatePhoto}></input>
        {preview && <img className="photo-preview" src={preview} alt="photo"/>}
      </div>
      <button onClick={submitJournal} className="journal-entry-submit">SUBMIT</button>
      

    </div>
  )
};

export default NewJournalEntry;