import { type NextRequest, NextResponse } from 'next/server';
import { Todo } from '../route';

import { todos } from '../route';

// GET handler to retrieve a specific todo by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todo = todos.find((t) => t.id === params.id);

  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

// PUT handler to update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const todoIndex = todos.findIndex((t) => t.id === params.id);

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    // Validate input
    if (body.title !== undefined && typeof body.title !== 'string') {
      return NextResponse.json(
        { error: 'Title must be a string' },
        { status: 400 }
      );
    }

    if (body.completed !== undefined && typeof body.completed !== 'boolean') {
      return NextResponse.json(
        { error: 'Completed must be a boolean' },
        { status: 400 }
      );
    }

    // Update todo
    const updatedTodo = {
      ...todos[todoIndex],
      ...(body.title !== undefined ? { title: body.title } : {}),
      ...(body.completed !== undefined ? { completed: body.completed } : {})
    };

    todos[todoIndex] = updatedTodo;

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// DELETE handler to remove a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todoIndex = todos.findIndex((t) => t.id === params.id);

  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }

  const deletedTodo = todos[todoIndex];
  todos.splice(todoIndex, 1);

  return NextResponse.json(deletedTodo);
} 