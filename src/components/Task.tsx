import React from 'react';
import { Table } from "semantic-ui-react";
import { TaskCell } from './TaskCell'

// *******************************************************
// Task component
// task interface
interface ITask {
  taskID: number
  taskName: string;
  taskStart: number;
  taskDuration: number;
  cellColor: string;
  changeTaskDuration: (taskID: number, taskStart: number, monthNumber: number) => void
}

const monthNumbers = Array.from({ length: 12 }, (j, i) => i + 1);

const taskActiveInMonth = (
  monthNumber: number,
  taskStart: number,
  taskDuration: number
): boolean => {
  return taskStart <= monthNumber && monthNumber < taskStart + taskDuration;
};

export const Task: React.FC<ITask> = (props) => {

  const getCurrentCell = (
    taskID: number,
    monthNumber: number,
  ): void => {

    let initialTaskStart = props.taskStart;

    if (monthNumber > initialTaskStart) {
      let newDuration = monthNumber - props.taskStart + 1;
      props.changeTaskDuration(taskID, props.taskStart, newDuration);
    }
    else if (monthNumber < initialTaskStart) {
      // let newTaskStart = monthNumber;
      let newTaskStart = monthNumber;
      let taskEnd = props.taskStart + props.taskDuration;
      let newDuration = taskEnd - newTaskStart + 1;
      props.changeTaskDuration(taskID, newTaskStart, newDuration);
    }
    else {
      props.changeTaskDuration(taskID, 0, 0);
    }



    console.log(`monthNumber ${monthNumber}, taskID ${taskID}`);
  };

  return (
    <Table.Row>
      <Table.Cell>{props.taskName}</Table.Cell>
      {monthNumbers.map(monthNumber => (
        <TaskCell
          key={`${monthNumber}-${props.taskName}`}
          taskID={props.taskID}
          monthNumber={monthNumber}
          taskName={props.taskName}
          taskStart={props.taskStart}
          cellColor={props.cellColor}
          active={taskActiveInMonth(
            monthNumber,
            props.taskStart,
            props.taskDuration
          )}
          getCurrentCell={getCurrentCell}
        />
      ))}
    </Table.Row>
  )
};