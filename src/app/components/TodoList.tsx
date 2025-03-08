"use client";

import { useState, useEffect } from "react";
import type { Todo } from "../api/todos/route";

/**
 * TodoList Component
 * 
 * A React component that manages and displays a list of todo items.
 * Provides functionality for viewing, adding, and managing todo items.
 * 
 * @component
 * @returns {JSX.Element} A todo list interface with input field and list of todos
 */
export default function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch all todos
	const fetchTodos = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/todos");
			if (!response.ok) throw new Error("Failed to fetch todos");
			const data = await response.json();
			setTodos(data);
			setError(null);
		} catch (err) {
			setError("Error loading todos. Please try again.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	// Add a new todo
	const addTodo = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		try {
			const response = await fetch("/api/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title }),
			});

			if (!response.ok) throw new Error("Failed to add todo");

			const newTodo = await response.json();
			setTodos([...todos, newTodo]);
			setTitle("");
			setError(null);
		} catch (err) {
			setError("Error adding todo. Please try again.");
			console.error(err);
		}
	};

	// Toggle todo completion status
	const toggleTodo = async (id: string, completed: boolean) => {
		try {
			const response = await fetch(`/api/todos/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ completed: !completed }),
			});

			if (!response.ok) throw new Error("Failed to update todo");

			const updatedTodo = await response.json();
			setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
			setError(null);
		} catch (err) {
			setError("Error updating todo. Please try again.");
			console.error(err);
		}
	};

	// Delete a todo
	const deleteTodo = async (id: string) => {
		try {
			const response = await fetch(`/api/todos/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) throw new Error("Failed to delete todo");

			setTodos(todos.filter((todo) => todo.id !== id));
			setError(null);
		} catch (err) {
			setError("Error deleting todo. Please try again.");
			console.error(err);
		}
	};

	// Load todos on component mount
	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<div className="w-full max-w-lg">
			<h1 className="text-2xl font-bold mb-4">Todo List</h1>

			{/* Error message */}
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			{/* Add todo form */}
			<form onSubmit={addTodo} className="mb-6 flex gap-2">
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Add a new todo..."
					className="flex-grow px-4 py-2 border rounded"
				/>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
				>
					Add
				</button>
			</form>

			{/* Todo list */}
			{loading ? (
				<p>Loading todos...</p>
			) : todos.length === 0 ? (
				<p>No todos yet. Add one above!</p>
			) : (
				<ul className="space-y-2">
					{todos.map((todo) => (
						<li
							key={todo.id}
							className="flex items-center justify-between border rounded p-3"
						>
							<div className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id, todo.completed)}
									className="h-5 w-5"
								/>
								<span
									className={todo.completed ? "line-through text-gray-500" : ""}
								>
									{todo.title}
								</span>
							</div>
							<button
								onClick={() => deleteTodo(todo.id)}
								className="text-red-500 hover:text-red-700"
								type="button"
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
