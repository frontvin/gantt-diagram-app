import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import changeTaskDuration from './App'



test("Result of changeTaskDuration will be", () => {

  const iniData = {
    ids: [1],
    tasksById: [
      {
        id: 1,
        taskName: "Task1",
        tasksStart: 5,
        taskDuration: 3,    // initial taskDuration
        cellColor: "red"
      }
    ]
  };

  const expectedResult = {
    ids: [1],
    tasksById: [
      {
        id: 1,
        taskName: "Task1",
        tasksStart: 5,
        taskDuration: 7,    // taskDuration must be changed
        cellColor: "red"
      }
    ]
  }

  expect(changeTaskDuration).toBe(5)
});
