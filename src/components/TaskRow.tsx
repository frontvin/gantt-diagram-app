import React from "react";
import { Table } from "semantic-ui-react";

interface ITask {
  taskName: string;
  timelineLength?: number;
  taskStartTime?: string;
  taskFinishTime?: string;
}

export const Task: React.FC<ITask> = ({ taskName }) => {
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell>{taskName}</Table.Cell>
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
      </Table.Row>
    </Table.Body>
  );
};
