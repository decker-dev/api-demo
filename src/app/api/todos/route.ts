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

// GET handler to retrieve all todos
export async function GET() {
  return NextResponse.json(todos);
}

/**
 * Creates a new todo item
 * @route POST /api/todos
 *
 * @param {NextRequest} request - The incoming request object
 * @body {Object} request.body - The request body
 * @body {string} request.body.title - The title of the todo item
 *
 * @returns {Promise<NextResponse>}
 * - 201: Returns the created todo item
 * - 400: Returns error if title is missing or invalid
 * @example
 * {
 *   "title": "Buy groceries"
 * }
 * {
 *   "id": "1234567890",
 *   "title": "Buy groceries",
 *   "completed": false,
 *   "createdAt": "2024-03-21T10:00:00.000Z"
 * }
 */
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
