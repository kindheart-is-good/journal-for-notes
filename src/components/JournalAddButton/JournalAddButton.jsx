import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

function JournalAddButton() {
  return (
    <CardButton className="journal-add">
      <img src="/plus.svg" alt="plus sign" />
      Add new journal entry
    </CardButton>
  );
}

export default JournalAddButton;
