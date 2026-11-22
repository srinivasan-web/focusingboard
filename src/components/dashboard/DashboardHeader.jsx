import { Plus } from "lucide-react";
import useTasks from "../../hooks/useTasks.js";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";

export default function DashboardHeader() {
  const { openCreateModal } = useTasks();

  return (
    <section
      aria-labelledby="dashboard-heading"
      className="mb-7 flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        <p className="mb-2 text-overline font-semibold uppercase tracking-[0.14em] text-focus-primary">
          Overview
        </p>
        <h1
          id="dashboard-heading"
          className="text-dashboard-title font-extrabold text-focus-text tracking-tight"
        >
          Your work, in focus.
        </h1>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-focus-muted">
          Plan your day, stay organized, and celebrate small wins.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={openCreateModal}
          className="bg-focus-primary text-white shadow-button-primary hover:bg-focus-primary-hover active:bg-focus-primary-active px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Icon icon={Plus} size={16} strokeWidth={2.4} />
          <span>New task</span>
        </Button>
      </div>
    </section>
  );
}
