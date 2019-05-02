import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { TableHeaderRow } from "./TableHeaderRow";
import { TaskRow } from "./TaskRow";

export class GanttTable extends Component<{},{}> {
constructor(props: Readonly<{}>){
  super(props);
  this.state = {
    tasks: [
      {
        taskName: "Task 1",
        taskStart: 5,
        taskDuration: 3,
        cellColor: "red"
      },
      {
        taskName: "Task 2",
        taskStart: 1,
        taskDuration: 5,
        cellColor: "blue"
      },
      {
        taskName: "Task 3",
        taskStart: 9,
        taskDuration: 2,
        cellColor: "green"
      },
      {
        taskName: "Task 4",
        taskStart: 3,
        taskDuration: 1,
        cellColor: "yellow"
      },
      {
        taskName: "Task 5",
        taskStart: 1,
        taskDuration: 4,
        cellColor: "purple"
      },
      {
        taskName: "Task 6",
        taskStart: 2,
        taskDuration: 5,
        cellColor: "orange"
      },
      {
        taskName: "Task 7",
        taskStart: 4,
        taskDuration: 2,
        cellColor: "grey"
      },
      {
        taskName: "Task 8",
        taskStart: 3,
        taskDuration: 5,
        cellColor: "blue"
      },
      {
        taskName: "Task 9",
        taskStart: 5,
        taskDuration: 1,
        cellColor: "cyan"
      },
      {
        taskName: "Task 10",
        taskStart: 4,
        taskDuration: 3,
        cellColor: "red"
      }
    ]
  }
}

  render() {
    const { tasks } = this.state.tasks;

    return (
      <Table table="large" columns="13" celled structured>
        <TableHeaderRow
          tasksHeaderName={"Tasks"}
          timelineHeaderName={"Timeline"}
        />
        {tasks.map((task: any , index : any) => {
          return (
            <TaskRow
              key={index}
              taskName={task.taskName}
              taskStart={task.taskStart}
              taskDuration={task.taskDuration}
              cellColor={task.cellColor}
            />
          );
        })}
      </Table>
    );
  }
}
