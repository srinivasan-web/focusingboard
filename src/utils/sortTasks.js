const PRIORITY_ORDER = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const SORT_OPTIONS = {
  "created-newest": (left, right) => compareDates(left.createdAt, right.createdAt, true),
  "created-oldest": (left, right) => compareDates(left.createdAt, right.createdAt),
  "due-earliest": (left, right) => compareDates(left.dueDate, right.dueDate),
  "due-latest": (left, right) => compareDates(left.dueDate, right.dueDate, true),
  "priority-high": (left, right) => PRIORITY_ORDER[right.priority] - PRIORITY_ORDER[left.priority],
  "priority-low": (left, right) => PRIORITY_ORDER[left.priority] - PRIORITY_ORDER[right.priority],
  "title-az": (left, right) => compareText(left.title, right.title),
  "title-za": (left, right) => compareText(right.title, left.title),
};

function compareDates(leftValue, rightValue, descending = false) {
  const leftMissing = !leftValue;
  const rightMissing = !rightValue;

  if (leftMissing && rightMissing) return 0;
  if (leftMissing) return 1;
  if (rightMissing) return -1;

  const result = String(leftValue).localeCompare(String(rightValue));
  return descending ? -result : result;
}

function compareText(leftValue, rightValue) {
  return String(leftValue ?? "").localeCompare(String(rightValue ?? ""), undefined, {
    sensitivity: "base",
  });
}

/** Return a sorted copy, keeping items with equal sort values in their original order. */
export function sortTasks(tasks, sortBy = "created-newest") {
  const compare = SORT_OPTIONS[sortBy] ?? SORT_OPTIONS["created-newest"];

  return tasks
    .map((task, originalIndex) => ({ task, originalIndex }))
    .sort((left, right) => {
      const result = compare(left.task, right.task);
      return result || left.originalIndex - right.originalIndex;
    })
    .map(({ task }) => task);
}

export const TASK_SORT_OPTIONS = [
  { value: "created-newest", label: "Recently created" },
  { value: "created-oldest", label: "Oldest created" },
  { value: "due-earliest", label: "Due date: earliest" },
  { value: "due-latest", label: "Due date: latest" },
  { value: "priority-high", label: "Priority: high to low" },
  { value: "priority-low", label: "Priority: low to high" },
  { value: "title-az", label: "Title: A–Z" },
  { value: "title-za", label: "Title: Z–A" },
];
