import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { TableHeaderRow } from "./TableHeaderRow";
import { Task } from "./TaskRow";

export class GanttTable extends Component {
  render() {
    const tasks = [
      { taskName: "Task 1", timelineLenght: 1 },
      { taskName: "Task 2", timelineLenght: 2 },
      { taskName: "Task 3", timelineLenght: 3 },
      { taskName: "Task 4", timelineLenght: 4 },
      { taskName: "Task 5", timelineLenght: 5 },
      { taskName: "Task 6", timelineLenght: 6 },
      { taskName: "Task 7", timelineLenght: 7 },
      { taskName: "Task 8", timelineLenght: 8 },
      { taskName: "Task 9", timelineLenght: 9 },
      { taskName: "Task 10", timelineLenght: 10 }
    ];
    return (
      <Table table="large" columns="13" celled structured>
        <TableHeaderRow
          tasksHeaderName={"Tasks"}
          timelineHeaderName={"Timeline"}
        />
        {tasks.map((task, index) => {
          return <Task taskName={task.taskName} key={index} />;
        })}
      </Table>
    );
  }
}
