import ITask from "interfaces/ITask";
import ITasks from "interfaces/ITasks";

export default interface ITaskListProps {
  tasks: ITasks;
  onToggle: (task: ITask) => void;
  onDelete: (task: ITask) => void;
}
