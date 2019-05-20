import React from 'react';
import { Table } from "semantic-ui-react";
import { TaskCell } from './TaskCell'

// *******************************************************
// Task component
// task interface
interface ITask {
  taskName: string;
  taskStart: number;
  taskDuration: number;
  cellColor: string;
}

const monthNumbers = Array.from({ length: 12 }, (j, i) => i + 1);

const taskActiveInMonth = (
  monthNumber: number,
  taskStart: number,
  taskDuration: number
): boolean => {
  return taskStart <= monthNumber && monthNumber < taskStart + taskDuration;
};

export const getCurrentCell = (
  monthNumber: number,
): number => {
  return monthNumber;
  // console.log(monthNumber);
};

export const Task: React.FC<ITask> = (props) => {
  return (
    <Table.Row>
      <Table.Cell>{props.taskName}</Table.Cell>
      {monthNumbers.map(monthNumber => (
        <TaskCell
          key={`${monthNumber}-${props.taskName}`}
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