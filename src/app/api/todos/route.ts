import { NextRequest, NextResponse } from "next/server";

// Todo type definition
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// In-memory store for todos (in a real app, you'd use a database)
export const todos: Array<Todo> = [];

/**
 * Get all them todos what is stored in the system
 *
 * @route {GET} /api/todos
 *
 * @return {Promise<NextResponse>} It give back all todo items what we has
 * @success {200} - All todo was fetched good
 *
 * @example Response what you gets
 * HTTP/1.1 200 OK
 * Content-Type: application/json
 *
 * [
 *   {
 *     "id": "1234567890",
 *     "title": "Do homework",
 *     "completed": false,
 *     "createdAt": "2024-03-21T10:00:00.000Z"
 *   },
 *   {
 *     "id": "0987654321",
 *     "title": "Buy milk",
 *     "completed": true,
 *     "createdAt": "2024-03-20T15:30:00.000Z"
 *   }
 * ]
 *
 * @note They ain't no error responses cos this endpoint cant fail innit
 */
export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 }
      );
    }

    // Create new todo
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: body.title,
      completed: false,
      createdAt: new Date(),
    };

    // Add to "database"
    todos.push(newTodo);

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
