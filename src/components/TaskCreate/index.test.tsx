import { render, fireEvent, screen } from "@testing-library/react";
import TaskCreate from "components/TaskCreate";

describe("TaskCreate", () => {
  it("should open modal when 'Create new task' button is clicked", () => {
    const mockOnAddTask = jest.fn();
    render(<TaskCreate onAddTask={mockOnAddTask} />);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("createTaskBtn"));

    expect(screen.getByTestId("modal")).toBeInTheDocument();

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });
});
