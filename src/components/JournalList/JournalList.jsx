import "./JournalList.css";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";

function JournalList({ items }) {
  if (items.length === 0) {
    return (
      <p>
        <div>There are no entries in the journal right now.</div>
        <div>Add the first one.</div>
      </p>
    );
  }

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <>
      {items.sort(sortItems).map((el) => (
        <CardButton key={el.id}>
          <JournalItem title={el.title} post={el.post} date={el.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;