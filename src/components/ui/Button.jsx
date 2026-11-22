const variants = {
  primary:
    "bg-focus-primary text-white shadow-button-primary hover:bg-focus-primary-hover active:bg-focus-primary-active hover:scale-[1.01] active:scale-[0.98]",
  secondary:
    "bg-focus-primary-soft text-focus-primary hover:bg-focus-primary/15 active:bg-focus-primary/25",
  outline:
    "border border-focus-border bg-focus-surface text-focus-text hover:bg-focus-canvas hover:border-focus-border-hover active:bg-slate-100",
  ghost:
    "bg-transparent text-focus-muted hover:bg-focus-canvas hover:text-focus-text",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-control px-4 py-2 text-sm font-semibold transition-all duration-150 focus-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${
        variants[variant] ?? variants.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
