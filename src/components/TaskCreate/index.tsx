import React, { useState } from "react";
import ITaskCreateProps from "./interface";
import styles from "./index.module.scss";
import TaskFormModal from "components/TaskFormModal";

const TaskCreate: React.FC<ITaskCreateProps> = ({ onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal} className={styles.btn}>
        Create new task
      </button>
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddTask={onAddTask}
      />
    </>
  );
};

export default TaskCreate;
