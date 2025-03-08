import TodoList from "./components/TodoList";

/**
 * Home Page Component
 * 
 * The main landing page of the CRUD API Demo application. This component provides
 * a clean, centered layout that showcases the todo list functionality.
 * 
 * Features:
 * - Responsive header with application title and description
 * - Centered TodoList component for managing todos
 * - Minimalist footer with technology attribution
 * 
 * Layout Structure:
 * - Uses full viewport height with padding
 * - Flexbox-based centered column layout
 * - Responsive max-width container for content
 * 
 * @component
 * @returns {JSX.Element} A responsive page layout containing the TodoList application
 */
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
