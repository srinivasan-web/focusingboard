import { AlertTriangle } from "lucide-react";
import useTasks from "../../hooks/useTasks.js";
import Button from "./Button.jsx";
import Dialog from "./Dialog.jsx";
import Icon from "./Icon.jsx";

export default function ConfirmDialog() {
  const { deleteConfirm, closeDeleteConfirm, confirmDelete } = useTasks();

  if (!deleteConfirm.isOpen || !deleteConfirm.task) return null;

  const { task } = deleteConfirm;

  return (
    <Dialog
      open={deleteConfirm.isOpen}
      onClose={closeDeleteConfirm}
      title="Delete Task"
      className="max-w-md"
      footer={
        <>
          <Button variant="outline" onClick={closeDeleteConfirm}>
            Cancel
          </Button>
          <button
            type="button"
            onClick={confirmDelete}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-control bg-focus-danger px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600 focus-ring"
          >
            Delete task
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3 py-1">
        <span className="grid size-10 shrink-0 place-items-center rounded-control bg-focus-danger-soft text-focus-danger">
          <Icon icon={AlertTriangle} size={20} />
        </span>
        <div className="text-sm">
          <p className="font-semibold text-focus-text">
            Are you sure you want to delete this task?
          </p>
          <p className="mt-1 text-xs leading-5 text-focus-muted">
            &ldquo;{task.title}&rdquo; will be permanently removed from your FocusBoard. This action cannot be undone.
          </p>
        </div>
      </div>
    </Dialog>
  );
}
