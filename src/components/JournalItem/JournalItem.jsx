import "./JournalItem.css";

function JournalItem({ title, date, post }) {
  //const formattedDate = date.toString();
  //const formattedDate = date.toDateString();
  const formattedDate = new Intl.DateTimeFormat("ru-RU").format(date);

  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{formattedDate}</div>
        <div className="journal-item__text">{post}</div>
      </h2>
    </>
  );
}

export default JournalItem;
