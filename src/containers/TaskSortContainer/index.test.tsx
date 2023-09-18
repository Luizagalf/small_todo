import { render, fireEvent, screen } from "@testing-library/react";
import TaskSortContainer from "containers/TaskSortContainer";

const mockSortTasks = jest.fn();

jest.mock("stores/TaskStore", () => ({
  useStores: () => ({
    sortTasks: mockSortTasks
  })
}));

describe("TaskSortContainer", () => {
  it("renders without crashing", () => {
    render(<TaskSortContainer />);
  });

  it("calls sortTasks when a low sorting option is selected", async () => {
    render(<TaskSortContainer />);

    const sortByLowButton = screen.getByText("priority (low first)");
    fireEvent.click(sortByLowButton);

    expect(mockSortTasks).toHaveBeenCalledWith("low");
  });
});
