import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewersClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  let showname;
  if (props.selected) {
    showname = props.name;
  } else {
    showname = "";
  }

  return (
    <li
      onClick={() => props.setInterviewer(props.setInterviewer)}
      className={interviewersClass}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showname}
    </li>
  );
}
