import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/Dialog";
import { Task } from "../../types/task";
import { format } from "date-fns";

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  due_date: z.string().refine((date) => {
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, "Due date cannot be in the past"),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: TaskFormData) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export function TaskForm({
  task,
  onSubmit,
  isLoading,
  onCancel,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description || "",
          due_date: task.due_date,
        }
      : undefined,
  });

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    if (!task) {
      reset();
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
        <DialogDescription>
          {task
            ? "Update your task details below"
            : "Add a new task to your list"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Title *</label>
          <Input
            placeholder="Enter task title"
            {...register("title")}
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Enter task description (optional)"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            {...register("description")}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Due Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Due Date *</label>
          <Input
            type="date"
            min={format(new Date(), "yyyy-MM-dd")}
            {...register("due_date")}
            disabled={isLoading}
          />
          {errors.due_date && (
            <p className="text-sm text-destructive">{errors.due_date.message}</p>
          )}
        </div>

        {/* Actions */}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : task ? "Update Task" : "Create Task"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
