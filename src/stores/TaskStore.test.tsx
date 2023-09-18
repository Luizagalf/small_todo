import { TaskStore } from "./TaskStore";
import ITasks from "interfaces/ITasks";
import ITask from "interfaces/ITask";
import taskService from "services/TaskService";

describe("TaskStore", () => {
  let taskStore: TaskStore;

  beforeEach(() => {
    taskStore = new TaskStore();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize with default values", () => {
    expect(taskStore.allTasks).toEqual({});
    expect(taskStore.sortedTasks).toEqual({});
    expect(taskStore.taskState).toBe("All");
    expect(taskStore.sortedBy).toBe(null);
  });

  it("should call loadTasks and update allTasks", () => {
    const mockLoadTasks = jest.spyOn(taskService, "loadTasks");
    mockLoadTasks.mockReturnValueOnce({
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
      }
    });

    taskStore.getTasks();

    expect(mockLoadTasks).toHaveBeenCalled();

    const expectedTasks: Record<string, ITask> = {
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
      }
    };

    expect(taskStore.allTasks).toEqual(expectedTasks);
  });

  it("should add a task", () => {
    const task: ITask = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "0",
      completed: false
    };

    taskStore.addTask(task);

    expect(taskStore.allTasks).toEqual({ "1": task });
  });

  it("should toggle task completion", () => {
    const task: ITask = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "0",
      completed: false
    };

    taskStore.addTask(task);
    taskStore.toggleTaskCompletion(task);
    expect(taskStore.allTasks["1"].completed).toBe(true);

    taskStore.toggleTaskCompletion(task);
    expect(taskStore.allTasks["1"].completed).toBe(false);
  });

  it("should not toggle completion for non-existent task", () => {
    const task: ITask = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "0",
      completed: false
    };

    taskStore.toggleTaskCompletion(task);

    expect(taskStore.allTasks["1"]).toBeUndefined();
  });

  it("should delete a task", () => {
    const task: ITask = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "0",
      completed: false
    };

    taskStore.addTask(task);
    taskStore.deleteTask(task);

    expect(taskStore.allTasks).toEqual({});
  });

  it("should set task state", () => {
    taskStore.setTasksState("Active");
    expect(taskStore.taskState).toBe("Active");
  });

  it("should filter tasks based on state 'Completed'", () => {
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

    taskStore.allTasks = tasksData;
    taskStore.taskState = "Completed";

    taskStore.filteredTaskList(taskStore.taskState);

    const expectedFilteredCompletedTasks: ITasks = {
      "2": tasksData["2"],
      "3": tasksData["3"]
    };

    expect(taskStore.sortedTasks).toEqual(expectedFilteredCompletedTasks);

    taskStore.taskState = "Active";
    taskStore.filteredTaskList(taskStore.taskState);

    const expectedFilteredActiveTasks: ITasks = {
      "1": tasksData["1"]
    };

    expect(taskStore.sortedTasks).toEqual(expectedFilteredActiveTasks);
  });

  it("should sort tasks by priority", () => {
    const task1: ITask = {
      id: "1",
      title: "Task 1",
      description: "This is task 1",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "2",
      completed: false
    };

    const task2: ITask = {
      id: "2",
      title: "Task 2",
      description: "This is task 2",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "1",
      completed: false
    };

    const task3: ITask = {
      id: "3",
      title: "Task 3",
      description: "This is task 3",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "0",
      completed: false
    };

    taskStore.addTask(task1);
    taskStore.addTask(task2);
    taskStore.addTask(task3);

    taskStore.sortTasks("high");
    const sortedTasksByHigh: ITasks = {
      "1": task1,
      "2": task2,
      "3": task3
    };
    expect(taskStore.sortedTasks).toEqual(sortedTasksByHigh);

    taskStore.sortTasks("low");
    const sortedTasksByLow: ITasks = {
      "3": task3,
      "2": task2,
      "1": task1
    };
    expect(taskStore.sortedTasks).toEqual(sortedTasksByLow);
  });

  it("should sort tasks by date", () => {
    const task1: ITask = {
      id: "1",
      title: "Task 1",
      description: "This is task 1",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "0",
      completed: false
    };

    const task2: ITask = {
      id: "2",
      title: "Task 2",
      description: "This is task 2",
      createdAt: "2023-09-06T13:00:00Z",
      priority: "0",
      completed: false
    };

    const task3: ITask = {
      id: "3",
      title: "Task 3",
      description: "This is task 3",
      createdAt: "2023-09-06T11:00:00Z",
      priority: "0",
      completed: false
    };

    taskStore.addTask(task1);
    taskStore.addTask(task2);
    taskStore.addTask(task3);

    taskStore.sortTasks("new");
    const sortedTasksByNew: ITasks = {
      "2": task2,
      "1": task1,
      "3": task3
    };
    expect(taskStore.sortedTasks).toEqual(sortedTasksByNew);

    taskStore.sortTasks("old");
    const sortedTasksByOld: ITasks = {
      "3": task3,
      "1": task1,
      "2": task2
    };
    expect(taskStore.sortedTasks).toEqual(sortedTasksByOld);
  });

  it("should delete a task and handle non-existent task deletion", () => {
    const task1: ITask = {
      id: "1",
      title: "Test Task 1",
      description: "This is test task 1",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "0",
      completed: false
    };

    const task2: ITask = {
      id: "2",
      title: "Test Task 2",
      description: "This is test task 2",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "1",
      completed: false
    };

    taskStore.addTask(task1);
    taskStore.addTask(task2);

    taskStore.deleteTask(task1);
    expect(taskStore.allTasks).toEqual({ "2": task2 });

    const nonExistentTask: ITask = {
      id: "3",
      title: "Non-Existent Task",
      description: "This task doesn't exist",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "2",
      completed: false
    };

    taskStore.deleteTask(nonExistentTask);
    expect(taskStore.allTasks).toEqual({ "2": task2 });
  });

  it("should handle sorting with an empty task list", () => {
    taskStore.sortTasks("low");
    expect(taskStore.sortedTasks).toEqual({});
  });

  it("should handle sorting with null sortedBy value", () => {
    const task: ITask = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      createdAt: "2023-09-06T12:00:00Z",
      priority: "0",
      completed: false
    };

    taskStore.addTask(task);
    taskStore.sortTasks(null);

    expect(taskStore.sortedBy).toBe(null);
    expect(taskStore.sortedTasks).toEqual({ "1": task });
  });
});
