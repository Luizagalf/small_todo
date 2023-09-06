import ITask from "interfaces/ITask";

export default interface ITaskFormModalProps {
  onAddTask: (task: ITask) => void;
  isOpen: boolean;
  onClose: () => void;
}
