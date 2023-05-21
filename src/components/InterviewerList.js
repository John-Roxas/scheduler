import React from "react";
import classNames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  let interviewers = props.interviewers;
  // console.log(interviewers);
  let listItems = [];
  interviewers.map((interviewer) => {
    // console.log(props.interviewer);
    listItems.push(
      <InterviewerListItem
        // id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listItems}</ul>
    </section>
  );
}
