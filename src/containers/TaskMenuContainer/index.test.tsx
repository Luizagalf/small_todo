import { render, fireEvent, screen } from "@testing-library/react";
import TaskMenuContainer from "containers/TaskMenuContainer";

const mockSetTasksState = jest.fn();

jest.mock("stores/TaskStore", () => ({
  useStores: () => ({
    setTasksState: mockSetTasksState
  })
}));

describe("TaskMenuContainer", () => {
  it("renders without crashing", () => {
    render(<TaskMenuContainer />);
  });

  it("calls setTasksState when a state is selected", async () => {
    render(<TaskMenuContainer />);

    const stateButton = screen.getByText("Active");
    fireEvent.click(stateButton);

    expect(mockSetTasksState).toHaveBeenCalledWith("Active");
  });

  it("calls setTasksState when a state is completed", async () => {
    render(<TaskMenuContainer />);

    const stateButton = screen.getByText("Completed");
    fireEvent.click(stateButton);

    expect(mockSetTasksState).toHaveBeenCalledWith("Completed");
  });
});
