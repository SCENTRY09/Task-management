import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import { Task } from "../types/task";

interface UseTasksParams {
  search?: string;
  status?: "Pending" | "Completed";
  due_date?: string;
}

export const useTasks = (params?: UseTasksParams) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: async () => {
      if (params?.search || params?.status || params?.due_date) {
        const { data } = await taskApi.getTasksWithFilters(params);
        return data;
      }
      const { data } = await taskApi.getAllTasks();
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
};

export const useTaskById = (id: number) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await taskApi.getTaskById(id);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Compute task statistics
export const useTaskStats = (tasks: Task[] | undefined) => {
  if (!tasks) {
    return {
      total: 0,
      pending: 0,
      completed: 0,
      completionPercentage: 0,
      todayDue: 0,
    };
  }

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = total - completed;
  const completionPercentage = total > 0 ? (completed / total) * 100 : 0;

  const today = new Date().toISOString().split("T")[0];
  const todayDue = tasks.filter((t) => t.due_date === today).length;

  return {
    total,
    pending,
    completed,
    completionPercentage: Math.round(completionPercentage),
    todayDue,
  };
};
