import { useMemo, useState } from "react";
import TaskFilters from "./TaskFilters.jsx";
import TaskList from "./TaskList.jsx";
import { filterTasks } from "../../utils/filterTasks.js";
import { sortTasks, TASK_SORT_OPTIONS } from "../../utils/sortTasks.js";

export default function AdvancedTaskSection({ tasks, onStatusChange }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("created-newest");

  const visibleTasks = useMemo(
    () => filterTasks(tasks, {
      searchTerm: searchValue,
      status: statusFilter,
      priority: priorityFilter,
    }),
    [tasks, searchValue, statusFilter, priorityFilter],
  );
  const sortedTasks = useMemo(
    () => sortTasks(visibleTasks, sortOrder),
    [visibleTasks, sortOrder],
  );

  return (
    <section className="mt-7" id="tasks">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">My tasks</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage and track everything in one place.</p>
        </div>
        <p aria-live="polite" className="text-xs text-muted-foreground">
          {visibleTasks.length} {visibleTasks.length === 1 ? "result" : "results"}
        </p>
      </div>

      <TaskFilters
        onPriorityFilterChange={setPriorityFilter}
        onSearchChange={setSearchValue}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        searchValue={searchValue}
        statusFilter={statusFilter}
      />

      <label className="mb-3 flex items-center justify-end gap-2 text-xs font-medium text-muted-foreground">
        <span>Sort by</span>
        <select
          className="max-w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onChange={(event) => setSortOrder(event.target.value)}
          value={sortOrder}
        >
          {TASK_SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>

      {searchValue.length > 0 && (
        <button
          className="mb-3 rounded-md px-2 py-1 text-xs font-medium text-primary underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          onClick={() => setSearchValue("")}
          type="button"
        >
          Clear search
        </button>
      )}

      {visibleTasks.length > 0 ? (
        <TaskList onStatusChange={onStatusChange} tasks={sortedTasks} />
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-surface px-5 py-8 text-center" role="status">
          <p className="text-sm font-medium text-foreground">
            {tasks.length === 0 ? "No tasks yet" : "No tasks match these filters"}
          </p>
          {tasks.length > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">Try another search or filter combination.</p>
          )}
        </div>
      )}
    </section>
  );
}
