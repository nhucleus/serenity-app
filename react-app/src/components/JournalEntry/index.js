import { useState } from "react";
import "./JournalEntry.css";
import JournalModal from "../JournalModal";
import { RiCloseCircleLine } from "react-icons/ri";
import { months } from "../../utils"

const JournalEntry = ({ entry }) => {

  const [modalOpen, setModalOpen] = useState(false);


  const date = new Date(entry.created_at)
  return (
    <div className="journal-entry-container">
      <div className="journal-entry-date">
        {months[date.getUTCMonth()]}{" "}{date.getUTCDate()}, {date.getUTCFullYear()}
      </div>
      <div className="journal-entry-title">
        {entry.title}
      </div>
      <div className="journal-entry-body">
        {entry.body}
      </div>
      <div className="journal-entry-photo">
        {entry.photo && <img onClick={() => setModalOpen(true)} src={entry.photo} />}
        <JournalModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="full-photo-container">
            <img className="full-photo" src={entry.photo} />
            <RiCloseCircleLine className="photo-modal-close" onClick={() => setModalOpen(false)} />
          </div>
          
        </JournalModal>
      </div>
    </div>
  );
};

export default JournalEntry;