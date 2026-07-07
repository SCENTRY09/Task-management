import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Button } from "../ui/Button";
import { Task } from "../../types/task";
import { AlertTriangle } from "lucide-react";

interface DeleteDialogProps {
  task: Task | null;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({
  task,
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <DialogTitle>Delete Task</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete "{task?.title}"? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
