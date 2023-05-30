import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"; // Import the Form component

export default function Appointment(props) {
  console.log("IN APPOINTMENT!");
  console.log(props.interviewersForDay);
  let display;
  if (props.interview) {
    display = (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    );
  } else if (props.mode === "CREATE") {
    // Render the Form component when mode is "CREATE"

    display = (
      <Form onCancel={props.back} interviewers={props.interviewersForDay} />
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
