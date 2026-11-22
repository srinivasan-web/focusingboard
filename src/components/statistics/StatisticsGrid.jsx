import { Check, Clock3, ListTodo } from "lucide-react";
import Card from "../ui/Card.jsx";
import Icon from "../ui/Icon.jsx";
import { getTaskStats } from "../../utils/taskStats.js";

const statStyles = {
  purple: {
    bg: "bg-focus-primary-soft text-focus-primary",
    badge: "text-focus-primary",
  },
  blue: {
    bg: "bg-focus-info-soft text-focus-info",
    badge: "text-focus-info",
  },
  green: {
    bg: "bg-focus-success-soft text-focus-success",
    badge: "text-focus-success",
  },
};

export default function StatisticsGrid({ tasks }) {
  const stats = getTaskStats(tasks);

  const cards = [
    {
      label: "Total tasks",
      value: stats.total,
      description: "Across all projects",
      icon: ListTodo,
      tone: "purple",
    },
    {
      label: "In progress",
      value: stats.inProgress,
      description: "Keep the momentum",
      icon: Clock3,
      tone: "blue",
    },
    {
      label: "Completed",
      value: stats.completed,
      description: `${stats.completionRate}% complete`,
      icon: Check,
      tone: "green",
    },
  ];

  return (
    <section aria-label="Task statistics">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
        {cards.map((card, idx) => {
          const style = statStyles[card.tone];
          // On extra small screens (below sm), the middle "In progress" card can either stack or span nicely
          const colSpanClass =
            idx === 2 ? "col-span-2 sm:col-span-1" : "col-span-1";

          return (
            <Card
              key={card.label}
              className={`group flex items-center gap-3.5 p-4 sm:gap-4 sm:p-5 transition-all duration-200 hover:shadow-card-hover hover:border-focus-border-hover ${colSpanClass}`}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${style.bg}`}
              >
                <Icon icon={card.icon} size={20} strokeWidth={2.2} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-focus-muted">
                  {card.label}
                </p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <strong className="text-2xl font-bold tracking-tight text-focus-text sm:text-3xl">
                    {card.value}
                  </strong>
                  <span className="hidden truncate text-xs text-focus-muted sm:inline">
                    {card.description}
                  </span>
                </div>
                <span className="mt-0.5 block truncate text-[11px] text-focus-muted sm:hidden">
                  {card.description}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
