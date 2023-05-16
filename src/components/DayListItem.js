import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  let spotText = "";
  if (props.spots === 0) {
    spotText = "no spots remaining";
  } else if (props.spots === 1) {
    spotText = "1 spot remaining";
  } else {
    spotText = props.spots + " spots remaining";
  }

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotText}</h3>
    </li>
  );
}
