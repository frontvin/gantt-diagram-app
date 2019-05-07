import React from "react";
import { Table } from "semantic-ui-react";
import { ColoredCell } from "./ColoredCell";

export interface ITaskCell {
  taskName: string;
  monthNumber: number;
  taskStart: number;
  active: boolean;
  cellColor: string;
  getCurrentCell(monthNumber: number, taskStart: number): void;
}

export const TaskCell: React.FC<ITaskCell> = ({
     monthNumber,
     taskStart,
     active,
     cellColor,
     getCurrentCell,
  }) => {
  return (
    <Table.Cell
      key={monthNumber}
      as={ColoredCell}
      backgroundColor={active ? cellColor : ""}
      onClick={() => getCurrentCell(monthNumber, taskStart)}
    />
  );
};
