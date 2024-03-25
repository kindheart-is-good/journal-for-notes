import { useContext, useEffect, useReducer, useRef } from "react";
import styles from "./JournalForm.module.css";
import Button from "./../Button/Button";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
    dispatchForm({ type: "SET_VALUE", payload: { ...data } });
  }, [data, userId]);

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        //console.log("Очистка состояния");
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
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { userId },
    });
  }, [userId]);

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

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div className={styles["form-row"]}>
        <Input
          type="text"
          onChange={onChange}
          value={values.title}
          ref={titleRef}
          name="title"
          appearence="title"
          isValid={isValid.title}
        />
        {data?.id && (
          <button
            className={styles["delete"]}
            type="button"
            onClick={deleteJournalItem}
          >
            <img src="/icon-recycle-bin.svg" alt="Delete button" />
          </button>
        )}
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/icon-date.svg" alt="icon-date" />
          <span>Date</span>
        </label>
        <Input
          type="date"
          onChange={onChange}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          ref={dateRef}
          name="date"
          id="date"
          isValid={isValid.date}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img src="/icon-tag.svg" alt="icon-tag" />
          <span>Tag</span>
        </label>
        <Input
          type="text"
          onChange={onChange}
          value={values.text}
          name="tag"
          id="tag"
        />
      </div>

      <textarea
        name="post"
        onChange={onChange}
        value={values.post}
        ref={postRef}
        className={cn(styles["input"], {
          [styles["invalid"]]: !isValid.post,
        })}
      ></textarea>
      <Button>Save</Button>
    </form>
  );
}

export default JournalForm;
