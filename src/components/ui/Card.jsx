export default function Card({
  as: Element = "div",
  className = "",
  ...props
}) {
  return (
    <Element
      className={`rounded-card border border-focus-border bg-focus-surface shadow-card ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`px-5 pt-5 sm:px-6 sm:pt-6 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`px-5 py-5 sm:px-6 sm:py-6 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }) {
  return (
    <div
      className={`flex items-center gap-3 border-t border-focus-border px-5 py-4 sm:px-6 ${className}`}
      {...props}
    />
  );
}
