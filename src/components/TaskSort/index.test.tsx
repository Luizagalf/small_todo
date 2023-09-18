import { render, fireEvent, screen } from "@testing-library/react";
import { SortedByType } from "types/SortedByType";
import TaskSort from "components/TaskSort";

const mockSortTasks = jest.fn();

const initialSortedBy: SortedByType = "new";

describe("TaskSort", () => {
  it("should render TaskSort component with default values", () => {
    render(<TaskSort sortTasks={mockSortTasks} sortedBy={initialSortedBy} />);
    const sortOpenBtn = screen.getByTestId("sortOpenBtn");

    expect(sortOpenBtn.textContent).toBe("date (new ones first)");
  });

  it("should toggle dropdown when button is clicked", () => {
    render(<TaskSort sortTasks={mockSortTasks} sortedBy={initialSortedBy} />);
    fireEvent.click(screen.getByTestId("sortOpenBtn"));

    expect(screen.getByTestId("sortMenu")).toHaveClass("slideDown");

    fireEvent.click(screen.getByText("date (old ones first)"));

    expect(screen.getByTestId("sortMenu")).not.toHaveClass("slideDown");
  });

  it("should call sortTasks when a sorting option is clicked", () => {
    render(<TaskSort sortTasks={mockSortTasks} sortedBy={initialSortedBy} />);
    fireEvent.click(screen.getByText("date (old ones first)"));

    expect(mockSortTasks).toHaveBeenCalledWith("old");
  });

  it("closes the menu when clicking outside", () => {
    render(<TaskSort sortTasks={mockSortTasks} sortedBy={null} />);

    const openButton = screen.getByTestId("sortOpenBtn");
    fireEvent.click(openButton);

    const menu = screen.getByTestId("sortMenu");
    expect(menu).toHaveClass("slideDown");

    fireEvent.mouseDown(document.body);

    expect(menu).not.toHaveClass("slideDown");
  });

  it("does not close the menu when clicking inside", () => {
    render(<TaskSort sortTasks={mockSortTasks} sortedBy={null} />);

    const openButton = screen.getByTestId("sortOpenBtn");
    fireEvent.click(openButton);

    const menu = screen.getByTestId("sortMenu");
    expect(menu).toHaveClass("slideDown");

    fireEvent.mouseDown(menu);

    expect(menu).toHaveClass("slideDown");
  });
});
