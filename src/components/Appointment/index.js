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
    props.cancelInterview(props.id);
    props.back();
  };

  let display;
  if (props.interview && props.mode !== "CONFIRM") {
    display = (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={props.confirmDelete}
      />
    );
  } else if (props.mode === "CREATE") {
    // Render the Form component when mode is "CREATE"

    display = (
      <Form
        onCancel={props.back}
        interviewers={props.interviewersForDay}
        onSave={save}
        bookInterview={props.bookInterview}
      />
    );
  } else if (props.mode === "CONFIRM") {
    display = (
      <Confirm
        message={"Are you sure you want to delete?"}
        onCancel={props.back}
        onConfirm={cancel}
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
