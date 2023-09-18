import ITask from "interfaces/ITask";
import ITasks from "interfaces/ITasks";
import taskService from "services/TaskService";
import { createContext, useContext } from "react";
import { TasksStateType } from "types/TasksStateType";
import { makeAutoObservable } from "mobx";
import { SortedByType } from "types/SortedByType";

export class TaskStore {
  allTasks: ITasks = {};
  sortedTasks: ITasks = {};
  taskState: TasksStateType = "All";
  sortedBy: SortedByType = null;

  constructor() {
    makeAutoObservable(this);
  }

  getTasks = (): void => {
    this.allTasks = taskService.loadTasks();
    this.filteredTaskList(this.taskState);
  };

  addTask = (task: ITask): void => {
    this.allTasks[task.id] = task;
    this.filteredTaskList(this.taskState);
    taskService.saveTasks(this.allTasks);
  };

  toggleTaskCompletion = (task: ITask): void => {
    if (this.allTasks[task.id]) {
      this.allTasks[task.id].completed = !this.allTasks[task.id].completed;
      this.filteredTaskList(this.taskState);
      taskService.saveTasks(this.allTasks);
    }
  };

  deleteTask = (task: ITask): void => {
    delete this.allTasks[task.id];
    this.filteredTaskList(this.taskState);
    taskService.saveTasks(this.allTasks);
  };

  setTasksState = (state: TasksStateType): void => {
    this.taskState = state;
    this.filteredTaskList(state);
  };

  filteredTaskList = (state: TasksStateType): void => {
    this.sortedBy = null;
    const filtered = Object.keys(this.allTasks)
      .filter((taskId) => {
        const task = this.allTasks[taskId];
        switch (state) {
          case "Completed":
            return task.completed;
          case "Active":
            return !task.completed;
          default:
            return true;
        }
      })
      .reduce((acc: ITasks, taskId) => {
        acc[taskId] = this.allTasks[taskId];
        return acc;
      }, {});

    this.sortedTasks = filtered;
  };

  sortTasks = (by: SortedByType): void => {
    this.sortedBy = by;

    switch (by) {
      case "low": {
        this.sortByPriority("low");
        break;
      }
      case "high": {
        this.sortByPriority("high");
        break;
      }
      case "new": {
        this.sortByDate("new");
        break;
      }
      case "old": {
        this.sortByDate("old");
        break;
      }
      case null: {
        this.filteredTaskList(this.taskState);
      }
    }
  };

  sortByPriority = (by: "low" | "high"): void => {
    switch (by) {
      case "low": {
        this.sortedTasks = Object.fromEntries(
          Object.entries(this.sortedTasks).sort(
            ([, a], [, b]) => Number(a.priority) - Number(b.priority)
          )
        );
        break;
      }
      case "high": {
        this.sortedTasks = Object.fromEntries(
          Object.entries(this.sortedTasks).sort(
            ([, a], [, b]) => Number(b.priority) - Number(a.priority)
          )
        );
        break;
      }
    }
  };

  sortByDate = (by: "new" | "old"): void => {
    switch (by) {
      case "new": {
        this.sortedTasks = Object.fromEntries(
          Object.entries(this.sortedTasks).sort(
            ([, a], [, b]) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
        break;
      }
      case "old": {
        this.sortedTasks = Object.fromEntries(
          Object.entries(this.sortedTasks).sort(
            ([, a], [, b]) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
        break;
      }
    }
  };
}

const StoreContext = createContext<TaskStore>(new TaskStore());

export const useStores = () => useContext(StoreContext);
