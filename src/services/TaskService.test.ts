import { TaskService } from "./TaskService";
import ITasks from "interfaces/ITasks";

describe("TaskService", () => {
  let taskService: TaskService;

  const tasksData: ITasks = {
    "1": {
      id: "1",
      title: "Test Task 1",
      description: "This is test task 1",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "0",
      completed: false
    },
    "2": {
      id: "2",
      title: "Test Task 2",
      description: "This is test task 2",
      createdAt: "2023-09-06T13:00:00Z",
      priority: "1",
      completed: true
    },
    "3": {
      id: "3",
      title: "Test Task 3",
      description: "This is test task 3",
      createdAt: "2023-09-06T14:00:00Z",
      priority: "2",
      completed: true
    }
  };

  beforeEach(() => {
    taskService = new TaskService();
  });

  it("should save tasks to localStorage", () => {
    taskService.saveTasks(tasksData);

    const savedTasksJSON = localStorage.getItem("tasks");
    const savedTasks: ITasks = JSON.parse(savedTasksJSON as string);

    expect(savedTasks).toEqual(tasksData);
  });

  it("should load tasks from localStorage", () => {
    localStorage.setItem("tasks", JSON.stringify(tasksData));

    const loadedTasks = taskService.loadTasks();

    expect(loadedTasks).toEqual(tasksData);
  });

  it("should handle empty or invalid localStorage data", () => {
    localStorage.removeItem("tasks");

    const loadedTasks = taskService.loadTasks();

    expect(loadedTasks).toEqual({});
  });
});
