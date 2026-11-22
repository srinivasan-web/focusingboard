import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import useTasks from "../../hooks/useTasks.js";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import TaskFilters from "./TaskFilters.jsx";
import TaskList from "./TaskList.jsx";

export default function TaskSection({ tasks, onStatusChange }) {
  const { openCreateModal } = useTasks();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const visibleTasks = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLocaleLowerCase();

    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      const matchesTitle = task.title
        .toLocaleLowerCase()
        .includes(normalizedSearch);

      return matchesStatus && matchesPriority && matchesTitle;
    });
  }, [tasks, statusFilter, priorityFilter, searchValue]);

  function resetFilters() {
    setStatusFilter("all");
    setPriorityFilter("all");
    setSearchValue("");
  }

  const isFiltered =
    statusFilter !== "all" || priorityFilter !== "all" || searchValue.trim() !== "";

  return (
    <section id="tasks" aria-labelledby="tasks-title" className="scroll-mt-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 id="tasks-title" className="text-section-title font-bold text-focus-text">
            My tasks
          </h2>
          <p className="mt-0.5 text-xs text-focus-muted">
            Manage and track everything in one place.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile '+ New Task' button (as seen in mobile reference) */}
          <button
            type="button"
            onClick={openCreateModal}
            aria-label="Add new task"
            className="grid size-9 place-items-center rounded-xl bg-focus-primary text-white shadow-button-primary transition-all hover:bg-focus-primary-hover active:scale-95 sm:hidden focus-ring"
          >
            <Icon icon={Plus} size={18} strokeWidth={2.4} />
          </button>

          {/* Desktop 'View all tasks' action */}
          <Button
            variant="secondary"
            onClick={resetFilters}
            className="hidden sm:inline-flex text-xs font-semibold"
          >
            View all tasks
          </Button>
        </div>
      </div>

      <TaskFilters
        tasks={tasks}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {visibleTasks.length} of {tasks.length} tasks.
      </p>

      {visibleTasks.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-surface px-5 py-8 text-center" role="status">
          <p className="text-sm font-medium text-foreground">{tasks.length === 0 ? "No tasks yet" : "No tasks match these filters"}</p>
          {tasks.length > 0 && <p className="mt-1 text-sm text-muted-foreground">Try changing your search or filters.</p>}
        </div>
      )}
      <TaskList
        tasks={visibleTasks}
        onStatusChange={onStatusChange}
        onResetFilters={isFiltered ? resetFilters : undefined}
      />
    </section>
  );
}
