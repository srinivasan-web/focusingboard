import { useId } from "react";
import Field from "./Field.jsx";

const controlStyles =
  "min-h-[46px] w-full rounded-xl border border-focus-border bg-[#FBFBFE] px-4 py-2.5 text-sm font-medium text-focus-text outline-none transition-all duration-150 placeholder:text-focus-subtle/80 hover:border-focus-border-hover hover:bg-white focus:border-focus-primary focus:bg-white focus:ring-4 focus:ring-focus-primary/12 disabled:cursor-not-allowed disabled:bg-focus-canvas disabled:text-focus-muted aria-[invalid=true]:border-focus-danger aria-[invalid=true]:focus:ring-focus-danger/20";

export default function Input({
  id,
  label,
  required = false,
  hint,
  error,
  labelClassName = "",
  fieldClassName = "",
  className = "",
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = hint || error ? `${inputId}-message` : undefined;

  return (
    <Field
      id={inputId}
      label={label}
      required={required}
      hint={hint}
      error={error}
      labelClassName={labelClassName}
      className={fieldClassName}
    >
      <input
        {...props}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={messageId}
        className={`${controlStyles} ${className}`}
      />
    </Field>
  );
}
