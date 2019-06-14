import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { TableHeaderRow } from "./components/TableHeaderRow";
import { Task } from "./components/Task";
import { INormalizedTasksResponse, IOneTask, ITasksState } from "./interfaces";
import { BASE_URL } from "./constants";

import axios from "axios";
import { normalize, denormalize, schema } from "normalizr";

import "./App.css";

export const getTasksById = async () => {
  return axios.get<INormalizedTasksResponse>(`${BASE_URL}/tasksById`);
};

export const putTask = async (task: IOneTask) => {
  return axios.put<IOneTask>(`${BASE_URL}/tasksById/${task.id}`, task);
};

export const denormalizeData = (data: ITasksState, taskID: number) => {
  // denormalize data
  const task = new schema.Entity("tasksById");
  const myDenormSchema = { tasksById: [task] };
  const entities = {
    id: taskID,
    tasksById: data.tasksById[taskID]
  };

  const denormalizedData: IOneTask = denormalize(
    entities.tasksById,
    myDenormSchema,
    entities
  );

  return denormalizedData;

};

const changeTaskDuration = (
  tasks: ITasksState,
  taskID: number,
  taskStart: number,
  taskDuration: number
): ITasksState => {
  return {
    ...tasks,
    tasksById: {
      ...tasks.tasksById,
      [taskID]: {
        ...tasks.tasksById[taskID],
        taskStart,
        taskDuration
      }
    }
  };
};

const App = () => {
  //Data
  const data: ITasksState = {
    ids: [],
    tasksById: {}
  };

  // Setting state
  const [tasks, setTasks] = useState<ITasksState>(data);

  // updateTasks handler
  const handleUpdateTask = (
    taskID: number,
    taskStart: number,
    taskDuration: number
  ) : void => {
    setTasks(tasks =>
      changeTaskDuration(tasks, taskID, taskStart, taskDuration)
    );
  };

  const idCallback = (taskIdFomChild : number) : void => {

    const denData = denormalizeData(tasks, taskIdFomChild);

    console.log(denData);
    console.log(taskIdFomChild);

    putTask(denData);
  };

  // getting data from API
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
              changeTaskDuration={handleUpdateTask}
              callbackFromParent={idCallback}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default App