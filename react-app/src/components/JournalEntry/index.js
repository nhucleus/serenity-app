import "./JournalEntry.css";

const JournalEntry = ({ entry }) => {
  return (
    <div className="journal-entry-container">
      <div className="journal-entry-title">
        {entry.title}
      </div>
      <div className="journal-entry-body">
        {entry.body}
      </div>
    </div>
  )
};

export default JournalEntry;