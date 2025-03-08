import TodoList from "./components/TodoList";

export default function Home() {
	return (
		<div className="min-h-screen p-8 flex flex-col items-center">
			<header className="mb-8 text-center">
				<h1 className="text-3xl font-bold mb-2">CRUD API Demo</h1>
				<p className="text-gray-600">
					A simple Todo app with Next.js API Routes
				</p>
			</header>

			<main className="flex-grow w-full max-w-4xl mx-auto flex justify-center">
				<TodoList />
			</main>

			<footer className="mt-12 text-center text-gray-500 text-sm">
				<p>Built with Next.js API Routes</p>
			</footer>
		</div>
	);
}
