import React from 'react';
import { Table } from "semantic-ui-react";

//********************************************************************** */
// Table header row component

const monthNames = [
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

export const TableHeaderRow: React.FC = () => {
  return (
    <React.Fragment>
      {monthNames.map((month: string, index: number) => {
        return (
          <Table.HeaderCell key={index} monthname={month} textAlign="center">
            {month}
          </Table.HeaderCell>
        );
      })}
    </React.Fragment>
  );
};
