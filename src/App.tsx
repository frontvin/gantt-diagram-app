import React, { useEffect, useState } from "react";
import axios from "axios";
import { normalize, denormalize, schema } from "normalizr";
import { Table } from "semantic-ui-react";
import "./App.css";
import { TableHeaderRow } from "./components/TableHeaderRow";
import { Task } from "./components/Task";

const App = () => {
  //Data
  const data: ITasksState = {
    ids: [],
    tasksById: {}
  };

  interface INormalizedData<T> {
    [ids: string]: T;
  }

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

  interface INormalizedTasksResponse {
    result: number[];
    entities: {
      tasksById: INormalizedData<IOneTask>;
    };
  }

  type TaskId = number;

  // Setting state
  const [tasks, setTasks] = useState(data);

  const postData = (data: ITasksState, taskID: number) => {
    console.log(data.ids);

    // denormalize data
    const task = new schema.Entity("tasksById");
    const myDenormSchema = { tasksById : [task] };
    const entities = {
      id: data.ids[taskID-1],
      tasksById: data.tasksById[taskID]
    };

    console.log(entities.id)

    // console.log(`entities ${entities}`);

    const denormalizedData = denormalize( entities.tasksById, myDenormSchema, entities );
    // console.log("denore " + denormalizedData);

    return axios.put(`http://localhost:3000/tasksById/${entities.id}`, denormalizedData)
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

    postData(tasks, taskID)
  };

  useEffect(() => {
    axios
      .get<INormalizedTasksResponse>("http://localhost:3000/tasksById")
      .then(response => {

        // define task schema
        const task = new schema.Entity("tasksById");
        const mySchema = [task];

        // Normalized array
        const normTasks : INormalizedTasksResponse = normalize(response.data, mySchema);
        const tasksById = normTasks.entities.tasksById;
        const ids = normTasks.result;
        console.log(`ids: ${ids}`)

        setTasks({ids, tasksById})

      })
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
