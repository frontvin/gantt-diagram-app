import React from "react";
import { Table } from "semantic-ui-react";
import { ColoredCell } from "./ColoredCell";

//***************************************************************************** */
// One task cell component
// cell interface
interface ITaskCell {
  taskID: number;
  monthNumber: number;
  taskStart: number;
  active: boolean;
  cellColor: string;
  getCurrentCell(taskID: number, monthNumber: number): void;
}

export const TaskCell: React.FC<ITaskCell> = ({
  taskID,
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
      onClick={() => getCurrentCell(taskID, monthNumber)}
    />
  );
};
