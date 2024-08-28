import MyBtn from "./MyBtn";
import Input from "./MyInput";
import { useState } from "react";

export default function CreateTodo({ setTodosList, reloadTodosList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="createTodo">
      <Input inputValue={inputValue} setInputValue={setInputValue} />
      <MyBtn
        inputValue={inputValue}
        setTodosList={setTodosList}
        reloadTodosList={reloadTodosList}
      />
    </div>
  );
}
