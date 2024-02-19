import "./App.css";
import Button from "./components/Button/Button";
import JournalItem from "./components/JournalItem/JournalItem";

function App() {
  const data = [
    {
      title: "Item",
      text: "Some text",
      date: new Date(),
    },
    {
      title: "Item2",
      text: "Some text one more",
      date: new Date(),
    },
  ];

  return (
    <>
      <h1>Starting</h1>
      <Button />
      <JournalItem
        title={data[0].title}
        date={data[0].date}
        text={data[0].text}
      />
    </>
  );
}

export default App;
