"use client";

import { useEffect, useState } from "react";
import {
  deleteTodoOnBackend,
  editIsChecked,
  editTodoOnBackend,
} from "@/services/data";

export default function TodoList({ todosList, reloadTodosList }) {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    reloadTodosList();
  }, []);

  async function deleteTodo(todoId) {
    await deleteTodoOnBackend(todoId);
    await reloadTodosList();
  }

  async function handleCheckboxClick(isChecked, todoId) {
    await editIsChecked(todoId, isChecked);
    await reloadTodosList();
  }

  async function handleEditClick(todoId, currentTask) {
    setEditingTodoId(todoId);
    

  }

  async function handleSaveClick(todoId, currentTask) {
    await editTodoOnBackend(todoId, setNewTask);
    setNewTask(currentTask);
    console.log(currentTask);
    await reloadTodosList();
    setEditingTodoId(null);
  }

  return (
    <div className="todoList">
      {todosList.map((todo) => (
        <div key={todo._id} className="todoItem">
          <div className="todoCheckbox">
            <input
              checked={todo.completed ? true : false}
              onChange={(event) =>
                handleCheckboxClick(event.target.checked, todo._id)
              }
              type="checkbox"
            />
          </div>
          <div className="todoName">
            {editingTodoId === todo._id ? (
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onBlur={() => handleSaveClick(todo._id)}
                autoFocus
              />
            ) : (
              <span>{todo.task}</span>
            )}
          </div>
          <div className="actions">
            {editingTodoId === todo._id ? (
              <button onClick={() => handleSaveClick(todo._id,todo.task)}>Save</button>
            ) : (
              <button
                className="btnEdit"
                onClick={() => handleEditClick(todo._id)}
              >
                Edit
              </button>
            )}
            <button className="btnDelete" onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
