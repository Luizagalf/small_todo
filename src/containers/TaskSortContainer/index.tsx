import React from "react";
import { useStores } from "stores/TaskStore";
import { observer } from "mobx-react-lite";
import TaskSort from "components/TaskSort";
import { SortedByType } from "types/SortedByType";

const TaskSortContainer: React.FC = () => {
  const { sortedBy, sortTasks } = useStores();

  const handleSortTasks = (by: SortedByType) => {
    sortTasks(by);
  };

  return <TaskSort sortTasks={handleSortTasks} sortedBy={sortedBy} />;
};

export default observer(TaskSortContainer);
