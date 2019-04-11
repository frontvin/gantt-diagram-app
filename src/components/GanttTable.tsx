import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { TableHeaderRow } from './TableHeaderRow';
import { Task } from './TaskRow';

export class GanttTable extends Component {

    render() {
        
        return (
          <Table table="large" celled structured>
              <TableHeaderRow
                tasksHeaderName={"Tasks"}
                timelineHeaderName={"Timeline"}
              />
              <Task />
          </Table>
        );
    }
}
