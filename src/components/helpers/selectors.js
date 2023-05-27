function selectUserByName(state, name) {
  const filteredNames = state.users.filter((user) => user.name === name);
  return filteredNames;
}

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

module.exports = {
  getAppointmentsForDay,
};
