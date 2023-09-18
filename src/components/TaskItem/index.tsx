import React from "react";
import ITaskItemProps from "./interface";
import ToggleSwitch from "components/ToggleSwitch";
import styles from "./index.module.scss";
import {
  FcMediumPriority,
  FcLowPriority,
  FcHighPriority
} from "react-icons/fc";
import { MdDelete } from "react-icons/md";

const TaskItem: React.FC<ITaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`${styles.task} ${task.completed ? "completed" : ""}`}>
      <div className={styles.wrapper}>
        <ToggleSwitch
          checked={task.completed}
          onChange={onToggle}
          testId={`ToggleSwitch-${task.id}`}
        />
        <div className={styles.main}>
          <h3
            className={`${styles.title} ${
              task.completed ? styles.title__completed : ""
            }`}
          >
            {task.title}
          </h3>
          <p
            className={`${styles.description} ${
              task.completed ? styles.description__completed : ""
            }`}
          >
            {task.description}
          </p>
          <p className={styles.date}>
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className={styles.details}>
        {task.priority === "0" ? (
          <FcLowPriority data-testid="lowPriorityIcon" />
        ) : task.priority === "1" ? (
          <FcMediumPriority data-testid="mediumPriorityIcon" />
        ) : (
          <FcHighPriority data-testid="highPriorityIcon" />
        )}
        <button
          onClick={onDelete}
          className={styles.deletebtn}
          data-testid={`deleteTaskBtn-${task.id}`}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
