import "./App.css";
import Button from "./components/Button/Button";
import CardButton from "./components/CardButton/CardButton";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalItem from "./components/JournalItem/JournalItem";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";

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
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          <CardButton>
            <JournalItem
              title={data[0].title}
              date={data[0].date}
              text={data[0].text}
            />
          </CardButton>
          <CardButton>
            <JournalItem
              title={data[1].title}
              date={data[1].date}
              text={data[1].text}
            />
          </CardButton>
        </JournalList>
      </LeftPanel>
      <Body>
        Body
        <Button />
      </Body>
    </div>
  );
}

export default App;
