import "./JournalEntry.css";
const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

const JournalEntry = ({ entry }) => {
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
        {entry.photo && <img src={entry.photo} />}
      </div>
    </div>
  )
};

export default JournalEntry;