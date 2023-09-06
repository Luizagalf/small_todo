import React from "react";
import ITask from "interfaces/ITask";
import { useStores } from "stores/TaskStore";
import TaskCreate from "components/TaskCreate";
import { observer } from "mobx-react-lite";

const TaskCreateContainer: React.FC = () => {
  const { addTask } = useStores();

  const handleAddTask = (task: ITask) => {
    addTask(task);
  };

  return <TaskCreate onAddTask={handleAddTask} />;
};

export default observer(TaskCreateContainer);
