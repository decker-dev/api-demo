import { type NextRequest, NextResponse } from 'next/server';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export const todos: Array<Todo> = [];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: body.title,
      completed: false,
      createdAt: new Date(),
    };

    todos.push(newTodo);

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
} 