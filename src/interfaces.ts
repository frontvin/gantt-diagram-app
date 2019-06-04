export interface INormalizedData<T> {
  [ids: string]: T;
}

export interface ITasksState {
  ids: TaskId[];
  tasksById: { [id: number]: IOneTask };
}

export interface IOneTask {
  id: TaskId;
  taskName: string;
  taskStart: number;
  taskDuration: number;
  cellColor: string;
}

export interface INormalizedTasksResponse {
  result: number[];
  entities: {
    tasksById: INormalizedData<IOneTask>;
  };
}

type TaskId = number;