import React from 'react';
import { Table } from 'semantic-ui-react'
import { string } from 'prop-types';

export interface ITableHeader {
    tasksHeaderName: string,
    timelineHeaderName: string,
}

export const TableHeaderRow: React.FC<ITableHeader> = ({
    tasksHeaderName, 
    timelineHeaderName,
    } : ITableHeader) => {

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
    
    return (
      <Table.Row>
        <Table.HeaderCell>{tasksHeaderName}</Table.HeaderCell>
        <Table.HeaderCell>
          <Table.Row>{timelineHeaderName}</Table.Row>
          <Table.Row>
            {
                monthNames.map((month: string, index: number) => {
                    return (
                        <Table.HeaderCell key={index} monthName={month}>
                            {month}
                        </Table.HeaderCell>
                    );
                })
            }
          </Table.Row>
        </Table.HeaderCell>
      </Table.Row>
    );
}