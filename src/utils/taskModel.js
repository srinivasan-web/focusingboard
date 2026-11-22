import {
  DEFAULT_TASK_CATEGORY,
  DEFAULT_TASK_PRIORITY,
  DEFAULT_TASK_STATUS,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../data/taskOptions.js";

const allowedStatuses = TASK_STATUSES.map((status) => status.value);

function createUniqueId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function isValidIsoDate(value) {
  if (value === "") return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function createTask(values = {}) {
  const input = values && typeof values === "object" ? values : {};

  return {
    id:
      typeof input.id === "string" && input.id.trim()
        ? input.id.trim()
        : createUniqueId(),
    title:
      input.title === undefined
        ? ""
        : typeof input.title === "string"
          ? input.title.trim()
          : input.title,
    description:
      input.description === undefined
        ? ""
        : typeof input.description === "string"
          ? input.description.trim()
          : input.description,
    category:
      input.category === undefined
        ? DEFAULT_TASK_CATEGORY
        : typeof input.category === "string" && !input.category.trim()
          ? DEFAULT_TASK_CATEGORY
          : typeof input.category === "string"
            ? input.category.trim()
            : input.category,
    status: input.status === undefined ? DEFAULT_TASK_STATUS : input.status,
    priority:
      input.priority === undefined ? DEFAULT_TASK_PRIORITY : input.priority,
    dueDate: input.dueDate === undefined ? "" : input.dueDate,
    createdAt: typeof input.createdAt === "string" ? input.createdAt : new Date().toISOString(),
  };
}

export function validateTask(task) {
  const errors = {};

  if (!task || typeof task !== "object" || Array.isArray(task)) {
    return { isValid: false, errors: { form: "Enter valid task details." } };
  }

  if (typeof task.id !== "string" || !task.id.trim()) {
    errors.id = "A task ID is required.";
  }
  if (typeof task.title !== "string" || !task.title.trim()) {
    errors.title = "Enter a task title.";
  }
  if (typeof task.description !== "string") {
    errors.description = "Description must be text.";
  }
  if (typeof task.category !== "string" || !task.category.trim()) {
    errors.category = "Choose a category.";
  }
  if (!allowedStatuses.includes(task.status)) {
    errors.status = "Choose a supported task status.";
  }
  if (!TASK_PRIORITIES.includes(task.priority)) {
    errors.priority = "Choose a supported priority.";
  }
  if (typeof task.dueDate !== "string" || !isValidIsoDate(task.dueDate)) {
    errors.dueDate = "Use a valid date in YYYY-MM-DD format.";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function isValidTaskCollection(tasks) {
  if (!Array.isArray(tasks)) return false;

  const seenIds = new Set();
  for (const task of tasks) {
    if (!validateTask(task).isValid || seenIds.has(task.id)) return false;
    seenIds.add(task.id);
  }

  return true;
}
