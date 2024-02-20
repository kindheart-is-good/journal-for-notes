import "./Button.css";
import { useState } from "react";

function Button() {
  const [text, setText] = useState("Start");

  const clickHandler = () => {
    setText("Yo!!!");
    console.log("click");
  };

  return (
    <button onClick={clickHandler} className="button accent">
      {text}
    </button>
  );
}

export default Button;
