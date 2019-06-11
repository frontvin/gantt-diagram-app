import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { TableHeaderRow } from "./components/TableHeaderRow";
import { Task } from "./components/Task";
import { INormalizedTasksResponse, IOneTask, ITasksState } from "./interfaces";
import { BASE_URL } from './constants';

import axios from "axios";
import { normalize, denormalize, schema } from "normalizr";

import "./App.css";

export const getTasksById = async () => {
  return axios.get<INormalizedTasksResponse>(`${BASE_URL}/tasksById`);
};

export const putTask = async (task: IOneTask) => {
  return axios.put(`${BASE_URL}/tasksById/${task.id}`, task);
};

export const updateTask = (data: ITasksState, taskID: number) => {
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

  putTask(denormalizedData);
};

const changeTaskDuration = (
  taskID: number,
  taskStart: number,
  taskDuration: number,
  tasks: ITasksState
): ITasksState => {
  const task = tasks.tasksById[taskID];
  const newTasks = { ...tasks };
  newTasks.tasksById[taskID] = {
    ...task,
    ...{ taskStart: taskStart, taskDuration: taskDuration }
  };

  return newTasks;
};



const App = () => {
  //Data
  const data: ITasksState = {
    ids: [],
    tasksById: {}
  };

  // Setting state
  const [tasks, setTasks] = useState<ITasksState>(data);

  setTasks(newTasks);

  updateTask(tasks, taskID);


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
              changeTaskDuration={() => changeTaskDuration}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default App;
