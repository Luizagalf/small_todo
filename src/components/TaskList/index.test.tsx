import { render, screen } from "@testing-library/react";
import TaskList from "components/TaskList";

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

const mockToggleTask = jest.fn();
const mockDeleteTask = jest.fn();

describe("TaskList", () => {
  it("renders tasks correctly", () => {
    render(
      <TaskList
        tasks={tasks}
        onToggle={mockToggleTask}
        onDelete={mockDeleteTask}
      />
    );

    const task1Element = screen.getByText("Test Task 1");
    const task2Element = screen.getByText("Test Task 2");

    expect(task1Element).toBeInTheDocument();
    expect(task2Element).toBeInTheDocument();
  });

  it("displays 'No tasks' message when there are no tasks", () => {
    render(
      <TaskList
        tasks={{}}
        onToggle={mockToggleTask}
        onDelete={mockDeleteTask}
      />
    );

    const noTasksMessage = screen.getByText("No tasks");
    expect(noTasksMessage).toBeInTheDocument();
  });
});
