import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TASK_STATUSES, TASK_PRIORITIES } from "../../data/taskOptions.js";
import InteractiveTaskList from "./InteractiveTaskList.jsx";

export default function InteractiveTaskSection({ tasks, onStatusChange, onPriorityChange, onEdit, onDelete }) {
  const [statusFilter, setStatusFilter] = useState("All tasks");
  const [priorityFilter, setPriorityFilter] = useState("All priorities");
  const [searchTerm, setSearchTerm] = useState("");

  const visibleTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesStatus = statusFilter === "All tasks" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "All priorities" || task.priority === priorityFilter;
      const matchesTitle = task.title.toLowerCase().includes(normalizedSearch);

      // AND keeps all active filters in effect at the same time.
      return matchesStatus && matchesPriority && matchesTitle;
    });
  }, [tasks, statusFilter, priorityFilter, searchTerm]);

  const statusTabs = [{ value: "All tasks", label: "All tasks" }, ...TASK_STATUSES];

  return (
    <section className="mt-7" id="tasks">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">My tasks</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage and track everything in one place.</p>
        </div>
        <p className="text-xs text-muted-foreground">{visibleTasks.length} {visibleTasks.length === 1 ? "task" : "tasks"}</p>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 rounded-xl border border-border bg-surface p-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="relative block">
          <span className="sr-only">Search task titles</span>
          <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
          <input className="w-full rounded-lg bg-muted/60 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20" onChange={(event) => setSearchTerm(event.target.value)} placeholder="Find a task..." type="search" value={searchTerm} />
        </label>
        <label>
          <span className="sr-only">Filter by priority</span>
          <select className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary sm:w-auto" onChange={(event) => setPriorityFilter(event.target.value)} value={priorityFilter}>
            <option>All priorities</option>
            {TASK_PRIORITIES.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
          </select>
        </label>
      </div>

      <div aria-label="Filter tasks by status" className="mb-3 flex gap-1 overflow-x-auto rounded-xl border border-border bg-surface p-1" role="group">
        {statusTabs.map((status) => {
          const isActive = statusFilter === status.value;

          return (
            <button
              aria-pressed={isActive}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              key={status.value}
              onClick={() => setStatusFilter(status.value)}
              type="button"
            >
              {status.label}
            </button>
          );
        })}
      </div>

      {visibleTasks.length > 0 ? (
        <InteractiveTaskList onDelete={onDelete} onEdit={onEdit} onPriorityChange={onPriorityChange} onStatusChange={onStatusChange} tasks={visibleTasks} />
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-surface px-5 py-10 text-center" role="status">
          <h3 className="text-sm font-semibold text-foreground">No tasks found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {tasks.length === 0 ? "Create your first task to get started." : "Try changing your search or filters."}
          </p>
        </div>
      )}
    </section>
  );
}
