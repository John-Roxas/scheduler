import React, { useState } from "react";

import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [studentError, setStudentError] = useState(false);
  const [interviewerError, setInterviewerError] = useState(false);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setStudentError(false);
    setInterviewerError(false);
  };

  const onSave = () => {
    if (!student) {
      setStudentError(true);
    } else if (!interviewer) {
      setInterviewerError(true);
    } else {
      props.onSave(student, interviewer);
      setStudentError(false);
      setInterviewerError(false);
    }
  };

  const cancel = () => {
    props.onCancel();
  };

  let placeholder;

  if (props.name) {
    placeholder = props.name;
  } else {
    placeholder = "Enter Student Name";
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className={`appointment__create-input text--semi-bold ${
              studentError ? "error" : ""
            }`}
            name="student"
            type="text"
            placeholder={placeholder}
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          {studentError && (
            <p className="appointment__validation">
              Student name cannot be blank
            </p>
          )}
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
          data-testid="interviewer-input"
        />
        {interviewerError && (
          <p className="appointment__validation">
            Please select an interviewer
          </p>
        )}
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={onSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
