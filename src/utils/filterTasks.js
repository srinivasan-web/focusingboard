function normalizeText(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

/**
 * Return tasks matching the text query and the selected status and priority.
 * The original task array is not changed.
 */
export function filterTasks(tasks, { searchTerm = "", status = "all", priority = "all" } = {}) {
  const query = normalizeText(searchTerm);

  return tasks.filter((task) => {
    const matchesStatus = status === "all" || task.status === status;
    const matchesPriority = priority === "all" || task.priority === priority;

    const searchableText = [task.title, task.description, task.category]
      .map(normalizeText)
      .join(" ");
    const matchesSearch = query === "" || searchableText.includes(query);

    return matchesStatus && matchesPriority && matchesSearch;
  });
}
