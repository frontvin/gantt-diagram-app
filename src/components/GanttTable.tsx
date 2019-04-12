import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { TableHeaderRow, monthNames } from "./TableHeaderRow";
import { Task } from "./TaskRow";

console.log(monthNames)


export class GanttTable extends Component {

  render() {
    const tasks = [
      {
        taskName: "Task 1",
        taskStart: 5,
        taskDuration: 1,
        cellcolor: "red"
      },
      {
        taskName: "Task 2",
        taskStart: 1,
        taskDuration: 1,
        cellcolor: "blue"
      },
      {
        taskName: "Task 3",
        taskStart: 9,
        taskDuration: 1,
        cellcolor: "green"
      },
      {
        taskName: "Task 4",
        taskStart: 3,
        taskDuration: 1,
        cellcolor: "yellow"
      },
      {
        taskName: "Task 5",
        taskStart: 1,
        taskDuration: 1,
        cellcolor: "purple"
      },
      {
        taskName: "Task 6",
        taskStart: 2,
        taskDuration: 1,
        cellcolor: "orange"
      },
      {
        taskName: "Task 7",
        taskStart: 4,
        taskDuration: 1,
        cellcolor: "grey"
      },
      {
        taskName: "Task 8",
        taskStart: 3,
        taskDuration: 1,
        cellcolor: "blue"
      },
      {
        taskName: "Task 9",
        taskStart: 5,
        taskDuration: 1,
        cellcolor: "cian"
      },
      {
        taskName: "Task 10",
        taskStart: 4,
        taskDuration: 1,
        cellcolor: "red",
      }
    ];

    const monthsWithTasks = tasks.reduce((acc: any, curr) => {
      if (acc[monthNames[curr.taskStart]]) {
        acc[monthNames[curr.taskStart]].push(curr);
      } else {
        acc[monthNames[curr.taskStart]]= [curr];
      }
      return acc;
    }, {});

    console.log(monthsWithTasks);

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
