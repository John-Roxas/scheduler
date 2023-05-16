import React from "react";
import classNames from "classnames";
import DayListItem from "components/DayListItem";

import "components/DayList.scss";

export default function DayList(props) {
  // console.log(props.days);

  let days = props.days;

  // console.log(days);

  let listItems = [];
  days.map((day) => {
    listItems.push(
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={day.setDay}
      />
    );
  });

  // console.log(listItems);

  return <ul>{listItems}</ul>;
}
