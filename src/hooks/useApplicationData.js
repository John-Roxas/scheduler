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
    // const dailyAppointments = getAppointmentsForDay(state, state.day);
    // filter returns an array. length of array is # of spots
    // const spots = dailyAppointments.filter(
    //   (appointment) => !appointment.interview
    // ).length;
    // setState((prev) => ({
    //   ...prev,
    //   spots,
    // }));
    const findResult = state.days.find((item) => item.name === state.day);
    console.log("TEST:", findResult);

    let spots = 0;
    findResult.appointments.forEach((id) => {
      if (!appointments[id].interview) {
        spots++;
      }
    });

    console.log(spots);

    const result = { ...findResult, spots: spots };
    const result2 = state.days.map((day) => {
      if (day.name === state.day) {
        return result;
      } else {
        return day;
      }
    });
    console.log(result2);
    return result2;
  };

  // useEffect(() => {
  //   spotsRemaining();
  // }, [state.spots]);

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
      // console.log(state.spots);

      // console.log(spotsRemaining());

      axios
        .put(`/api/appointments/${id}`, { interview })
        .then(() => {
          // const spots = state.days.map((day) => {
          //   if (day.name === state.day) {
          //     return {
          //       ...day,
          //       spots: state.spots,
          //     };
          //   } else {
          //     return day;
          //   }
          // });
          setState((prev) => ({
            ...prev,
            appointments,
            days: spotsRemaining(state, appointments),
          }));
          // console.log(spotsRemaining());

          resolve();
        })
        // .then(() => spotsRemaining())
        .catch((error) => {
          // console.error("Error updating appointment: ", error);
          reject(error);
        });
      // console.log(spotsRemaining());
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
            days: spotsRemaining(state, updatedAppointments),
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
        // console.error("Error fetching data: ", error);
      }
    };

    // spotsRemaining();

    fetchData();
  }, []);

  // now the number of spots will update whenever state.appointments and state.day changes. I think this covers
  // bost cases of deleting and creating appointment
  // useEffect(() => {
  //   spotsRemaining();
  // }, [state.appointments, state.day]);

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
