import FocusNotesCarousel from "../components/dashboard/FocusNotesCarousel.jsx";
import DashboardHeader from "../components/dashboard/DashboardHeader.jsx";
import StatisticsGrid from "../components/statistics/StatisticsGrid.jsx";
import AdvancedTaskSection from "../components/tasks/AdvancedTaskSection.jsx";
import useTasks from "../hooks/useTasks.js";

export default function DashboardPage() {
  const { tasks, updateTaskStatus, storageError } = useTasks();

  return (
    <div id="overview" className="mx-auto w-full max-w-6xl scroll-mt-6">
      <DashboardHeader />
      {storageError && (
        <p
          role="status"
          className="mb-4 rounded-control border border-focus-warning bg-focus-warning-soft px-3.5 py-2.5 text-xs font-medium text-focus-warning animate-slide-up"
        >
          {storageError}
        </p>
      )}
      <div className="space-y-6 sm:space-y-7">
        <FocusNotesCarousel />
        <StatisticsGrid tasks={tasks} />
        <AdvancedTaskSection onStatusChange={updateTaskStatus} tasks={tasks} />
      </div>
    </div>
  );
}
