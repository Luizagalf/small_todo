import { render, fireEvent, screen } from "@testing-library/react";
import TaskItem from "components/TaskItem";

const mockToggleTask = jest.fn();
const mockDeleteTask = jest.fn();

describe("TaskItem", () => {
  it("renders without crashing", () => {
    const task = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      createdAt: "2023-09-18T12:00:00Z",
      priority: "0",
      completed: false
    };

    render(
      <TaskItem
        task={task}
        onToggle={mockToggleTask}
        onDelete={mockDeleteTask}
      />
    );
  });

  it("renders Low Priority icon when priority is 0", () => {
    const task = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      createdAt: "2023-09-18T12:00:00Z",
      priority: "0",
      completed: false
    };

    render(
      <TaskItem
        task={task}
        onToggle={mockToggleTask}
        onDelete={mockDeleteTask}
      />
    );

    const lowPriorityIcon = screen.getByTestId("lowPriorityIcon");
    expect(lowPriorityIcon).toBeInTheDocument();
  });

  it("renders Medium Priority icon when priority is 1", () => {
    const task = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      createdAt: "2023-09-18T12:00:00Z",
      priority: "1",
      completed: false
    };

    render(
      <TaskItem
        task={task}
        onToggle={mockToggleTask}
        onDelete={mockDeleteTask}
      />
    );

    const mediumPriorityIcon = screen.getByTestId("mediumPriorityIcon");
    expect(mediumPriorityIcon).toBeInTheDocument();
  });

  it("renders High Priority icon when priority is not 0 or 1", () => {
    const task = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      createdAt: "2023-09-18T12:00:00Z",
      priority: "2",
      completed: false
    };

    render(
      <TaskItem
        task={task}
        onToggle={mockToggleTask}
        onDelete={mockDeleteTask}
      />
    );

    const highPriorityIcon = screen.getByTestId("highPriorityIcon");
    expect(highPriorityIcon).toBeInTheDocument();
  });
});
