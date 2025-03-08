import { type NextRequest, NextResponse } from 'next/server';

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

// POST handler to create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' },
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
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
} 