import React, { useEffect, useState } from "react";

import axios from "axios";
import { normalize, denormalize, schema } from "normalizr";
import { Table } from "semantic-ui-react";
import "./App.css";
import { TableHeaderRow } from "./components/TableHeaderRow";
import { Task } from "./components/Task";
import { INormalizedTasksResponse, IOneTask, ITasksState } from "./interfaces";
import { BASE_URL } from './constants';

export const getTasksById = async () => {
  return axios.get<INormalizedTasksResponse>(`${BASE_URL}/tasksById`);
};

export const putTasksByid = async () => {
  return
}


const App = () => {
  //Data
  const data: ITasksState = {
    ids: [],
    tasksById: {}
  };

  // Setting state
  const [tasks, setTasks] = useState<ITasksState>(data);

  export const updateTask = async (task: IOneTask) => {
    const task = new schema.Entity("tasksById");
    const myDenormSchema = { tasksById: [task] };
    const entities = {
      id: taskID,
      tasksById: data.tasksById[taskID]
    };

    const denormalizedData : IOneTask = denormalize(
      entities.tasksById,
      myDenormSchema,
      entities
    );


    return axios.put(`${BASE_URL}/tasksById/${task.id}`, task);
  }

  const updateTask = (data: ITasksState, taskID: number) => {
    // denormalize data
    const task = new schema.Entity("tasksById");
    const myDenormSchema = { tasksById: [task] };
    const entities = {
      id: taskID,
      tasksById: data.tasksById[taskID]
    };

    const denormalizedData : IOneTask = denormalize(
      entities.tasksById,
      myDenormSchema,
      entities
    );

    return axios.put<IOneTask>(
      `http://localhost:3000/tasksById/${entities.id}`,
      denormalizedData
    );
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

    updateTask(tasks, taskID);
  };

  useEffect(() => {
    getTasksById().then(response => {
      // define task schema
      const task = new schema.Entity("tasksById");
      const mySchema = [task];

      // Normalized array
      const normTasks: INormalizedTasksResponse = normalize(
        response.data,
        mySchema
      );
      const tasksById = normTasks.entities.tasksById;
      const ids = normTasks.result;
      console.log(`ids: ${ids}`);

      setTasks({ ids, tasksById });
    });
  }, []);

  return (
    <Table table="large" columns="13" celled structured selectable>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell rowSpan="2">Tasks</Table.HeaderCell>
          <Table.HeaderCell colSpan="12">Duration</Table.HeaderCell>
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
