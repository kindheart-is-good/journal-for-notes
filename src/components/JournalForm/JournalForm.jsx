import { useState } from "react";
import "./JournalForm.css";
import Button from "./../Button/Button";

function JournalForm({ onSubmit }) {
  const [inputData, setInputData] = useState("");

  const inputChange = (e) => {
    //console.log(e);
    console.log(e.target.value);
    console.log(inputData);
    setInputData(e.target.value);
  };

  const addJournalItem = (e) => {
    e.preventDefault(); // для того чтобы не уходило обновление страницы, а вместо этого просто нажималась кнопка и туда передавался e

    const formData = new FormData(e.target); //из FormData API
    const formProps = Object.fromEntries(formData);

    //console.log(formProps);
    onSubmit(formProps);
  };

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" />
      <input type="date" name="date" />
      <input type="text" name="tag" value={inputData} onChange={inputChange} />
      <textarea name="text"></textarea>
      <Button
        text="Save"
        onClick={() => {
          console.log("Clicked!");
        }}
      />
    </form>
  );
}

export default JournalForm;
