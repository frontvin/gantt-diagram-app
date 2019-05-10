import React from "react";
import { Table } from "semantic-ui-react";

import { TaskCell } from "./TaskCell";

export interface ITask {
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

export const getCurrentCell = (monthNumber: number, taskName : string, taskStart: number): number =>{
  return taskStart - monthNumber
  // console.log(monthNumber, taskName, newTaskDuration);
}

export const TaskRow: React.FC<ITask> = ({ taskName, taskStart, taskDuration, cellColor }) => {
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell>{taskName}</Table.Cell>
        {monthNumbers.map(monthNumber => (
          <TaskCell
            key={`${monthNumber}-${taskName}`}
            monthNumber={monthNumber}
            taskName={taskName}
            taskStart={taskStart}
            cellColor={cellColor}
            active={taskActiveInMonth(monthNumber, taskStart, taskDuration)}
            getCurrentCell={getCurrentCell}
          />
        ))}
      </Table.Row>
    </Table.Body>
  );
};
