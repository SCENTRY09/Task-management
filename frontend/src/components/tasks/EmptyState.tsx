import { motion } from "framer-motion";
import { CheckCircle2, ClipboardList } from "lucide-react";
import { Button } from "../ui/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "tasks" | "completed";
  onAction?: () => void;
  actionLabel?: string;
}

export function EmptyState({
  title,
  description,
  icon = "tasks",
  onAction,
  actionLabel,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-4"
      >
        {icon === "tasks" ? (
          <ClipboardList className="w-16 h-16 text-muted-foreground opacity-40" />
        ) : (
          <CheckCircle2 className="w-16 h-16 text-muted-foreground opacity-40" />
        )}
      </motion.div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">
        {description}
      </p>

      {onAction && actionLabel && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
