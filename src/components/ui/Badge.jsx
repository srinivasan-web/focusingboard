const variants = {
  neutral: "bg-slate-100 text-slate-600",
  category: "bg-focus-primary-soft text-focus-primary border border-focus-primary-border/40",
  todo: "bg-slate-100 text-slate-700",
  inProgress: "bg-focus-info-soft text-focus-info border border-sky-200/50",
  completed: "bg-focus-success-soft text-focus-success border border-emerald-200/50",
  priorityHigh: "bg-focus-warning-soft text-focus-warning border border-amber-200/50",
  priorityMedium: "bg-focus-info-soft text-focus-info border border-sky-200/50",
  priorityLow: "bg-focus-success-soft text-focus-success border border-emerald-200/50",
};

export default function Badge({
  children,
  variant = "neutral",
  className = "",
}) {
  return (
    <span
      className={`inline-flex min-h-[22px] items-center justify-center rounded-pill px-2.5 py-0.5 text-[11px] font-semibold leading-none tracking-wide transition-colors ${
        variants[variant] ?? variants.neutral
      } ${className}`}
    >
      {children}
    </span>
  );
}
