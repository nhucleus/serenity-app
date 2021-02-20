import ReactDOM from "react-dom";
import "./JournalModal.css";
import { RiCloseCircleLine } from "react-icons/ri";

const JournalModal = ({ open, children, onClose, draw }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={ draw ? null : onClose }></div>
      <div className="journal-modal">
        {children}
        {draw && <RiCloseCircleLine className="photo-modal-close" onClick={onClose}/>}
      </div>
      
    </>,
    document.getElementById("journal-portal")
  );
};

export default JournalModal;