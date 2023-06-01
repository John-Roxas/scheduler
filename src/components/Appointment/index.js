import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"; // Import the Form component
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const edit = () => {
    transition(EDIT);
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    console.log(mode);
    transition(SAVING);

    try {
      console.log(mode);
      await props.bookInterview(props.id, interview);

      await transition(SHOW);
    } catch (error) {
      console.error(error);
      transition(ERROR_SAVE);
    }
  }

  async function cancel() {
    try {
      await transition(DELETING);
      await props.cancelInterview(props.id);
      await transition(EMPTY);
      await props.transition(EMPTY);
    } catch (error) {
      transition(ERROR_DELETE);
    }
  }

  let display;
  if (
    props.interview &&
    mode !== "CONFIRM" &&
    mode !== "EDIT" &&
    mode !== "DELETING" &&
    mode !== "SAVING" &&
    mode !== "ERROR_SAVE" &&
    mode !== "ERROR_DELETE" &&
    props.mode !== "EMPTY"
  ) {
    display = (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirmDelete}
        onEdit={edit}
      />
    );
  } else if (mode === "ERROR_SAVE") {
    display = (
      <Error message={"Could not create component!"} onClose={props.back} />
    );
  } else if (props.mode === "CREATE" && !props.interview && mode !== "SAVING") {
    // Render the Form component when mode is "CREATE"

    display = (
      <Form
        onCancel={props.back}
        interviewers={props.interviewersForDay}
        onSave={save}
        bookInterview={props.bookInterview}
      />
    );
  } else if (mode === "CONFIRM") {
    display = (
      <Confirm
        message={"Are you sure you want to delete?"}
        onCancel={back}
        onConfirm={cancel}
      />
    );
  } else if (mode === "EDIT" && props.interview) {
    console.log(props.interview);
    display = (
      <Form
        onCancel={back}
        interviewers={props.interviewersForDay}
        name={props.interview.student}
        onSave={save}
        bookInterview={props.bookInterview}
      />
    );
  } else if (mode === "DELETING") {
    display = <Status message={"Deleting..."} />;
  } else if (mode === "SAVING") {
    display = <Status message={"Saving..."} />;
  } else {
    display = <Empty onAdd={props.onAdd} />;
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {display}
    </article>
  );
}
