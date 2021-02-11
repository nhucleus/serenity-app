import ReactDOM from "react-dom";
import "./JournalModal.css";

const JournalModal = ({ open, children, onClose }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="journal-modal">{children}</div>
    </>,
    document.getElementById("journal-portal")
  );
};

export default JournalModal;