import React from 'react';
const events = [
  { title: "All Day Event", start: getDate("YEAR-MONTH-01") },
  {
    title: "A-Block Conf. Hall",
    start: getDate("YEAR-MONTH-07"),
    end: getDate("YEAR-MONTH-10"),
    color: "green"
  },
  {
    groupId: "999",
    title: "B-Block OAT",
    start: getDate("YEAR-MONTH-09T10:30:00+05:30"),
    end: getDate("YEAR-MONTH-09T12:30:00+05:30"),
  },
  {
    groupId: "999",
    title: "B-Block Auditorium",
    start: getDate("YEAR-MONTH-16T16:00:00+05:30"),
    end: getDate("YEAR-MONTH-16T17:00:00+05:30"),
  },
  {
    title: "C Block Fintan Hall",
    start: getDate("YEAR-MONTH-26T11:00:00+05:30"),
    end: getDate("YEAR-MONTH-26T12:15:00+05:30"),
  },
  {
    title: "C Block Conference Hall",
    start: getDate("YEAR-MONTH-26T10:30:00+05:30"),
    end: getDate("YEAR-MONTH-26T12:15:00+05:30"),
  },
  {
    title: "Delany Hall",
    start: getDate("YEAR-MONTH-16T08:30:00+05:30"),
    end: getDate("YEAR-MONTH-16T10:30:00+05:30"),
  },
  {
    title: "BMS Hall",
    start: getDate("YEAR-MONTH-17T14:00:00+05:30"),
    end: getDate("YEAR-MONTH-17T16:00:00+05:30"),
  },
  {
    title: "Student Cafeteria",
    start: getDate("YEAR-MONTH-18T12:00:00+05:30"),
    end: getDate("YEAR-MONTH-18T14:00:00+05:30"),
  },
  {
    title: "Library Reference Hall",
    start: getDate("YEAR-MONTH-19T09:00:00+05:30"),
    end: getDate("YEAR-MONTH-19T11:00:00+05:30"),
  },
  {
    title: "Board Room",
    start: getDate("YEAR-MONTH-20T13:00:00+05:30"),
    end: getDate("YEAR-MONTH-20T15:00:00+05:30"),
  },
  {
    title: "Computer Lab",
    start: getDate("YEAR-MONTH-21T10:00:00+05:30"),
    end: getDate("YEAR-MONTH-21T12:00:00+05:30"),
  },
];

function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = "0" + month;
  }

  return dayString.replace("YEAR", year).replace("MONTH", month);
}

export default events;
