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
  });

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  const bookInterview = (id, interview) => {
    return new Promise((resolve, reject) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      axios
        .put(`/api/appointments/${id}`, { interview })
        .then(() => {
          setState((prev) => ({
            ...prev,
            appointments,
          }));

          resolve();
        })
        .catch((error) => {
          console.error("Error updating appointment: ", error);
          reject(error);
        });
    });
  };

  const cancelInterview = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/appointments/${id}`)
        .then(() => {
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

          resolve();
        })
        .catch((error) => {
          console.error("Error canceling interview:", error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsResponse, daysResponse, interviewersResponse] =
          await Promise.all([
            axios.get("/api/appointments"),
            axios.get("/api/days"),
            axios.get("/api/interviewers"),
          ]);

        setState((prev) => ({
          ...prev,
          appointments: appointmentsResponse.data,
          days: daysResponse.data,
          interviewers: interviewersResponse.data,
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const interviewersForDay = getInterviewersForDay(state.day, state);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const spotsRemaining = () => {
    const spots = dailyAppointments.filter(
      (appointment) => !appointment.interview
    ).length;
    return spots;
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    interviewersForDay,
    dailyAppointments,
    spotsRemaining,
  };
}
