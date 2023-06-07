import { getAppointmentsForDay } from "../helpers/selectors";
import { getInterviewersForDay } from "../helpers/selectors";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2, 3], // Array of interviewer IDs for Monday
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [4, 5], // Array of interviewer IDs for Tuesday
    },
  ],
  interviewers: {
    1: { id: 1, name: "John" },
    2: { id: 2, name: "Jane" },
    3: { id: 3, name: "Alex" },
    4: { id: 4, name: "Sarah" },
    5: { id: 5, name: "Mike" },
  },
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
  },
};

test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(3);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

describe("getInterviewersForDay", () => {
  test("returns an array", () => {
    const result = getInterviewersForDay("Monday", state);
    expect(Array.isArray(result)).toBe(true);
  });

  test("returns an array with a length matching the number of interviewers for that day", () => {
    const result = getInterviewersForDay("Tuesday", state);
    expect(result.length).toBe(2);
  });

  test("returns an array containing the correct interviewer objects", () => {
    const result = getInterviewersForDay("Monday", state);
    expect(result).toEqual([
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Alex" },
    ]);
  });

  test("returns an empty array when the days data is empty", () => {
    const result = getInterviewersForDay("Wednesday", state);
    expect(result).toEqual([]);
  });

  test("returns an empty array when the day is not found", () => {
    const result = getInterviewersForDay("Friday", state);
    expect(result).toEqual([]);
  });
});
