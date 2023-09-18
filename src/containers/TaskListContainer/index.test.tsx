import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import TaskListContainer from "containers/TaskListContainer";

const mockGetTasks = jest.fn();
const mockToggleTaskCompletion = jest.fn();
const mockDeleteTask = jest.fn();

const tasks = {
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

jest.mock("stores/TaskStore", () => ({
  useStores: () => ({
    sortedTasks: tasks,
    toggleTaskCompletion: mockToggleTaskCompletion,
    deleteTask: mockDeleteTask,
    getTasks: mockGetTasks
  })
}));

describe("TaskListContainer", () => {
  it("calls getTasks on mount", async () => {
    render(<TaskListContainer />);

    expect(mockGetTasks).toHaveBeenCalled();
  });

  it("handles task toggle correctly", async () => {
    render(<TaskListContainer />);
    const toggleButton = screen.getByTestId(`ToggleSwitch-${tasks["1"].id}`);

    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(mockToggleTaskCompletion).toHaveBeenCalledWith(tasks["1"]);
    });
  });

  it("handles task delete correctly", async () => {
    render(<TaskListContainer />);
    const deleteButton = screen.getByTestId(`deleteTaskBtn-${tasks["1"].id}`);

    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(mockDeleteTask).toHaveBeenCalledWith(tasks["1"]);
    });
  });
});
