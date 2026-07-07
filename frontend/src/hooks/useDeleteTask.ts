import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import toast from "react-hot-toast";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskApi.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Failed to delete task";
      toast.error(message);
    },
  });
};
