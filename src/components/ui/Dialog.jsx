import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import Icon from "./Icon.jsx";

export default function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className = "",
  maxWidth = "max-w-2xl",
}) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleCancel(event) {
    event.preventDefault();
    onClose?.();
  }

  function handleNativeClose() {
    if (open) onClose?.();
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onClose?.();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={handleCancel}
      onClose={handleNativeClose}
      onClick={handleBackdropClick}
      className={`m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] ${maxWidth} overflow-visible border-0 bg-transparent p-0 text-focus-text backdrop:bg-slate-950/45 backdrop:backdrop-blur-md`}
    >
      <div
        className={`max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[22px] border border-focus-border/80 bg-focus-surface p-6 shadow-dialog sm:p-8 sm:px-9 animate-modal-in ${className}`}
      >
        <header className="mb-6 flex items-start justify-between gap-4 border-b border-focus-border/80 pb-5">
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="text-xl sm:text-2xl font-bold tracking-tight text-focus-text">
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="mt-1 text-xs sm:text-sm text-focus-muted leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>

          {/* Premium Close Button matching reference screenshot */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-focus-border bg-focus-surface text-focus-muted transition-all duration-150 hover:border-focus-primary-border hover:bg-focus-primary-soft hover:text-focus-primary active:scale-95 focus-ring"
          >
            <Icon icon={X} size={18} strokeWidth={2.2} />
          </button>
        </header>

        <div>{children}</div>

        {footer && (
          <footer className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-focus-border/80 pt-5 sm:pt-6">
            {footer}
          </footer>
        )}
      </div>
    </dialog>
  );
}
