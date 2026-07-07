import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  ListTodo,
  TrendingUp,
} from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: "total" | "pending" | "completed" | "percent";
  color: "blue" | "amber" | "green" | "purple";
}

export function StatCard({
  label,
  value,
  suffix,
  icon,
  color,
}: StatCardProps) {
  const iconMap = {
    total: ListTodo,
    pending: AlertCircle,
    completed: CheckCircle2,
    percent: TrendingUp,
  };

  const colorMap = {
    blue: "from-blue-500/10 to-blue-500/5",
    amber: "from-amber-500/10 to-amber-500/5",
    green: "from-green-500/10 to-green-500/5",
    purple: "from-purple-500/10 to-purple-500/5",
  };

  const iconColorMap = {
    blue: "text-blue-600 dark:text-blue-400",
    amber: "text-amber-600 dark:text-amber-400",
    green: "text-green-600 dark:text-green-400",
    purple: "text-purple-600 dark:text-purple-400",
  };

  const IconComponent = iconMap[icon];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`rounded-lg bg-gradient-to-br ${colorMap[color]} border border-border p-6 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {label}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-foreground"
          >
            {value}
            {suffix && <span className="text-lg ml-1">{suffix}</span>}
          </motion.p>
        </div>
        <div className={`p-3 rounded-lg bg-white/50 dark:bg-black/20 ${iconColorMap[color]}`}>
          <IconComponent className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
