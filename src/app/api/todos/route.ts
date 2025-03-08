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
 * Creates a new todo item in the todo list
 *
 * @route {POST} /api/todos
 *
 * @param {NextRequest} request - The incoming HTTP request
 *
 * @requestBody {Object} body
 * @requestBody {string} body.title - The title of the todo item to create
 *
 * @returns {Promise<NextResponse>} The response object
 * @success {201} - Todo created successfully
 * @error {400} - Invalid request body or missing/invalid title
 *
 * @example Request
 * POST /api/todos
 * Content-Type: application/json
 *
 * {
 *   "title": "Buy groceries"
 * }
 *
 * @example Success Response
 * HTTP/1.1 201 Created
 * Content-Type: application/json
 *
 * {
 *   "id": "1234567890",
 *   "title": "Buy groceries",
 *   "completed": false,
 *   "createdAt": "2024-03-21T10:00:00.000Z"
 * }
 *
 * @example Error Response
 * HTTP/1.1 400 Bad Request
 * Content-Type: application/json
 *
 * {
 *   "error": "Title is required and must be a string"
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
