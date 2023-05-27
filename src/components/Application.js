import axios from "axios";
import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import Appointment from "./Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
const appointments = {
  1: {
    id: 1,
    time: "12pm",
  },
  2: {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  3: {
    id: 3,
    time: "2pm",
  },
  4: {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      },
    },
  },
  5: {
    id: 5,
    time: "4pm",
  },
};
export default function Application(props) {
  // Set the default state to Monday using a useState hook
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  useEffect(() => {
    const grabData = async () => {
      try {
        const response = await axios.get("/api/days");
        setState((prev) => ({ ...prev, days: response.data }));
      } catch (error) {
        console.error("Error fetching days!: ", error);
      }
    };

    grabData();
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
