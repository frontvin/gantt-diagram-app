import React, { useEffect, useState } from "react";
import { normalize, schema } from "normalizr";
import axios from "axios";
import { Table } from "semantic-ui-react";
import "./App.css";
import { TableHeaderRow } from "./components/TableHeaderRow";
import { Task } from "./components/Task";

const App = () => {
  //Data
  const initialState: ITasksState = {
    ids: [],
    tasksById: {}
  };

  interface ITasksState {
    readonly ids: TaskId[];
    readonly tasksById: { [id: number]: IOneTask };
  }

  interface IOneTask {
    id: number;
    taskName: string;
    taskStart: number;
    taskDuration: number;
    cellColor: string;
  }

  type TaskId = number;

  interface INormalizedData<T> {
    [uuid: string]: T;
  }

  interface INormalizedTasksResponse {
    result: number[];
    entities: INormalizedData<IOneTask>;
  }

  const UnNormalizedData = {
    tasks: [
      {
        id: 1,
        taskName: "Task 1",
        taskStart: 3,
        taskDuration: 3,
        cellColor: "red"
      },
      {
        id: 2,
        taskName: "Task 2",
        taskStart: 1,
        taskDuration: 3,
        cellColor: "blue"
      },
      {
        id: 3,
        taskName: "Task 3",
        taskStart: 4,
        taskDuration: 4,
        cellColor: "green"
      },
      {
        id: 4,
        taskName: "Task 4",
        taskStart: 3,
        taskDuration: 8,
        cellColor: "yellow"
      },
      {
        id: 5,
        taskName: "Task 5",
        taskStart: 1,
        taskDuration: 6,
        cellColor: "purple"
      },
      {
        id: 6,
        taskName: "Task 6",
        taskStart: 2,
        taskDuration: 9,
        cellColor: "orange"
      },
      {
        id: 7,
        taskName: "Task 7",
        taskStart: 4,
        taskDuration: 5,
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


  // Setting state

  // define task schema
  const task = new schema.Entity("tasks");
  const mySchema = { tasks: [task] };

  // Normalized array
  const normTasks = normalize(UnNormalizedData, mySchema);

  console.log(normTasks);

  const [tasks, setTasks] = useState(initialState);

  const postData = (data: ITasksState) => {
    return axios
      .post(`http://localhost:3000/tasksById`, data)
      // .then(response => console.log(response));
  };

  const changeTaskDuration = (
    taskID: number,
    taskStart: number,
    taskDuration: number
  ): void => {
    const task = tasks.tasksById[taskID];
    const newTasks = { ...tasks };
    newTasks.tasksById[taskID] = {
      ...task,
      ...{ taskStart: taskStart, taskDuration: taskDuration }
    };
    setTasks(newTasks);

    postData(tasks);
  };

  useEffect(() => {
    axios
      .get<ITasksState>("http://localhost:3000/tasksById")
      .then(result => setTasks(result.data));
  }, []);

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
              changeTaskDuration={changeTaskDuration}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default App;
