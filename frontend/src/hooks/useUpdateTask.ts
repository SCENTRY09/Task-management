import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import { UpdateTaskPayload } from "../types/task";
import toast from "react-hot-toast";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateTaskPayload }) =>
      taskApi.updateTask(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", id] });
      toast.success("Task updated successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Failed to update task";
      toast.error(message);
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskApi.completeTask(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", id] });
      toast.success("Task completed!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Failed to complete task";
      toast.error(message);
    },
  });
};
