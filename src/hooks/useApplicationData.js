import { useState, useEffect } from "react";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../components/helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 0,
  });

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  const spotsRemaining = (state, appointments) => {
    // Find the day object that matches the currently selected day in the state.
    const findResult = state.days.find((item) => item.name === state.day);

    let spots = 0;
    // iterate over the appointments of the found day
    findResult.appointments.forEach((id) => {
      // Check if the appointment doe snot have an interview (i.e. spot is available)
      if (!appointments[id].interview) {
        spots++;
      }
    });
    // create a new result object by spreading the findResult and updating the spots property
    const result = { ...findResult, spots: spots };
    // create a new array by mapping over the days in the state
    const result2 = state.days.map((day) => {
      // if the day name matches the currently selected day in the state, return the updated result
      if (day.name === state.day) {
        return result;
      } else {
        // otherwise, return the ORIGINAL day object.
        return day;
      }
    });
    // return the updated array of days
    return result2;
  };

  const bookInterview = async (id, interview) => {
    try {
      // create an appointment object with the interview details
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };

      // create a new appointments object with the updated appointment
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      // send a put request to update the appointment with the given ID
      await axios.put(`/api/appointments/${id}`, { interview });

      //update the application state
      setState((prev) => ({
        ...prev,
        // update the appointments property with the updated appointments object
        appointments,
        // recalc the remaining spots for each day
        days: spotsRemaining(state, appointments),
      }));
    } catch (error) {
      // Throw an error if anything in the try block fails. Sets it to the error state.
      throw error;
    }
  };

  const cancelInterview = async (id) => {
    try {
      // Send delete request to delete the apoointment with given ID
      await axios.delete(`/api/appointments/${id}`);

      // Create a copy of the appointments state object
      const updatedAppointments = {
        ...state.appointments,
        [id]: {
          ...state.appointments[id],
          interview: null,
        },
      };

      // update the application state
      setState((prev) => ({
        ...prev,
        // update the appointments property with the updatedAppointments object
        appointments: updatedAppointments,
        // recalc the remaining spots for each day by calling the spotsRemaining function
        days: spotsRemaining(state, updatedAppointments),
      }));
    } catch (error) {
      // if an error occurs during the try block, throw the error. This currently sets the state to the errorDelete state
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsResponse, daysResponse, interviewersResponse] =
          await Promise.all([
            axios.get("/api/appointments"), // Fetch appointments data
            axios.get("/api/days"), // Fetch days data
            axios.get("/api/interviewers"), // Fetch interviewers data
          ]);

        setState((prev) => ({
          ...prev,
          // Update the appointments property with the data from the appointments API call.
          appointments: appointmentsResponse.data,
          // Update the days property with the data from the days API call
          days: daysResponse.data,
          // Update the interviewers property with the data from the interviewers API call
          interviewers: interviewersResponse.data,
        }));
      } catch (error) {}
    };
    // call the fetchData function when the component mounts.
    fetchData();
  }, []);

  const interviewersForDay = getInterviewersForDay(state.day, state);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    interviewersForDay,
    dailyAppointments,
    // spotsRemaining,
  };
}
