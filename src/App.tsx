import styles from "./app.module.scss";
import TaskCreateContainer from "containers/TaskCreateContainer";
import TaskListContainer from "containers/TaskListContainer";
import TaskMenuContainer from "containers/TaskMenuContainer";
import TaskSortContainer from "containers/TaskSortContainer";

function App() {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.title}>ToDo List</h1>
        <TaskCreateContainer />
        <div className={styles.menu}>
          <TaskMenuContainer />
          <TaskSortContainer />
        </div>
        <TaskListContainer />
      </div>
    </div>
  );
}

export default App;
