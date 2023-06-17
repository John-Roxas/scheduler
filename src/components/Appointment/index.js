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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const edit = () => {
    transition(EDIT);
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    let error = false;
    props
      .bookInterview(props.id, interview)
      .then(() => {})
      .catch(() => {
        transition(ERROR_SAVE, true);
        error = true;
      })
      .finally(() => {
        if (error === false) {
          transition(SHOW, true);
        }
      });
  }

  function cancel() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY, true))
      .catch(() => {
        transition(DELETING, true);
        transition(ERROR_DELETE, true);
      });
  }
  let display;
  if (mode === "SHOW") {
    display = (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirmDelete}
        onEdit={edit}
      />
    );
  } else if (mode === "ERROR_SAVE") {
    display = <Error message={"Could not create component!"} onClose={back} />;
  } else if (mode === "ERROR_DELETE") {
    display = <Error message={"Could not delete component!"} onClose={back} />;
  } else if (mode === "CREATE") {
    display = (
      <Form
        onCancel={back}
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
  } else if (mode === "EDIT") {
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
    display = <Empty onAdd={() => transition(CREATE)} />;
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {/* <p>TEST</p> */}
      {display}
    </article>
  );
}
