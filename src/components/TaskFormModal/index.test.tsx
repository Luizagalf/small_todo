import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TaskFormModal from "components/TaskFormModal";

const mockOnAddTask = jest.fn();
const mockOnClose = jest.fn();

describe("TaskFormModal", () => {
  it("should render TaskFormModal with initial values", () => {
    render(
      <TaskFormModal
        onAddTask={mockOnAddTask}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Create new task")).toBeInTheDocument();
    expect(screen.getByTestId("modalCreateBtn")).toBeInTheDocument();
    expect(screen.getByLabelText("Title*")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Priority")).toBeInTheDocument();
    expect(screen.getByTestId("modalCloseBtn")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    render(
      <TaskFormModal
        onAddTask={mockOnAddTask}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByTestId("modalCloseBtn"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onAddTask when form is submitted with valid data", async () => {
    render(
      <TaskFormModal
        onAddTask={mockOnAddTask}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    fireEvent.change(screen.getByLabelText("Title*"), {
      target: { value: "Test Task" }
    });

    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "This is a test task" }
    });

    fireEvent.change(screen.getByLabelText("Priority"), {
      target: { value: "1" }
    });

    fireEvent.click(screen.getByTestId("modalCreateBtn"));

    await waitFor(() => {
      expect(mockOnAddTask).toHaveBeenCalledWith({
        id: expect.any(String),
        title: "Test Task",
        description: "This is a test task",
        createdAt: expect.any(String),
        priority: "1",
        completed: false
      });
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onAddTask when form is submitted with invalid data", () => {
    render(
      <TaskFormModal
        onAddTask={mockOnAddTask}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByTestId("modalCreateBtn"));

    expect(mockOnAddTask).not.toHaveBeenCalled();

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
