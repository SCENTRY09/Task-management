import { useState, useCallback } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Calendar } from "../ui/Calendar";
import { format } from "date-fns";
import { CalendarIcon, SearchIcon, XIcon } from "lucide-react";

interface TaskFiltersProps {
  onSearchChange: (search: string) => void;
  onStatusChange: (status: "Pending" | "Completed" | "") => void;
  onDueDateChange: (date: string) => void;
  search: string;
  status: string;
  dueDate: string;
}

export function TaskFilters({
  onSearchChange,
  onStatusChange,
  onDueDateChange,
  search,
  status,
  dueDate,
}: TaskFiltersProps) {
  const [date, setDate] = useState<Date | undefined>(
    dueDate ? new Date(dueDate) : undefined
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onDueDateChange(selectedDate ? format(selectedDate, "yyyy-MM-dd") : "");
  };

  const handleClearFilters = useCallback(() => {
    onSearchChange("");
    onStatusChange("");
    onDueDateChange("");
    setDate(undefined);
  }, [onSearchChange, onStatusChange, onDueDateChange]);

  const hasActiveFilters = search || status || dueDate;

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      {/* Search */}
      <div className="relative flex-1 sm:flex-initial sm:w-64">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filter */}
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Status</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      {/* Due Date Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {dueDate ? format(new Date(dueDate), "MMM dd") : "Due Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="w-full sm:w-auto"
        >
          <XIcon className="w-4 h-4 mr-2" />
          Clear
        </Button>
      )}
    </div>
  );
}
