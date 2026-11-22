import { ClipboardList } from "lucide-react";
import Card from "../ui/Card.jsx";
import Icon from "../ui/Icon.jsx";
import TaskRow from "./TaskRow.jsx";

export default function TaskList({ tasks, onStatusChange, onResetFilters }) {
  if (tasks.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center">
        <span className="grid size-12 place-items-center rounded-2xl bg-focus-primary-soft text-focus-primary mb-3">
          <Icon icon={ClipboardList} size={24} />
        </span>
        <h3 className="text-base font-bold text-focus-text">No tasks found</h3>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-focus-muted">
          We couldn&apos;t find any tasks matching your active search or filters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 rounded-xl bg-focus-primary-soft px-4 py-2 text-xs font-semibold text-focus-primary transition-colors hover:bg-focus-primary hover:text-white focus-ring"
          >
            Clear all filters
          </button>
        )}
      </Card>
    );
  }

  return (
    <ul id="task-list" className="space-y-2.5" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
}
