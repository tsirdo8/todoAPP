"use client";

import { useEffect, useState } from "react";
import { deleteTodoOnBackend, editIsChecked } from "@/services/data";

export default function TodoSia({ todosList, reloadTodosList }) {
  useEffect(async () => {
    await reloadTodosList();
  }, []);

  async function deleteTodo(todoId) {
    await deleteTodoOnBackend(todoId);
    await reloadTodosList();
  }

  async function handleCheckboxClick(isChecked, todoId) {
    await editIsChecked(todoId, isChecked);
    await reloadTodosList();
  }

  return (
    <div className="todoList">
      {todosList.map((todo) => {
        return (
          <div className="todoItem">
            <div className="todoCheckbox">
              <input
                checked={todo.completed ? true : false}
                onChange={(event) => {
                  handleCheckboxClick(event.target.checked, todo._id);
                }}
                type="checkbox"
                data-todoid="762"
              />
            </div>
            <div className="todoName">{todo.task}</div>
            <div className="actions">
              <button className="btnEdit">Edit</button>
              <button
                className="btnDelete"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
