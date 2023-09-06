import React from "react";
import { useStores } from "stores/TaskStore";
import { observer } from "mobx-react-lite";
import TaskMenu from "components/TaskMenu";
import { TasksStateType } from "types/TasksStateType";

const TaskMenuContainer: React.FC = () => {
  const { taskState, setTasksState } = useStores();

  const handleSetTasksState = (state: TasksStateType) => {
    setTasksState(state);
  };

  return <TaskMenu setTasksState={handleSetTasksState} completed={taskState} />;
};

export default observer(TaskMenuContainer);
