import React, { useEffect, useState } from "react"
import { normalize, schema } from "normalizr"
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
    [uuid: string]: T
  }

  interface INormalizedTasksResponse {
    result: number[],
    entities: INormalizedData<IOneTask>
  }

  // Setting state

  // define task schema
  const task = new schema.Entity("tasks");
  const mySchema = { tasks: [task] };

  // Normalized array
  const normalized: INormalizedTasksResponse = normalize(initialState, mySchema);

  console.log(normalized);

  const [tasks, setTasks] = useState(initialState);

  const postData = (data: ITasksState) => {
    return axios.post(`http://localhost:3000/tasksById`, data)
      .then((response) => console.log(response))
  };

  const changeTaskDuration = (
    taskID: number,
    taskStart: number,
    taskDuration: number
  ) : void  => {
    const task = tasks.tasksById[taskID];
    const newTasks = { ...tasks };
    newTasks.tasksById[taskID] = {
      ...task,
      ...{ taskStart: taskStart, taskDuration: taskDuration }
    };
    setTasks(newTasks);

    postData(tasks)
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
