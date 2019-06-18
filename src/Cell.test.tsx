import React from "react";
import renderer from "react-test-renderer";
import { TaskCell } from "./components/TaskCell";

it("renders correctly", () => {
  const CELL = renderer
    .create(
      <TaskCell
        taskID={1}
        monthNumber={3}
        active={true}
        cellColor={"red"}
        taskStart={3}
        getCurrentCell={(taskID, monthNumber) => `taskID ${taskID} + monthNumber ${monthNumber}` }
      />
    )
    .toJSON();
  expect(CELL).toMatchSnapshot();
});
