# TaskHub Frontend

A modern, production-ready task management frontend built with React 19, TypeScript, Vite, and TailwindCSS.

## Features

- 📋 **Complete Task Management**: Create, read, update, delete, and complete tasks
- 🔍 **Advanced Search & Filters**: Search by title, filter by status and due date
- 📊 **Dashboard Statistics**: Total tasks, pending, completed, and completion percentage
- 🎨 **Modern UI**: Beautiful SaaS-style design with smooth animations
- 🌙 **Dark Mode Ready**: Full dark mode support
- ♿ **Accessible**: Built with accessibility best practices
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ⚡ **Fast & Efficient**: Uses React Query for optimal caching and data fetching
- 🎯 **Type Safe**: Full TypeScript support for better DX

## Tech Stack

- **React 19** - Latest React version
- **Vite** - Next generation build tool
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **React Query (TanStack)** - Data fetching & caching
- **React Hook Form** - Efficient form handling
- **Zod** - Runtime schema validation
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Reusable components
- **Framer Motion** - Smooth animations
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client
- **Lucide Icons** - Beautiful icons
- **date-fns** - Date utilities

## Project Structure

```
src/
├── api/
│   ├── axios.ts          # Axios instance configuration
│   └── taskApi.ts        # Task API endpoints
├── components/
│   ├── ui/              # Reusable UI components (Button, Dialog, etc.)
│   ├── layout/          # Layout components (Navbar, Sidebar)
│   ├── tasks/           # Task-specific components
│   └── dashboard/       # Dashboard components
├── hooks/
│   ├── useTasks.ts      # Query hook for tasks
│   ├── useCreateTask.ts # Mutation hook for creating
│   ├── useUpdateTask.ts # Mutation hook for updating
│   └── useDeleteTask.ts # Mutation hook for deleting
├── pages/
│   └── Dashboard.tsx    # Main dashboard page
├── routes/
│   └── AppRoutes.tsx    # Route definitions
├── types/
│   └── task.ts          # TypeScript interfaces
├── utils/
│   └── cn.ts            # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend running at `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update VITE_API_URL in .env.local if your backend is on a different URL
# Default: http://localhost:8000
```

### Development

```bash
# Start development server
npm run dev

# The app will open at http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## API Integration

The frontend integrates with the following FastAPI endpoints:

### Tasks

- `GET /tasks` - Get all tasks
- `GET /tasks?search=keyword` - Search tasks
- `GET /tasks?status=Pending|Completed` - Filter by status
- `GET /tasks?due_date=YYYY-MM-DD` - Filter by due date
- `GET /tasks/{id}` - Get single task
- `POST /tasks` - Create task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task
- `PATCH /tasks/{id}/complete` - Mark as complete

## Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8000
```

## Key Features Explained

### Data Fetching with React Query

Uses React Query for efficient data fetching with automatic caching and refetching:

```typescript
// Queries
const { data: tasks, isLoading } = useTasks();

// Mutations
const createMutation = useCreateTask();
await createMutation.mutateAsync({ title: "..." });
```

### Form Validation

Uses React Hook Form + Zod for client-side validation:

```typescript
const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  due_date: z.string().refine((date) => {
    return new Date(date) >= new Date();
  }, "Due date cannot be in the past"),
});
```

### Component Architecture

- **UI Components**: Reusable, unstyled components in `components/ui`
- **Feature Components**: Task-specific logic in `components/tasks`
- **Page Components**: Full page layouts
- **Custom Hooks**: Business logic separated from components

### State Management

- **Server State**: React Query for API data
- **UI State**: React hooks (useState)
- **Form State**: React Hook Form
- **Global Notifications**: React Hot Toast

## Performance Optimizations

- React Query for intelligent caching
- Code splitting with React Router
- Lazy loading of components
- Optimized re-renders with proper dependency arrays
- Memoization where needed

## Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing

1. Follow the existing code style
2. Use TypeScript for new files
3. Create reusable components
4. Keep components focused and small
5. Test before pushing

## License

MIT

## Support

For issues or questions, please refer to the backend API documentation or check the FastAPI server logs.
