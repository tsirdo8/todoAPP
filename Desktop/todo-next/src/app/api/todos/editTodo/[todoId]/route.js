import { ObjectId } from "mongodb";
import { todos } from "@/services/mongo";

export async function POST(req, { params }) {
  const { todoId } = params; // Extract todoId from the URL parameters

  if (!todoId) {
    return new Response(JSON.stringify({ error: "Todo ID is required" }), {
      status: 400,
    });
  }

  const { task } = await req.json(); // Extract the updated task from the request body

  const result = await todos.updateOne(
    { _id: new ObjectId(todoId) },
    { $set: { task: task } }
  );

  if (result.matchedCount === 0) {
    return new Response(JSON.stringify({ error: "Todo not found" }), {
      status: 404,
    });
  }

  return new Response(
    JSON.stringify({ message: "Todo updated successfully" }),
    { status: 200 }
  );
}
