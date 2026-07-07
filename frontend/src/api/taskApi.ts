import apiClient from "./axios";
import { Task, CreateTaskPayload, UpdateTaskPayload } from "../types/task";

export const taskApi = {
  // Get all tasks
  getAllTasks: () => apiClient.get<Task[]>("/tasks"),

  // Get all tasks with filters
  getTasksWithFilters: (params: {
    search?: string;
    status?: "Pending" | "Completed";
    due_date?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append("search", params.search);
    if (params.status) queryParams.append("status_filter", params.status);
    if (params.due_date) queryParams.append("due_date", params.due_date);

    return apiClient.get<Task[]>(`/tasks?${queryParams.toString()}`);
  },

  // Get single task
  getTaskById: (id: number) => apiClient.get<Task>(`/tasks/${id}`),

  // Create task
  createTask: (payload: CreateTaskPayload) =>
    apiClient.post<Task>("/tasks", payload),

  // Update task
  updateTask: (id: number, payload: UpdateTaskPayload) =>
    apiClient.put<Task>(`/tasks/${id}`, payload),

  // Delete task
  deleteTask: (id: number) => apiClient.delete(`/tasks/${id}`),

  // Mark task as complete
  completeTask: (id: number) => apiClient.patch<Task>(`/tasks/${id}/complete`),
};
