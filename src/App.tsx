import React, { useState } from "react";
// import { normalize, schema } from "normalizr";
import { Table } from "semantic-ui-react";
import "./App.css";
import { TableHeaderRow } from "./components/TableHeaderRow";
import { Task } from "./components/Task";

const App = () => {
  //Data
  const data: ITasksState = {
    ids: [1,2,3,4,5,6,7,8,9,10],
    tasksById: {
      1: {
        id: 1,
        taskName: "Task 1",
        taskStart: 5,
        taskDuration: 3,
        cellColor: "red"
      },
      2: {
        id: 2,
        taskName: "Task 2",
        taskStart: 1,
        taskDuration: 5,
        cellColor: "blue"
      },
      3: {
        id: 3,
        taskName: "Task 3",
        taskStart: 9,
        taskDuration: 2,
        cellColor: "green"
      },
      4: {
        id: 4,
        taskName: "Task 4",
        taskStart: 3,
        taskDuration: 1,
        cellColor: "yellow"
      },
      5: {
        id: 5,
        taskName: "Task 5",
        taskStart: 1,
        taskDuration: 4,
        cellColor: "purple"
      },
      6: {
        id: 6,
        taskName: "Task 6",
        taskStart: 2,
        taskDuration: 5,
        cellColor: "orange"
      },
      7: {
        id: 7,
        taskName: "Task 7",
        taskStart: 4,
        taskDuration: 2,
        cellColor: "grey"
      },
      8: {
        id: 8,
        taskName: "Task 8",
        taskStart: 3,
        taskDuration: 5,
        cellColor: "blue"
      },
      9: {
        id: 9,
        taskName: "Task 9",
        taskStart: 5,
        taskDuration: 1,
        cellColor: "cyan"
      },
      10: {
        id: 10,
        taskName: "Task 10",
        taskStart: 4,
        taskDuration: 3,
        cellColor: "red"
      }
    }
  };

  interface ITasksState {
    ids: TaskId[];
    tasksById: { [id: number]: IOneTask };
  }

  interface IOneTask {
    id: TaskId;
    taskName: string;
    taskStart: number;
    taskDuration: number;
    cellColor: string;
  }

  type TaskId = number;

// define task schema
// const task = new schema.Entity("tasks");
// const mySchema = { tasks: [task] };

// // Normalized array
// const normTasks: INormalizedTasksResponse = normalize(data, mySchema);

// console.log(normTasks);

// Setting state
  const [tasks, setTasks] = useState(data);
  console.log(tasks);

// App component
  const changeTaskDuration = (
    taskID: number,
    taskStart: number,
    taskDuration: number
  ): void => {
    const task = tasks.tasksById[taskID];
    // const { ... } = task
    // setTasks(task)
    // return newTask
    // setTasks(newTask);
    console.log(task);
  };

  changeTaskDuration(5, 4, 2);

  return (
    <Table table="large" columns="13" celled structured selectable>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell rowSpan="2">Header</Table.HeaderCell>
          <Table.HeaderCell colSpan="12">Tasks</Table.HeaderCell>
        </Table.Row>
        <Table.Row textAlign="center">
          <TableHeaderRow />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tasks.ids.map((taskID: number) => {
          const task = tasks.tasksById[taskID];
          return (
            <Task
              key={taskID}
              taskID={task.id}
              taskName={task.taskName}
              taskStart={task.taskStart}
              taskDuration={task.taskDuration}
              cellColor={task.cellColor}
              // onClick={changeDurr}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default App;
