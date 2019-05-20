import React, { useState } from "react";
import { normalize, schema } from "normalizr";
import { Table } from "semantic-ui-react";
import "./App.css";
import { TableHeaderRow } from "./components/TableHeaderRow";
import { Task } from "./components/Task";

// ************************************************************

const App = () => {
  //Data
  const data = {
    tasks: [
      {
        id: 1,
        taskName: "Task 1",
        taskStart: 5,
        taskDuration: 3,
        cellColor: "red"
      },
      {
        id: 2,
        taskName: "Task 2",
        taskStart: 1,
        taskDuration: 5,
        cellColor: "blue"
      },
      {
        id: 3,
        taskName: "Task 3",
        taskStart: 9,
        taskDuration: 2,
        cellColor: "green"
      },
      {
        id: 4,
        taskName: "Task 4",
        taskStart: 3,
        taskDuration: 1,
        cellColor: "yellow"
      },
      {
        id: 5,
        taskName: "Task 5",
        taskStart: 1,
        taskDuration: 4,
        cellColor: "purple"
      },
      {
        id: 6,
        taskName: "Task 6",
        taskStart: 2,
        taskDuration: 5,
        cellColor: "orange"
      },
      {
        id: 7,
        taskName: "Task 7",
        taskStart: 4,
        taskDuration: 2,
        cellColor: "grey"
      },
      {
        id: 8,
        taskName: "Task 8",
        taskStart: 3,
        taskDuration: 5,
        cellColor: "blue"
      },
      {
        id: 9,
        taskName: "Task 9",
        taskStart: 5,
        taskDuration: 1,
        cellColor: "cyan"
      },
      {
        id: 10,
        taskName: "Task 10",
        taskStart: 4,
        taskDuration: 3,
        cellColor: "red"
      }
    ]
  };

  // define task schema
  const task = new schema.Entity("tasks");
  const mySchema = { tasks: [task] };

  // Normalized array
  const normTasks = normalize(data, mySchema);

  console.log(normTasks);
  // Setting state
  const [tasks, setTasks] = useState(normTasks);
  console.log(tasks);

  // App component
  const changeTaskDuration = (
    taskID: number,
    taskStart?: number,
    taskDuration?: number
  ) : void => {
    const {newTask} = tasks.entities.tasks[taskID];
    // return newTask
    // setTasks(newTask);
    console.log(newTask)
  };

  changeTaskDuration(5)

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
        {tasks.result.tasks.map((taskID: string) => {
          const task = tasks.entities.tasks[taskID];
          return (
            <Task
              key={taskID}
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