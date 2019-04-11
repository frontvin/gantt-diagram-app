import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { TableHeaderRow } from './TableHeaderRow';

export class GanttTable extends Component {

    render() {
        
        return (
            <Table celled>
                <Table.Header>
                    <TableHeaderRow
                        tasksHeaderName={"Tasks"}
                        timelineHeaderName={"Timeline"}
                    />

                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>1 row</Table.Cell>
                        <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                </Table.Body>

            </Table>
        )
    }
}
