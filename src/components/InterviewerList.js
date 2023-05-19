import React from "react";
import classNames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  let interviewers = props.interviewers;
  let listItems = [];
  interviewers.map((interviewer) => {
    listItems.push(
      <InterviewerListItem
        name={interviewer.name}
        avatar={interviewer.avatar}
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
