import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

function JournalAddButton({ clearForm }) {
  return (
    <CardButton className="journal-add" onClick={clearForm}>
      <img src="/plus.svg" alt="plus sign" />
      Add new journal entry
    </CardButton>
  );
}

export default JournalAddButton;
