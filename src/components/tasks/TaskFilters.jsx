import { Search, X } from "lucide-react";
import { TASK_PRIORITIES, TASK_STATUSES } from "../../data/taskOptions.js";
import Icon from "../ui/Icon.jsx";
import Select from "../ui/Select.jsx";

export default function TaskFilters({
  tasks = [],
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  searchValue,
  onSearchChange,
}) {
  function getCount(status) {
    if (status === "all") return tasks.length;
    return tasks.filter((task) => task.status === status).length;
  }

  const statusTabs = [{ value: "all", label: "All tasks" }, ...TASK_STATUSES];

  return (
    <div className="mb-4 rounded-card border border-focus-border bg-focus-surface p-3.5 shadow-card sm:p-4 transition-all">
      <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
        {/* Status Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter tasks by status"
          className="flex flex-wrap items-center gap-1.5"
        >
          {statusTabs.map((tab) => {
            const isSelected = statusFilter === tab.value;
            const count = getCount(tab.value);

            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onStatusFilterChange(tab.value)}
                className={`inline-flex min-h-9 items-center gap-2 rounded-control px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 focus-ring ${
                  isSelected
                    ? "bg-focus-primary-soft text-focus-primary shadow-xs"
                    : "text-focus-muted hover:bg-focus-canvas hover:text-focus-text"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isSelected
                      ? "bg-focus-primary text-white"
                      : "bg-focus-canvas text-focus-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Field and Priority Select */}
        <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_11rem] lg:w-[28rem] lg:shrink-0">
          {/* Search Input with Clear Button */}
          <div className="relative min-w-0">
            <Icon
              icon={Search}
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-focus-muted"
            />
            <input
              type="text"
              aria-label="Search tasks"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Find a task..."
              className="min-h-10 w-full rounded-control border border-focus-border bg-focus-surface pl-10 pr-9 text-xs font-medium text-focus-text outline-none transition-colors placeholder:text-focus-muted hover:border-focus-border-hover focus-ring-input"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-focus-muted hover:text-focus-text focus-ring rounded"
              >
                <Icon icon={X} size={14} />
              </button>
            )}
          </div>

          {/* Priority Filter */}
          <Select
            label="Priority"
            labelClassName="sr-only"
            value={priorityFilter}
            onChange={(event) => onPriorityFilterChange(event.target.value)}
            className="!min-h-10 text-xs"
          >
            <option value="all">All priorities</option>
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                Priority: {priority}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
