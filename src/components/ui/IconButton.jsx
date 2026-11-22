import Icon from "./Icon.jsx";

const variants = {
  ghost: "text-focus-muted hover:bg-focus-canvas hover:text-focus-text",
  subtle: "bg-focus-primary-soft text-focus-primary hover:bg-focus-primary/15",
};

export default function IconButton({
  icon,
  label,
  variant = "ghost",
  className = "",
  size = 18,
  ...props
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-grid size-10 shrink-0 place-items-center rounded-control transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-primary disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] ?? variants.ghost} ${className}`}
      {...props}
    >
      <Icon icon={icon} size={size} />
    </button>
  );
}
