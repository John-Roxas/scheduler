// import axios from "axios";
import React, { useState, useEffect } from "react";
import "components/Application.scss";
// import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import Appointment from "./Appointment";
import useApplicationData from "../hooks/useApplicationData";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "./helpers/selectors";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    interviewersForDay,
    dailyAppointments,
  } = useApplicationData();

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewersForDay={interviewersForDay}
        interviewers={state.interviewers} // Pass the interviewers prop to the Appointment component
        bookInterview={bookInterview} // Pass the bookInterview function to the Appointment component
        cancelInterview={cancelInterview} // Pass the cancelInterview function to the Appointment component
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
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
        {schedule}
        <Appointment time={"5pm"} />
      </section>
    </main>
  );
}
