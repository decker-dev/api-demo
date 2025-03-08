# Next.js CRUD API Demo

A simple Todo application demonstrating how to build a CRUD API with Next.js API Routes.

## Features

- Complete CRUD functionality:
  - Create new todo items
  - Read all todos or a specific todo
  - Update todo status (mark as completed/uncompleted)
  - Delete todos
- Modern React patterns with hooks
- Server-side API routes with Next.js
- In-memory data storage (can be easily replaced with a database)
- Responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/api-demo.git
   cd api-demo
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Routes

### GET /api/todos
- Get all todos

### POST /api/todos
- Create a new todo
- Request body: `{ "title": "Your todo title" }`

### GET /api/todos/[id]
- Get a specific todo by ID

### PUT /api/todos/[id]
- Update a specific todo
- Request body: `{ "title": "Updated title", "completed": true }`

### DELETE /api/todos/[id]
- Delete a specific todo

## Project Structure

```
/src
  /app
    /api
      /todos
        /[id]
          route.ts     # Individual todo endpoints (GET, PUT, DELETE)
        route.ts       # Collection endpoints (GET, POST)
    /components
      TodoList.tsx     # Main component for todo management
    page.tsx           # Main application page
    layout.tsx         # Root layout
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Notes

This demo uses an in-memory array to store todos. In a real application, you would replace this with a database like MongoDB, PostgreSQL, etc.
