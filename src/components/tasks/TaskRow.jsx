import { useState, useRef, useEffect } from "react";
import {
  CalendarDays,
  Check,
  Circle,
  Clock,
  Edit2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { TASK_STATUSES } from "../../data/taskOptions.js";
import useTasks from "../../hooks/useTasks.js";
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";
import Icon from "../ui/Icon.jsx";

const priorityVariants = {
  High: "priorityHigh",
  Medium: "priorityMedium",
  Low: "priorityLow",
};

function formatDueDate(value) {
  if (!value) return "No due date";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "No due date";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function TaskRow({ task, onStatusChange }) {
  const { toggleTaskCompleted, openEditModal, openDeleteConfirm } = useTasks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isCompleted = task.status === "Completed";
  const isInProgress = task.status === "In progress";

  // Outside click and escape handler for action menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <Card
      as="li"
      className="group relative flex flex-col gap-3 rounded-card p-4 transition-all duration-200 hover:border-focus-border-hover hover:shadow-card-hover sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
    >
      {/* Left Area: Completion Toggle & Title / Description */}
      <div className="flex min-w-0 items-start gap-3.5 flex-1">
        {/* Interactive Completion Indicator */}
        <button
          type="button"
          onClick={() => toggleTaskCompleted(task.id)}
          aria-label={
            isCompleted
              ? `Mark "${task.title}" as incomplete`
              : `Mark "${task.title}" as complete`
          }
          className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-200 focus-ring ${
            isCompleted
              ? "bg-focus-success border-focus-success text-white shadow-sm"
              : isInProgress
                ? "border-focus-info bg-focus-info-soft text-focus-info hover:bg-focus-info hover:text-white"
                : "border-focus-border bg-focus-surface hover:border-focus-primary hover:bg-focus-primary-soft text-focus-subtle hover:text-focus-primary"
          }`}
        >
          {isCompleted ? (
            <Icon
              icon={Check}
              size={14}
              strokeWidth={3}
              className="animate-check-pop"
            />
          ) : isInProgress ? (
            <Icon icon={Clock} size={13} strokeWidth={2.4} />
          ) : (
            <Icon icon={Circle} size={11} strokeWidth={2.2} />
          )}
        </button>

        {/* Task Title & Description */}
        <div className="min-w-0 flex-1">
          <h3
            className={`text-sm font-semibold tracking-tight transition-all duration-150 ${
              isCompleted
                ? "text-focus-muted line-through opacity-85"
                : "text-focus-text"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-0.5 truncate text-xs text-focus-muted">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Right Area: Category, Priority, Due Date, Status, Actions */}
      <div className="flex min-w-0 flex-wrap items-center gap-2 pl-10 sm:justify-end sm:pl-0">
        {/* Category Badge */}
        {task.category && (
          <Badge variant="category">{task.category}</Badge>
        )}

        {/* Priority Badge */}
        <Badge variant={priorityVariants[task.priority] ?? "neutral"}>
          {task.priority}
        </Badge>

        {/* Due Date */}
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap px-1 text-xs text-focus-muted font-medium">
          <Icon icon={CalendarDays} size={13} className="text-focus-subtle" />
          {formatDueDate(task.dueDate)}
        </span>

        {/* Quick Status Select */}
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
          aria-label={`Status for ${task.title}`}
          className="min-h-8 rounded-control border border-focus-border bg-focus-surface px-2.5 text-xs font-semibold text-focus-text outline-none transition-colors hover:border-focus-border-hover focus-ring-input"
        >
          {TASK_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        {/* Action Menu (More options) */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={`Options for ${task.title}`}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            className="grid size-8 place-items-center rounded-control text-focus-muted transition-colors hover:bg-focus-canvas hover:text-focus-text focus-ring"
          >
            <Icon icon={MoreHorizontal} size={16} />
          </button>

          {/* Action Menu Dropdown */}
          {isMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-1.5 w-44 rounded-card border border-focus-border bg-focus-surface p-1.5 shadow-dropdown animate-dropdown-in z-40"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  openEditModal(task);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-focus-text hover:bg-focus-canvas hover:text-focus-primary transition-colors text-left"
              >
                <Icon icon={Edit2} size={13} />
                <span>Edit task</span>
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  toggleTaskCompleted(task.id);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-focus-text hover:bg-focus-canvas hover:text-focus-primary transition-colors text-left"
              >
                <Icon icon={Check} size={13} />
                <span>{isCompleted ? "Mark incomplete" : "Mark complete"}</span>
              </button>

              <div className="my-1 border-t border-focus-border" />

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  openDeleteConfirm(task);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-focus-danger hover:bg-focus-danger-soft transition-colors text-left"
              >
                <Icon icon={Trash2} size={13} />
                <span>Delete task</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
