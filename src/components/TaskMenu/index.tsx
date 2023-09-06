import React from "react";
import ITaskMenuProps from "./interface";
import styles from "./index.module.scss";
import { TasksStateType } from "types/TasksStateType";

const TaskMenu: React.FC<ITaskMenuProps> = ({ setTasksState, completed }) => {
  const titles: TasksStateType[] = ["All", "Active", "Completed"];

  return (
    <div>
      {titles.map((title) => (
        <button
          className={`${styles.title} ${
            completed === title ? styles.title__isActive : ""
          }`}
          onClick={() => setTasksState(title)}
          key={title}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default TaskMenu;
