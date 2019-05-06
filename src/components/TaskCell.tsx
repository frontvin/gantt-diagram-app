import React from "react";
import { Table } from "semantic-ui-react";
import { ColoredCell } from "./ColoredCell";

export interface ITaskCell {
  taskName: string;
  monthNumber: number;
  active: boolean;
  cellColor: string;
  getCurrentCell(monthNumber: number, taskName: string): void;
}

export const TaskCell: React.FC<ITaskCell> = ({
     taskName,
     monthNumber,
     active,
     cellColor,
     getCurrentCell
  }) => {
  return (
    <Table.Cell
      key={monthNumber}
      as={ColoredCell}
      backgroundColor={active ? cellColor : ""}
      onClick={() => getCurrentCell(monthNumber, taskName)}
    />
  );
};
