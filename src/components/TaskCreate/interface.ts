import ITask from "interfaces/ITask";

export default interface ITaskCreateProps {
  onAddTask: (task: ITask) => void;
}
