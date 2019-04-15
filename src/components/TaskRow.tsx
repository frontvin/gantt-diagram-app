import React from "react";
import { Table } from "semantic-ui-react";

interface ITask {
  taskName: string;
  taskStart: number;
  taskDuration: number;
  cellColor: string;
}

const monthNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

const taskActiveInMonth = (
  monthNumber: number,
  taskStart: number,
  taskDuration: number
): boolean => {
  return taskStart <= monthNumber && monthNumber < taskStart + taskDuration;
};

const ColoredCell: React.FC<{ backgroundColor: string }> = ({
  children,
  backgroundColor
}) => {
  return <td style={{ backgroundColor }}>{children}</td>;
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
          />
        ))}
      </Table.Row>
    </Table.Body>
  );
};
