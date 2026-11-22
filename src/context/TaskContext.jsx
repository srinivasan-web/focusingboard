import { createContext, useEffect, useState, useCallback } from "react";
import { TASK_STATUSES } from "../data/taskOptions.js";
import { sampleTasks } from "../data/sampleTasks.js";
import {
  createTask,
  isValidTaskCollection,
  validateTask,
} from "../utils/taskModel.js";

const STORAGE_KEY = "focusboard.tasks.v1";
const TaskContext = createContext(null);

function copySampleTasks() {
  return sampleTasks.map((task) => ({ ...task }));
}

function readInitialTasks() {
  if (typeof window === "undefined") return copySampleTasks();

  try {
    const savedTasks = window.localStorage.getItem(STORAGE_KEY);
    if (!savedTasks) return copySampleTasks();

    const savedValue = JSON.parse(savedTasks);
    const parsedTasks = Array.isArray(savedValue)
      ? savedValue.map((task) => createTask(task))
      : savedValue;
    return isValidTaskCollection(parsedTasks) ? parsedTasks : copySampleTasks();
  } catch {
    return copySampleTasks();
  }
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(readInitialTasks);
  const [storageError, setStorageError] = useState("");

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Modal states for task creation / editing
  const [taskModal, setTaskModal] = useState({
    isOpen: false,
    mode: "create", // "create" | "edit"
    task: null,
  });

  // Modal state for delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    task: null,
  });

  // Toast helpers
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((title, type = "info", message = "") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, type, message }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setStorageError("");
    } catch {
      setStorageError("Your changes could not be saved in this browser.");
    }
  }, [tasks]);

  function addTask(values) {
    const task = createTask(values);
    const validation = validateTask(task);
    if (!validation.isValid) return validation;

    if (tasks.some((existingTask) => existingTask.id === task.id)) {
      return {
        isValid: false,
        errors: { id: "This task ID is already in use." },
      };
    }

    setTasks((currentTasks) => [task, ...currentTasks]);
    addToast("Task created", "success", `"${task.title}" was added to your board.`);
    return { isValid: true, errors: {}, task };
  }

  function updateTask(taskId, changes) {
    const currentTask = tasks.find((task) => task.id === taskId);
    if (!currentTask) {
      return { isValid: false, errors: { form: "This task could not be found." } };
    }

    const updatedTask = createTask({ ...currentTask, ...changes, id: taskId });
    const validation = validateTask(updatedTask);
    if (!validation.isValid) return validation;

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
    );
    addToast("Task updated", "info", `"${updatedTask.title}" has been updated.`);
    return { isValid: true, errors: {}, task: updatedTask };
  }

  function updateTaskStatus(taskId, nextStatus) {
    const isSupportedStatus = TASK_STATUSES.some(
      (status) => status.value === nextStatus,
    );
    if (!isSupportedStatus) return false;

    const currentTask = tasks.find((t) => t.id === taskId);
    if (!currentTask) return false;

    const res = updateTask(taskId, { status: nextStatus });
    if (res.isValid && nextStatus === "Completed") {
      addToast("Task completed!", "success", `Nice work finishing "${currentTask.title}".`);
    }
    return res.isValid;
  }

  function toggleTaskCompleted(taskId) {
    const currentTask = tasks.find((t) => t.id === taskId);
    if (!currentTask) return false;

    const isCurrentlyCompleted = currentTask.status === "Completed";
    const nextStatus = isCurrentlyCompleted ? "To do" : "Completed";

    return updateTaskStatus(taskId, nextStatus);
  }

  function deleteTask(taskId) {
    const targetTask = tasks.find((task) => task.id === taskId);
    if (!targetTask) return false;

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
    addToast("Task deleted", "warning", `"${targetTask.title}" was removed.`);
    return true;
  }

  function resetSampleTasks() {
    const fresh = copySampleTasks();
    setTasks(fresh);
    addToast("Board reset", "info", "Sample tasks have been restored.");
  }

  // Modal control functions
  function openCreateModal() {
    setTaskModal({
      isOpen: true,
      mode: "create",
      task: null,
    });
  }

  function openEditModal(task) {
    setTaskModal({
      isOpen: true,
      mode: "edit",
      task,
    });
  }

  function closeTaskModal() {
    setTaskModal((prev) => ({ ...prev, isOpen: false }));
  }

  function openDeleteConfirm(task) {
    setDeleteConfirm({
      isOpen: true,
      task,
    });
  }

  function closeDeleteConfirm() {
    setDeleteConfirm({
      isOpen: false,
      task: null,
    });
  }

  function confirmDelete() {
    if (deleteConfirm.task) {
      deleteTask(deleteConfirm.task.id);
    }
    closeDeleteConfirm();
  }

  const value = {
    tasks,
    storageError,
    addTask,
    updateTask,
    updateTaskStatus,
    toggleTaskCompleted,
    deleteTask,
    resetSampleTasks,
    // Toasts
    toasts,
    addToast,
    removeToast,
    // Task modal
    taskModal,
    openCreateModal,
    openEditModal,
    closeTaskModal,
    // Delete confirm
    deleteConfirm,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskContext;
