import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import useTasks from "../../hooks/useTasks.js";
import Icon from "./Icon.jsx";

const toastTypeStyles = {
  success: {
    container: "border-focus-success/30 bg-focus-surface text-focus-text shadow-dropdown",
    iconBg: "bg-focus-success-soft text-focus-success",
    icon: CheckCircle2,
  },
  warning: {
    container: "border-focus-warning/30 bg-focus-surface text-focus-text shadow-dropdown",
    iconBg: "bg-focus-warning-soft text-focus-warning",
    icon: AlertTriangle,
  },
  error: {
    container: "border-focus-danger/30 bg-focus-surface text-focus-text shadow-dropdown",
    iconBg: "bg-focus-danger-soft text-focus-danger",
    icon: AlertCircle,
  },
  info: {
    container: "border-focus-primary/30 bg-focus-surface text-focus-text shadow-dropdown",
    iconBg: "bg-focus-primary-soft text-focus-primary",
    icon: Info,
  },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useTasks();

  if (!toasts || toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notification alerts"
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2.5 sm:bottom-6 sm:right-6"
    >
      {toasts.map((toast) => {
        const style = toastTypeStyles[toast.type] ?? toastTypeStyles.info;
        const ToastIcon = style.icon;

        return (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex items-start gap-3 rounded-card border p-3.5 shadow-dropdown transition-all animate-toast-in ${style.container}`}
          >
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-control ${style.iconBg}`}
            >
              <Icon icon={ToastIcon} size={15} />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-xs font-semibold leading-tight text-focus-text">
                {toast.title}
              </p>
              {toast.message && (
                <p className="mt-0.5 text-[11px] leading-relaxed text-focus-muted">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-focus-muted hover:text-focus-text rounded p-0.5 transition-colors focus-ring"
              aria-label="Dismiss notification"
            >
              <Icon icon={X} size={14} />
            </button>
          </div>
        );
      })}
    </aside>
  );
}
