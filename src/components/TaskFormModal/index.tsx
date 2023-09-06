import React from "react";
import ITaskFormModalProps from "./interface";
import styles from "./index.module.scss";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import ITask from "interfaces/ITask";
import { v4 as uuidv4 } from "uuid";
import { validationSchema } from "./validation";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";

Modal.setAppElement("#root");

const TaskFormModal: React.FC<ITaskFormModalProps> = ({
  onAddTask,
  isOpen,
  onClose
}) => {
  const initialValues: ITask = {
    id: uuidv4(),
    title: "",
    description: "",
    createdAt: new Date().toString(),
    priority: "0",
    completed: false
  };

  const handleSubmit = (values: ITask) => {
    onAddTask(values);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`${styles.modal} ${isOpen ? styles.modal__open : ""}`}
      overlayClassName="modal-overlay"
    >
      <div className={styles.content}>
        <h2 className={styles.title}>Create new task</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
          enableReinitialize
        >
          {({ isValid, dirty, handleBlur }: FormikProps<ITask>) => (
            <Form className={styles.form}>
              <div className={styles.block}>
                <label htmlFor="title">Title*</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  onBlur={handleBlur}
                />
                <ErrorMessage name="title" component="div" />
              </div>
              <div className={styles.block}>
                <label htmlFor="description">Description</label>
                <Field as="textarea" id="description" name="description" />
                <ErrorMessage name="description" component="div" />
              </div>
              <div className={styles.block}>
                <label htmlFor="priority">Priority</label>
                <Field as="select" id="priority" name="priority">
                  <option value="0">Low</option>
                  <option value="1">Medium</option>
                  <option value="2">High</option>
                </Field>
              </div>
              <button
                type="submit"
                disabled={!isValid || !dirty}
                className={styles.createBtn}
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
        <button className={styles.closebtn} onClick={onClose}>
          <GrFormClose />
        </button>
      </div>
    </Modal>
  );
};

export default TaskFormModal;
