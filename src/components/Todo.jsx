import React, { useState } from "react";

const Todo = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editInput, setEditInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    setTodoList([...todoList, todoInput]);
    setTodoInput("");
  };

  const handleTodoDelete = (index) => {
    setTodoList(todoList.filter((todo, i) => i !== index));
  };

  const handleEditSubmit = (e, index) => {
    e.preventDefault();
    if (!editInput.trim()) return;
    const newTodos = todoList.map((todo, i) =>
      i === index ? editInput : todo
    );
    setTodoList(newTodos);
    handleCancel();
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditInput("");
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditInput(todoList[index]);
  };

  return (
    <div data-testid="todo-1">
      <h1>Todo App Unit Testing</h1>
      <form onSubmit={handleTodoSubmit}>
        <input
          type="text"
          placeholder="Enter Your Task"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <form onSubmit={(e) => handleEditSubmit(e, index)}>
                <input
                  type="text"
                  placeholder="Edit Your Task"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span>{todo}</span>
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => handleTodoDelete(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
