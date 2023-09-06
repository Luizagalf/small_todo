import { SortedByType } from "types/SortedByType";

export default interface ITaskSortProps {
  sortedBy: SortedByType;
  sortTasks: (by: SortedByType) => void;
}
