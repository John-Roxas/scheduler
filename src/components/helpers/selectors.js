const getAppointmentsForDay = function (state, day) {
  const selectedDay = state.days.find((d) => d.name === day);

  if (!selectedDay) {
    return [];
  }

  const appointments = selectedDay.appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  );

  return appointments;
};

const getInterview = function (state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerID = interview.interviewer;
  const interviewerData = state.interviewers[interviewerID];

  return {
    student: interview.student,
    interviewer: {
      id: interviewerData.id,
      name: interviewerData.name,
      avatar: interviewerData.avatar,
    },
  };
};

function getInterviewersForDay(day, state) {
  if (state && state.days) {
    const foundDay = state.days.find((d) => d.name === day);

    if (foundDay) {
      let result = foundDay.interviewers.map(
        (interviewerId) => state.interviewers[interviewerId]
      );

      return result;
    }
  }

  return [];
}

module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
};
