import ITasks from "interfaces/ITasks";

export class TaskService {
  saveTasks = (tasks: ITasks): void => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  loadTasks = (): ITasks => {
    const tasksJSON = localStorage.getItem("tasks");
    return tasksJSON ? JSON.parse(tasksJSON) : {};
  };
}

const taskService = new TaskService();

export default taskService;
