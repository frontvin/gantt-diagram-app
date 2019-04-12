import React from "react";
import { Table } from "semantic-ui-react";

interface ITableHeader {
  tasksHeaderName: string;
  timelineHeaderName: string;
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const TableHeaderRow: React.FC<ITableHeader> = ({
  tasksHeaderName,
  timelineHeaderName
}: ITableHeader) => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell rowSpan="2" textAlign="center">
          {tasksHeaderName}
        </Table.HeaderCell>
        <Table.HeaderCell colSpan="12" textAlign="center">
          {timelineHeaderName}
        </Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        {monthNames.map((month: string, index: number) => {
          return (
            <Table.HeaderCell key={index} monthname={month} textAlign="center">
              {month}
            </Table.HeaderCell>
          );
        })}
      </Table.Row>
    </Table.Header>
  );
};
