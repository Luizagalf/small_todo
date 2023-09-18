import React from "react";
import ITaskListProps from "./interface";
import TaskItem from "components/TaskItem";
import styles from "./index.module.scss";

const TaskList: React.FC<ITaskListProps> = ({ tasks, onToggle, onDelete }) => {
  return (
    <div className={styles.wrapper} data-testid="TaskList">
      <div className={styles.taskList}>
        {Object.values(tasks)?.length ? (
          Object.values(tasks).map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggle(task)}
              onDelete={() => onDelete(task)}
            />
          ))
        ) : (
          <p className={styles.title}>No tasks</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
