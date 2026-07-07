import { Task } from "../../types/task";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { format } from "date-fns";
import { CalendarIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onComplete: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({
  task,
  onView,
  onEdit,
  onComplete,
  onDelete,
}: TaskCardProps) {
  const isCompleted = task.status === "Completed";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-sm truncate ${
              isCompleted
                ? "line-through text-muted-foreground"
                : "text-foreground"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <Badge variant={isCompleted ? "secondary" : "default"}>
              {task.status}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <CalendarIcon className="w-3 h-3" />
              {format(new Date(task.due_date), "MMM dd, yyyy")}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onView(task)}
            className="hidden sm:inline-flex"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={isCompleted ? "secondary" : "outline"}
            onClick={() => onComplete(task)}
            disabled={isCompleted}
          >
            {isCompleted ? "✓ Done" : "Complete"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(task)}
            className="hidden sm:inline-flex"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(task)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2Icon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
