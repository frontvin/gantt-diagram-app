import { changeTaskDuration } from "./App";

test("Result of changeTaskDuration will be", () => {

  const iniData = {
    ids: [1],
    tasksById:{
      1: {
        id: 1,
        taskName: "Task1",
        taskStart: 3,
        taskDuration: 5,    // initial taskDuration
        cellColor: "red"
      }
    }
  };

  const expectedResult = {
    ids: [1],
    tasksById: {
      1: {
        id: 1,
        taskName: "Task1",
        taskStart: 3,
        taskDuration: 7,    // taskDuration must be changed
        cellColor: "red"
      }
    }
  };

  expect(changeTaskDuration(iniData, 1, 3, 7)).toEqual(expectedResult)
});
