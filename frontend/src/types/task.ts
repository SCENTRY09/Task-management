export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: "Pending" | "Completed";
  due_date: string; // YYYY-MM-DD
  created_at: string; // ISO DateTime
  updated_at: string; // ISO DateTime
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  due_date: string; // YYYY-MM-DD
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: "Pending" | "Completed";
  due_date?: string;
}

export interface TaskStats {
  total: number;
  pending: number;
  completed: number;
  completionPercentage: number;
  todayDue: number;
}

export interface ApiErrorResponse {
  detail: string;
}
