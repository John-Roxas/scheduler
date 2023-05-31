import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"; // Import the Form component
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const confirmDelete = () => {
    console.log(mode);
    transition(CONFIRM);
    console.log(mode);
  };

  const edit = () => {
    console.log("TRYING TO EDIT");
    transition(EDIT);
    console.log(mode);
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    props.bookInterview(props.id, interview);
    // console.log(interview);
    transition(SHOW);
  };

  const cancel = () => {
    console.log("Delete Successful!");
    props.cancelInterview(props.id);
    transition(EMPTY);
    props.transition(EMPTY);
  };

  let display;
  if (props.interview && mode !== "CONFIRM" && mode !== "EDIT") {
    display = (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirmDelete}
        onEdit={edit}
      />
    );
  } else if (props.mode === "CREATE" && !props.interview) {
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
