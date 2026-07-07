import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import { CreateTaskPayload } from "../types/task";
import toast from "react-hot-toast";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => taskApi.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Failed to create task";
      toast.error(message);
    },
  });
};
