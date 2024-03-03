import { useEffect, useReducer } from "react";
import styles from "./JournalForm.module.css";
import Button from "./../Button/Button";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      timerId = setTimeout(() => {
        console.log("Очистка состояния");
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  const addJournalItem = (e) => {
    e.preventDefault(); // для того чтобы не уходило обновление страницы, а вместо этого просто нажималась кнопка и туда передавался e
    dispatchForm({ type: "SUBMIT" });
    //console.log(formProps);
  };

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          onChange={onChange}
          value={values.title}
          name="title"
          className={cn(styles["input-title"], {
            [styles["invalid"]]: !isValid.title,
          })}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/icon-date.svg" alt="icon-date" />
          <span>Date</span>
        </label>
        <input
          type="date"
          onChange={onChange}
          value={values.date}
          name="date"
          id="date"
          className={cn(styles["input"], {
            [styles["invalid"]]: !isValid.date,
          })}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img src="/icon-tag.svg" alt="icon-tag" />
          <span>Tag</span>
        </label>
        <input
          type="text"
          onChange={onChange}
          value={values.text}
          name="tag"
          id="tag"
          className={cn(styles["input"])}
        />
      </div>

      <textarea
        name="post"
        onChange={onChange}
        value={values.post}
        className={cn(styles["input"], {
          [styles["invalid"]]: !isValid.post,
        })}
      ></textarea>
      <Button text="Save" />
    </form>
  );
}

export default JournalForm;
