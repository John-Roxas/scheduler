import axios from "axios";
import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import Appointment from "./Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "./helpers/selectors";
import useVisualMode from "../hooks/useVisualMode";

export default function Application(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const [selectedDay, setSelectedDay] = useState("Monday");
  const [dailyAppointments, setDailyAppointments] = useState([]);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const [activeAppointment, setActiveAppointment] = useState(null); // Track the active appointment ID

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
    setSelectedDay(day);

    const dailyAppointments = getAppointmentsForDay(
      {
        appointments: state.appointments,
        days: state.days,
      },
      day
    );
    setDailyAppointments(dailyAppointments);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsResponse = await axios.get("/api/appointments");
        const daysResponse = await axios.get("/api/days");
        const interviewersResponse = await axios.get("/api/interviewers");

        setState((prev) => ({
          ...prev,
          appointments: appointmentsResponse.data,
          days: daysResponse.data,
          interviewers: interviewersResponse.data,
        }));

        const appointmentsForDay = getAppointmentsForDay(
          {
            appointments: appointmentsResponse.data,
            days: daysResponse.data,
          },
          state.day
        );
        setDailyAppointments(appointmentsForDay);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const interviewersForDay = getInterviewersForDay(selectedDay, state);

  const appointments = getAppointmentsForDay(state, selectedDay);

  const onAdd = (appointmentId) => {
    setActiveAppointment(appointmentId); // Set the active appointment ID when the button is clicked
    transition(CREATE);
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({
      ...state,
      appointments,
    });
  }

  const cancelInterview = (id) => {
    // Create a new appointments object with the appointment's interview set to null
    const updatedAppointments = {
      ...state.appointments,
      [id]: {
        ...state.appointments[id],
        interview: null,
      },
    };

    setState((prev) => ({
      ...prev,
      appointments: updatedAppointments,
    }));
  };

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const isActive = appointment.id === activeAppointment; // Check if the current appointment is active

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewersForDay={interviewersForDay}
        interviewers={state.interviewers} // Pass the interviewers prop to the Appointment component
        mode={isActive ? mode : SHOW} // Pass the mode to the Appointment component only if it's active
        transition={transition}
        back={back}
        onAdd={() => onAdd(appointment.id)} // Pass the appointment ID to onAdd
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
      <section className="schedule">{schedule}</section>
    </main>
  );
}
