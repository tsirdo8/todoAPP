"use client";

import "../components/main.css";
import TodoList from "../components/TodoList";
import { useState } from "react";
import CreateTodo from "@/components/CreateTodo";
import { getTodosFromBackend } from "@/services/data";

export default function Home() {
  const [todosList, setTodosList] = useState([]);

  async function reloadTodosList() {
    let todos = await getTodosFromBackend();
    setTodosList(todos);
  }

  return (
    <div className="container">
      <div className="todoApp">
        <div className="todoHeader">
          Todos (<span class="todosCount">{todosList.length}</span>)
        </div>
        <div className="todoBody">
          <CreateTodo
            reloadTodosList={reloadTodosList}
            setTodosList={setTodosList}
          />
          <TodoList
            todosList={todosList}
            setTodosList={setTodosList}
            reloadTodosList={reloadTodosList}
          />
        </div>
      </div>
    </div>
  );
}
