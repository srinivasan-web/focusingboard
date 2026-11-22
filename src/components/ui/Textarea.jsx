import { useId } from "react";
import Field from "./Field.jsx";

const controlStyles =
  "min-h-[105px] w-full resize-none rounded-xl border border-focus-border bg-[#FBFBFE] px-4 py-3 text-sm font-medium leading-relaxed text-focus-text outline-none transition-all duration-150 placeholder:text-focus-subtle/80 hover:border-focus-border-hover hover:bg-white focus:border-focus-primary focus:bg-white focus:ring-4 focus:ring-focus-primary/12 disabled:cursor-not-allowed disabled:bg-focus-canvas disabled:text-focus-muted aria-[invalid=true]:border-focus-danger aria-[invalid=true]:focus:ring-focus-danger/20";

export default function Textarea({
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
  const textareaId = id ?? generatedId;
  const messageId = hint || error ? `${textareaId}-message` : undefined;

  return (
    <Field
      id={textareaId}
      label={label}
      required={required}
      hint={hint}
      error={error}
      labelClassName={labelClassName}
      className={fieldClassName}
    >
      <textarea
        {...props}
        id={textareaId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={messageId}
        className={`${controlStyles} ${className}`}
      />
    </Field>
  );
}
