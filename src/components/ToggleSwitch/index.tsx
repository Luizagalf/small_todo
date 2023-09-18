import React from "react";
import IToggleSwitchProps from "./interface";
import styles from "./index.module.scss";

const TaskItem: React.FC<IToggleSwitchProps> = ({
  checked,
  onChange,
  testId
}) => {
  return (
    <div>
      <button
        className={`${styles.toggleSwitch} ${
          checked ? styles.toggleSwitch__active : ""
        }`}
        onClick={onChange}
        data-testid={testId}
      />
    </div>
  );
};

export default TaskItem;
