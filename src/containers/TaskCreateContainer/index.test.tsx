import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import TaskCreateContainer from "containers/TaskCreateContainer";

const mockAddTask = jest.fn();

jest.mock("stores/TaskStore", () => ({
  useStores: () => ({
    addTask: mockAddTask
  })
}));

describe("TaskCreateContainer", () => {
  it("renders without crashing", () => {
    render(<TaskCreateContainer />);
  });

  it("calls addTask when a task is created", async () => {
    render(<TaskCreateContainer />);
    fireEvent.click(screen.getByTestId("createTaskBtn"));

    const titleInput = screen.getByLabelText("Title*");
    const descriptionInput = screen.getByLabelText("Description");
    const createButton = screen.getByTestId("modalCreateBtn");

    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "This is a test task" }
    });

    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith({
        id: expect.any(String),
        title: "Test Task",
        description: "This is a test task",
        createdAt: expect.any(String),
        priority: "0",
        completed: false
      });
    });
  });
});
