import React, { useState } from "react";
import classNames from "classnames";
import DayListItem from "components/DayListItem";

import "components/DayList.scss";

export default function DayList(props) {
  const { days, value, onChange, spotsRemaining } = props;

  const handleDayClick = (dayName) => {
    onChange(dayName); // Call the onChange function passed from the parent component
  };

  const listItems = days.map((day) => {
    // const spots = spotsRemaining(day); // Call the spotsRemaining function with the day object
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots} // Pass the remainingSpots value as spots
        selected={day.name === value}
        setDay={handleDayClick}
      />
    );
  });

  return <ul>{listItems}</ul>;
}
