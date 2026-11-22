export default function Field({
  id,
  label,
  required = false,
  hint,
  error,
  labelClassName = "",
  className = "",
  children,
}) {
  const message = error || hint;

  return (
    <div className={`min-w-0 space-y-2 ${className}`}>
      <label
        htmlFor={id}
        className={`flex items-center text-[13px] font-semibold text-focus-text tracking-wide ${labelClassName}`}
      >
        <span>{label}</span>
        {required && (
          <span className="ml-1 text-focus-primary font-bold" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {message && (
        <p
          id={`${id}-message`}
          className={`text-xs font-medium leading-5 ${
            error ? "text-focus-danger" : "text-focus-muted"
          }`}
          aria-live={error ? "polite" : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
}
