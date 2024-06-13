import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Todo from "../Todo";

test("renders Todo App", () => {
  render(<Todo />);
  expect(screen.getByText("Todo App Unit Testing")).toBeInTheDocument();
});

test("adds a new Todo", () => {
  render(<Todo />);
  fireEvent.change(screen.getByPlaceholderText("Enter Your Task"), {
    target: { value: "New Todo" },
  });
  fireEvent.click(screen.getByText("Add Task"));
  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

test("delete a todo", () => {
  render(<Todo />);
  fireEvent.change(screen.getByPlaceholderText("Enter Your Task"), {
    target: { value: "Delete me" },
  });
  fireEvent.click(screen.getByText("Add Task"));
  fireEvent.click(screen.getByText("Delete"));
  expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
});

test("starts editing a todo", () => {
  render(<Todo />);
  fireEvent.change(screen.getByPlaceholderText("Enter Your Task"), {
    target: { value: "Edit me" },
  });
  fireEvent.click(screen.getByText("Add Task"));
  fireEvent.click(screen.getByText("Edit"));
  expect(screen.getByDisplayValue("Edit me")).toBeInTheDocument();
});

test("cancels editing a todo", () => {
  render(<Todo />);
  fireEvent.change(screen.getByPlaceholderText("Enter Your Task"), {
    target: { value: "Cancel Edit" },
  });
  fireEvent.click(screen.getByText("Add Task"));
  fireEvent.click(screen.getByText("Edit"));
  fireEvent.click(screen.getByText("Cancel"));
  expect(screen.getByText("Cancel Edit")).toBeInTheDocument();
});

test("edit a todo", () => {
  render(<Todo />);
  fireEvent.change(screen.getByPlaceholderText("Enter Your Task"), {
    target: { value: "Original" },
  });
  fireEvent.click(screen.getByText("Add Task"));
  fireEvent.click(screen.getByText("Edit"));
  fireEvent.change(screen.getByDisplayValue("Original"), {
    target: { value: "Edited" },
  });
  fireEvent.click(screen.getByText("Save"));
  expect(screen.getByText("Edited")).toBeInTheDocument();
  expect(screen.queryByText("Original")).not.toBeInTheDocument();
});
