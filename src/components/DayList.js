import React, { useState } from "react";
import classNames from "classnames";
import DayListItem from "components/DayListItem";

import "components/DayList.scss";

export default function DayList(props) {
  const { days, value, onChange } = props;

  const handleDayClick = (dayName) => {
    onChange(dayName); // Call the onChange function passed from the parent component
  };

  const listItems = days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === value}
      setDay={handleDayClick}
    />
  ));

  return <ul>{listItems}</ul>;
}
