import { TasksStateType } from "types/TasksStateType";

export default interface ITaskMenuProps {
  setTasksState: (state: TasksStateType) => void;
  completed: TasksStateType;
}
