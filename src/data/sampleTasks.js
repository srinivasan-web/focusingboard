function dateFromToday(dayOffset) {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createdAtDaysAgo(dayOffset) {
  const date = new Date();
  date.setDate(date.getDate() - dayOffset);
  return date.toISOString();
}

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {"To do"|"In progress"|"Completed"} status
 * @property {"High"|"Medium"|"Low"} priority
 * @property {string} dueDate ISO date in YYYY-MM-DD format, or an empty string
 */

/** @type {Task[]} */
export const sampleTasks = [
  {
    id: "task-1",
    createdAt: createdAtDaysAgo(6),
    title: "Design landing page",
    description: "Website redesign · Due soon",
    category: "Design",
    status: "To do",
    priority: "High",
    dueDate: dateFromToday(0),
  },
  {
    id: "task-2",
    createdAt: createdAtDaysAgo(5),
    title: "Fix mobile navigation",
    description: "Frontend sprint · UI polish",
    category: "Development",
    status: "In progress",
    priority: "Medium",
    dueDate: dateFromToday(2),
  },
  {
    id: "task-3",
    createdAt: createdAtDaysAgo(4),
    title: "Review onboarding copy",
    description: "Content updates · Approved",
    category: "Content",
    status: "Completed",
    priority: "Low",
    dueDate: dateFromToday(-4),
  },
  {
    id: "task-4",
    createdAt: createdAtDaysAgo(3),
    title: "Update component library",
    description: "Design system · Button and form states",
    category: "Design",
    status: "In progress",
    priority: "Medium",
    dueDate: dateFromToday(3),
  },
  {
    id: "task-5",
    createdAt: createdAtDaysAgo(2),
    title: "Prepare sprint planning notes",
    description: "Team planning · Draft agenda",
    category: "Planning",
    status: "To do",
    priority: "High",
    dueDate: dateFromToday(5),
  },
  {
    id: "task-6",
    createdAt: createdAtDaysAgo(1),
    title: "QA settings flow",
    description: "Quality review · Check responsive states",
    category: "QA",
    status: "Completed",
    priority: "Low",
    dueDate: dateFromToday(7),
  },
];
