import "./JournalEntry.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJournalEntry } from "../../store/entries"


const JournalEntry = ({onClose}) => {
  const current = useSelector(state => state.entries.journals.current);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (current) {
      setTitle(current.title)
      setBody(current.body)
    }
  }, [current]);
  
  
  const submitJournal = () => {
    const entry = {
      title,
      body,
    }
    dispatch(createJournalEntry(entry));
    onClose()

  };

  return (
    <div className="journal-entry-container">
      <div className="journal-entry-header">
        New Journal Entry
      </div>
      <div className="journal-entry-title-input-container">
        <input value={title} onChange={(event) => setTitle(event.target.value)} className="journal-entry-title-input" type="text" placeholder="Title..." />
      </div>
      <div className="journal-entry-body-input-container">
        <textarea value={body} onChange={(event) => setBody(event.target.value)} className="journal-entry-body-input" placeholder="Body..." />
      </div>
      <div className="journal-entry-image-input-container">
        placeholder
      </div>
      <button onClick={submitJournal} className="journal-entry-submit">SUBMIT</button>
      

    </div>
  )
};

export default JournalEntry;