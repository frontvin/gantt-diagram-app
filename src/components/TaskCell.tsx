import React from "react";
import { Table } from "semantic-ui-react";
import { ColoredCell } from './ColoredCell'

//***************************************************************************** */
// One task cell component
// cell interface
interface ITaskCell {
  taskName: string;
  monthNumber: number;
  taskStart: number;
  active: boolean;
  cellColor: string;
  getCurrentCell(
    monthNumber: number,
  ): number;
}

export const TaskCell: React.FC<ITaskCell> = ({
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
      onClick={() => getCurrentCell(monthNumber)}
    />
  );
};