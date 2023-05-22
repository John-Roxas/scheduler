import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  // console.log(props.interviewer);
  let display;
  if (props.interview) {
    display = (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    );
  } else {
    display = <Empty />;
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {display}
    </article>
  );
}
