import React from 'react';
import { Table } from "semantic-ui-react";
import { TaskCell } from './TaskCell'

// *******************************************************
// Task component
// task interface
interface ITask {
  taskID: number
  taskName: string;
  taskStart: number;
  taskDuration: number;
  cellColor: string;
  changeTaskDuration: () => void
}

const monthNumbers = Array.from({ length: 12 }, (j, i) => i + 1);

const taskActiveInMonth = (
  monthNumber: number,
  taskStart: number,
  taskDuration: number
): boolean => {
  return taskStart <= monthNumber && monthNumber < taskStart + taskDuration;
};

const getCurrentCell = (
  taskID: number,
  monthNumber: number,
): void => {
  // return monthNumber;

  console.log(monthNumber, taskID);

};

export const Task: React.FC<ITask> = (props) => {
  return (
    <Table.Row>
      <Table.Cell>{props.taskName}</Table.Cell>
      {monthNumbers.map(monthNumber => (
        <TaskCell
          key={`${monthNumber}-${props.taskName}`}
          taskID={props.taskID}
          monthNumber={monthNumber}
          taskName={props.taskName}
          taskStart={props.taskStart}
          cellColor={props.cellColor}
          active={taskActiveInMonth(
            monthNumber,
            props.taskStart,
            props.taskDuration
          )}
          getCurrentCell={getCurrentCell}
        />
      ))}
    </Table.Row>
  )
};