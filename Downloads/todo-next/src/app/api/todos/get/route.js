import { todos } from "@/services/mongo";

export async function GET() {
  try {
    const allTodos = await todos.find().toArray();
    return new Response(JSON.stringify(allTodos));
  } catch (error) {
    console.error("Error fetching todos:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
