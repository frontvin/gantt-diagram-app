import React from "react";
import { shallow } from "enzyme";
import { Task } from "./components/Task";
import { changeTaskDuration } from "./App";
import { TaskCell } from "./components/TaskCell";


describe("<Task />", () => {
  it("renders <Task /> component", () => {
    const wrapper = shallow(
      <Task
        taskID={1}
        taskName={"Task 1"}
        taskStart={3}
        taskDuration={5}
        cellColor={"red"}
        changeTaskDuration={() => changeTaskDuration}
      />
    );
    expect(
      wrapper.contains(
        <TaskCell
          taskID={1}
          monthNumber={3}
          active={true}
          cellColor={"red"}
          taskStart={3}
          getCurrentCell={(taskID, monthNumber) =>
            `taskID ${taskID} + monthNumber ${monthNumber}`
          }
        />
      )
    );
  });
});
