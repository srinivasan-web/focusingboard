import { useId } from "react";
import { ChevronDown } from "lucide-react";
import Field from "./Field.jsx";
import Icon from "./Icon.jsx";

const controlStyles =
  "min-h-[46px] w-full appearance-none rounded-xl border border-focus-border bg-[#FBFBFE] py-2.5 pl-4 pr-10 text-sm font-medium text-focus-text outline-none transition-all duration-150 hover:border-focus-border-hover hover:bg-white focus:border-focus-primary focus:bg-white focus:ring-4 focus:ring-focus-primary/12 disabled:cursor-not-allowed disabled:bg-focus-canvas disabled:text-focus-muted aria-[invalid=true]:border-focus-danger aria-[invalid=true]:focus:ring-focus-danger/20";

export default function Select({
  id,
  label,
  required = false,
  hint,
  error,
  labelClassName = "",
  fieldClassName = "",
  className = "",
  children,
  ...props
}) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = hint || error ? `${selectId}-message` : undefined;

  return (
    <Field
      id={selectId}
      label={label}
      required={required}
      hint={hint}
      error={error}
      labelClassName={labelClassName}
      className={fieldClassName}
    >
      <span className="relative block">
        <select
          {...props}
          id={selectId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          className={`${controlStyles} ${className}`}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-focus-muted">
          <Icon icon={ChevronDown} size={16} />
        </span>
      </span>
    </Field>
  );
}
