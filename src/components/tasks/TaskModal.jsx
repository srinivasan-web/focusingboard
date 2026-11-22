import { useEffect, useState } from "react";
import { TASK_PRIORITIES, TASK_STATUSES } from "../../data/taskOptions.js";
import useTasks from "../../hooks/useTasks.js";
import Dialog from "../ui/Dialog.jsx";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import Textarea from "../ui/Textarea.jsx";

const CATEGORIES = [
  "Design",
  "Development",
  "Content",
  "Planning",
  "QA",
  "General",
];

const initialFormValues = {
  title: "",
  description: "",
  category: "Design",
  status: "To do",
  priority: "Medium",
  dueDate: "",
};

export default function TaskModal() {
  const { taskModal, closeTaskModal, addTask, updateTask } = useTasks();
  const { isOpen, mode, task } = taskModal;

  const [formData, setFormData] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && task) {
        setFormData({
          title: task.title || "",
          description: task.description || "",
          category: task.category || "Design",
          status: task.status || "To do",
          priority: task.priority || "Medium",
          dueDate: task.dueDate || "",
        });
      } else {
        setFormData(initialFormValues);
      }
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, mode, task]);

  if (!isOpen) return null;

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setErrors({ title: "Please enter a task title." });
      return;
    }

    setIsSubmitting(true);

    if (mode === "edit" && task) {
      const result = updateTask(task.id, formData);
      if (result.isValid) {
        closeTaskModal();
      } else {
        setErrors(result.errors || {});
        setIsSubmitting(false);
      }
    } else {
      const result = addTask(formData);
      if (result.isValid) {
        closeTaskModal();
      } else {
        setErrors(result.errors || {});
        setIsSubmitting(false);
      }
    }
  }

  const isEdit = mode === "edit";

  return (
    <Dialog
      open={isOpen}
      onClose={closeTaskModal}
      title={isEdit ? "Edit task" : "Create new task"}
      description="Add your task details to stay on top of your work."
      maxWidth="max-w-[680px]"
      footer={
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium text-focus-subtle">
            <span className="text-focus-primary font-bold">*</span>
            <span>Required field</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeTaskModal}
              disabled={isSubmitting}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-focus-border bg-focus-surface px-5 py-2.5 text-sm font-semibold text-focus-muted transition-all duration-150 hover:border-focus-border-hover hover:bg-focus-canvas hover:text-focus-text active:scale-[0.98] focus-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="task-modal-form"
              disabled={isSubmitting}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-focus-primary px-6 py-2.5 text-sm font-semibold text-white shadow-button-primary transition-all duration-150 hover:bg-focus-primary-hover hover:shadow-[0_4px_16px_rgba(99,91,238,0.4)] hover:scale-[1.01] active:scale-[0.98] active:bg-focus-primary-active focus-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {isEdit ? "Save changes" : "Create task"}
            </button>
          </div>
        </div>
      }
    >
      <form
        id="task-modal-form"
        onSubmit={handleSubmit}
        className="space-y-5 sm:space-y-6"
      >
        {/* Task Title */}
        <Input
          label="Task title"
          required
          placeholder="e.g. Redesign pricing page"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
          autoFocus
        />

        {/* Description */}
        <Textarea
          label="Description"
          placeholder="Add notes or context for this task..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          error={errors.description}
        />

        {/* Status & Priority Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            error={errors.status}
          >
            {TASK_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </Select>

          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            error={errors.priority}
          >
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </Select>
        </div>

        {/* Category & Due Date Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            error={errors.category}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>

          <Input
            label="Due date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            error={errors.dueDate}
          />
        </div>
      </form>
    </Dialog>
  );
}
