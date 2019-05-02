import React from "react";
import { Table } from "semantic-ui-react";
import { ColoredCell } from "./ColoredCell";

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

export function getCurrentCell(): void {

};

export const TaskRow: React.FC<ITask> = ({
  taskName,
  taskStart,
  taskDuration,
  cellColor
}) => {
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell>{taskName}</Table.Cell>
        {monthNumbers.map(monthNumber => (
          <Table.Cell
            key={monthNumber}
            as={ColoredCell}
            backgroundColor={
              taskActiveInMonth(monthNumber, taskStart, taskDuration)
                ? cellColor
                : ""
            }
            onClick={getCurrentCell}
          />
        ))}
      </Table.Row>
    </Table.Body>
  );
};
