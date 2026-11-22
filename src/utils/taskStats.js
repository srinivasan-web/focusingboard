export function getTaskStats(tasks) {
  const counts = tasks.reduce(
    (result, task) => {
      if (task.status === "In progress") result.inProgress += 1;
      if (task.status === "Completed") result.completed += 1;
      return result;
    },
    { inProgress: 0, completed: 0 },
  );

  const total = tasks.length;

  return {
    total,
    inProgress: counts.inProgress,
    completed: counts.completed,
    completionRate: total === 0 ? 0 : Math.round((counts.completed / total) * 100),
  };
}
export function getCompletionPercentage(tasks) {
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;

  if (tasks.length === 0) return 0;

  return Math.round((completedTasks / tasks.length) * 100);
}

