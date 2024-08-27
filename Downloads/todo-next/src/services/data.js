let localServerUrl = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL; // http://localhost:3000/api/todos

export async function getTodosFromBackend() {
  try {
    let response = await fetch(`${localServerUrl}/get`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let todos = await response.json();
    return todos;
  } catch (error) {
    console.error("Error fetching todos from backend:", error);
    return [];
  }
}

export async function createTodoOnBackend(inputValue) {
  await fetch(`${localServerUrl}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: inputValue }),
  });
}

export async function deleteTodoOnBackend(todoId) {
  await fetch(`${localServerUrl}/delete/${todoId}`, {
    method: "POST",
  });
}

export async function editIsChecked(todoId, isChecked) {
  await fetch(`${localServerUrl}/edit/${todoId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: isChecked }),
  });
}
