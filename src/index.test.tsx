import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("renders the app title", () => {
    render(<App />);
    const titleElement = screen.getByText("ToDo List");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders TaskCreateContainer", () => {
    render(<App />);
    const taskCreateContainer = screen.getByTestId("createTaskBtn");
    expect(taskCreateContainer).toBeInTheDocument();
  });

  it("renders TaskMenuContainer", () => {
    render(<App />);
    const taskMenuContainer = screen.getByText("All");
    expect(taskMenuContainer).toBeInTheDocument();
  });

  it("renders TaskSortContainer", () => {
    render(<App />);
    const taskSortContainer = screen.getByTestId("sortOpenBtn");
    expect(taskSortContainer).toBeInTheDocument();
  });

  it("renders TaskListContainer", () => {
    render(<App />);
    const taskListContainer = screen.getByTestId("TaskList");
    expect(taskListContainer).toBeInTheDocument();
  });
});
