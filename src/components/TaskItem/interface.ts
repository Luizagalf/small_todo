import ITask from "interfaces/ITask";

export default interface ITaskItemProps {
  task: ITask;
  onToggle: () => void;
  onDelete: () => void;
}
