import React from "react";
import IToggleSwitchProps from "./interface";
import styles from "./index.module.scss";

const TaskItem: React.FC<IToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <div>
      <div
        className={`${styles.toggleSwitch} ${
          checked ? styles.toggleSwitch__active : ""
        }`}
        onClick={onChange}
      />
    </div>
  );
};

export default TaskItem;
