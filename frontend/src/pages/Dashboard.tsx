import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useTasks, useTaskStats } from "../hooks/useTasks";
import { useCreateTask } from "../hooks/useCreateTask";
import { useUpdateTask, useCompleteTask } from "../hooks/useUpdateTask";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { Task } from "../types/task";
import { Button } from "../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../components/ui/Dialog";
import { TaskForm, TaskFormData } from "../components/tasks/TaskForm";
import { TaskCard } from "../components/tasks/TaskCard";
import { TaskFilters } from "../components/tasks/TaskFilters";
import { DeleteDialog } from "../components/tasks/DeleteDialog";
import { EmptyState } from "../components/tasks/EmptyState";
import { StatCard } from "../components/dashboard/StatCard";
import { PlusIcon } from "lucide-react";
import { Skeleton } from "../components/ui/Skeleton";

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"Pending" | "Completed" | "">("");
  const [dueDate, setDueDate] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Queries
  const { data: tasks, isLoading, error } = useTasks({
    search,
    status: status as any,
    due_date: dueDate,
  });

  const stats = useTaskStats(tasks);

  // Mutations
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const completeMutation = useCompleteTask();
  const deleteMutation = useDeleteTask();

  // Handlers
  const handleCreateTask = useCallback(
    async (data: TaskFormData) => {
      await createMutation.mutateAsync({
        title: data.title,
        description: data.description,
        due_date: data.due_date,
      });
      setCreateDialogOpen(false);
    },
    [createMutation]
  );

  const handleUpdateTask = useCallback(
    async (data: TaskFormData) => {
      if (!editingTask) return;
      await updateMutation.mutateAsync({
        id: editingTask.id,
        payload: {
          title: data.title,
          description: data.description,
          due_date: data.due_date,
        },
      });
      setEditDialogOpen(false);
      setEditingTask(null);
    },
    [editingTask, updateMutation]
  );

  const handleCompleteTask = useCallback(
    (task: Task) => {
      if (task.status !== "Completed") {
        completeMutation.mutate(task.id);
      }
    },
    [completeMutation]
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (deleteTask) {
      await deleteMutation.mutateAsync(deleteTask.id);
      setDeleteDialogOpen(false);
      setDeleteTask(null);
    }
  }, [deleteTask, deleteMutation]);

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    return tasks;
  }, [tasks]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Task Management
              </h1>
              <p className="text-muted-foreground">
                Organize and track your daily tasks
              </p>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <PlusIcon className="w-5 h-5" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <TaskForm
                  onSubmit={handleCreateTask}
                  isLoading={createMutation.isPending}
                  onCancel={() => setCreateDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              label="Total Tasks"
              value={stats.total}
              icon="total"
              color="blue"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Pending"
              value={stats.pending}
              icon="pending"
              color="amber"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Completed"
              value={stats.completed}
              icon="completed"
              color="green"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Completion %"
              value={stats.completionPercentage}
              suffix="%"
              icon="percent"
              color="purple"
            />
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <TaskFilters
            search={search}
            status={status}
            dueDate={dueDate}
            onSearchChange={setSearch}
            onStatusChange={(s) => setStatus(s as any)}
            onDueDateChange={setDueDate}
          />
        </motion.div>

        {/* Tasks List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg border border-destructive bg-destructive/5 p-4">
              <p className="text-sm text-destructive">
                Error loading tasks. Please try again later.
              </p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <EmptyState
              title={search || status || dueDate ? "No tasks found" : "No tasks yet"}
              description={
                search || status || dueDate
                  ? "Try adjusting your filters"
                  : "Create your first task to get started"
              }
              onAction={
                !search && !status && !dueDate
                  ? () => setCreateDialogOpen(true)
                  : undefined
              }
              actionLabel="Create Task"
            />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {filteredTasks.map((task) => (
                <motion.div key={task.id} variants={itemVariants}>
                  <TaskCard
                    task={task}
                    onView={() => {}}
                    onEdit={(t) => {
                      setEditingTask(t);
                      setEditDialogOpen(true);
                    }}
                    onComplete={handleCompleteTask}
                    onDelete={(t) => {
                      setDeleteTask(t);
                      setDeleteDialogOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            {editingTask && (
              <TaskForm
                task={editingTask}
                onSubmit={handleUpdateTask}
                isLoading={updateMutation.isPending}
                onCancel={() => {
                  setEditDialogOpen(false);
                  setEditingTask(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <DeleteDialog
          task={deleteTask}
          isOpen={deleteDialogOpen}
          isLoading={deleteMutation.isPending}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setDeleteDialogOpen(false);
            setDeleteTask(null);
          }}
        />
      </div>
    </div>
  );
}
