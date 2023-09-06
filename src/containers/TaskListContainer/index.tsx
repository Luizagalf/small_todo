import React, { useEffect } from "react";
import ITask from "interfaces/ITask";
import { useStores } from "stores/TaskStore";
import { observer } from "mobx-react-lite";
import TaskList from "components/TaskList";

const TaskListContainer: React.FC = () => {
  const { sortedTasks, toggleTaskCompletion, deleteTask, getTasks } =
    useStores();

  const handleToggleTask = (task: ITask) => {
    toggleTaskCompletion(task);
  };

  const handleDeleteTask = (task: ITask) => {
    deleteTask(task);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskList
      tasks={sortedTasks}
      onToggle={handleToggleTask}
      onDelete={handleDeleteTask}
    />
  );
};

export default observer(TaskListContainer);
