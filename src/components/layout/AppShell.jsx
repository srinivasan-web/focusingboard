import { useState, useRef, useEffect } from "react";
import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Plus,
  RotateCcw,
  Settings2,
  User,
} from "lucide-react";
import BrandMark from "../ui/BrandMark.jsx";
import Icon from "../ui/Icon.jsx";
import ToastContainer from "../ui/ToastContainer.jsx";
import ConfirmDialog from "../ui/ConfirmDialog.jsx";
import TaskModal from "../tasks/TaskModal.jsx";
import useTasks from "../../hooks/useTasks.js";

const navigationItems = [
  { label: "Overview", icon: LayoutDashboard, sectionId: "overview" },
  { label: "My tasks", icon: ListTodo, sectionId: "tasks" },
  { label: "Calendar", icon: CalendarDays, preview: true },
  { label: "Settings", icon: Settings2, preview: true },
];

function NavigationItem({ item, activeSection, onNavigate, mobile = false }) {
  const IconComponent = item.icon;
  const isActive = item.sectionId === activeSection;

  const baseClasses = mobile
    ? "flex flex-col items-center justify-center gap-1 py-1 px-3 text-[11px] font-medium transition-colors"
    : "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-all duration-150";

  const stateClasses = isActive
    ? "bg-focus-primary-soft text-focus-primary font-semibold"
    : "text-focus-muted hover:bg-focus-surface hover:text-focus-text";

  return (
    <button
      type="button"
      className={`${baseClasses} ${stateClasses} focus-ring`}
      aria-current={isActive ? "page" : undefined}
      onClick={() => onNavigate(item)}
    >
      <Icon
        icon={IconComponent}
        size={mobile ? 19 : 18}
        className={isActive ? "text-focus-primary" : "text-focus-muted"}
      />
      <span>{item.label}</span>
    </button>
  );
}

export default function AppShell({ children }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const { addToast, resetSampleTasks, openCreateModal } = useTasks();

  const activeLabel = activeSection === "tasks" ? "My tasks" : "Overview";

  // Handle outside click and escape for profile menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileOpen]);

  function handleNavigate(item) {
    if (item.sectionId) {
      setActiveSection(item.sectionId);
      const element = document.getElementById(item.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (item.label === "Calendar") {
      addToast(
        "Calendar View",
        "info",
        "Calendar scheduling view is scheduled for the next major release.",
      );
    } else if (item.label === "Settings") {
      addToast(
        "Workspace Settings",
        "info",
        "Workspace preferences can be configured via your profile menu.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-focus-canvas font-sans text-focus-text antialiased">
      <div className="mx-auto flex min-h-screen max-w-[1536px]">
        {/* Desktop Sidebar (240px) */}
        <aside
          aria-label="Sidebar navigation"
          className="hidden w-60 shrink-0 border-r border-focus-border bg-focus-surface px-4 py-6 lg:flex lg:flex-col"
        >
          <div className="px-2 pb-8">
            <BrandMark />
          </div>

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-focus-subtle">
            Workspace
          </p>

          <nav aria-label="Main Navigation" className="flex-1 space-y-1">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.label}
                item={item}
                activeSection={activeSection}
                onNavigate={handleNavigate}
              />
            ))}
          </nav>

          {/* Quick task creation in sidebar bottom */}
          <div className="pt-4 border-t border-focus-border">
            <button
              type="button"
              onClick={openCreateModal}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-focus-primary-soft py-2.5 px-3 text-xs font-semibold text-focus-primary transition-colors hover:bg-focus-primary hover:text-white focus-ring"
            >
              <Icon icon={Plus} size={15} />
              <span>Create Task</span>
            </button>
          </div>
        </aside>

        {/* Main Application Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-focus-border bg-focus-surface/90 px-page-x backdrop-blur-md">
            {/* Mobile Brand */}
            <div className="lg:hidden">
              <BrandMark />
            </div>

            {/* Desktop Breadcrumbs */}
            <div className="hidden items-center gap-2.5 text-xs text-focus-muted lg:flex">
              <span className="font-medium hover:text-focus-text cursor-default">
                Workspace
              </span>
              <span aria-hidden="true" className="text-focus-subtle/60">
                /
              </span>
              <span className="font-semibold text-focus-text">{activeLabel}</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full p-1 transition-all hover:bg-focus-canvas focus-ring"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                aria-label="Open profile and workspace menu"
              >
                <span className="grid size-9 place-items-center rounded-full bg-focus-primary-soft text-xs font-bold text-focus-primary ring-2 ring-transparent transition hover:ring-focus-primary/20">
                  JD
                </span>
                <Icon
                  icon={ChevronDown}
                  size={14}
                  className={`text-focus-muted transition-transform duration-200 hidden sm:block ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-64 rounded-card border border-focus-border bg-focus-surface p-2 shadow-dropdown animate-dropdown-in z-50"
                >
                  <div className="px-3 py-2.5 border-b border-focus-border mb-1">
                    <p className="text-xs font-bold text-focus-text">John Doe</p>
                    <p className="text-[11px] text-focus-muted truncate">
                      john.doe@example.com
                    </p>
                    <span className="mt-1.5 inline-block rounded-pill bg-focus-primary-soft px-2 py-0.5 text-[10px] font-semibold text-focus-primary">
                      Productivity Pro
                    </span>
                  </div>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileOpen(false);
                      openCreateModal();
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-focus-text hover:bg-focus-primary-soft hover:text-focus-primary transition-colors text-left"
                  >
                    <Icon icon={Plus} size={15} />
                    <span>New task</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileOpen(false);
                      resetSampleTasks();
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-focus-text hover:bg-focus-canvas transition-colors text-left"
                  >
                    <Icon icon={RotateCcw} size={15} />
                    <span>Reset sample tasks</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileOpen(false);
                      addToast(
                        "Profile preferences",
                        "info",
                        "Account details are synchronized with local profile.",
                      );
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-focus-text hover:bg-focus-canvas transition-colors text-left"
                  >
                    <Icon icon={User} size={15} />
                    <span>Profile settings</span>
                  </button>

                  <div className="my-1 border-t border-focus-border" />

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileOpen(false);
                      addToast(
                        "Signed out",
                        "info",
                        "Signed out of session. Data remains saved in your browser.",
                      );
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-focus-danger hover:bg-focus-danger-soft transition-colors text-left"
                  >
                    <Icon icon={LogOut} size={15} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="min-w-0 flex-1 px-page-x pb-28 pt-6 lg:pb-12 lg:pt-8">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-focus-border bg-focus-surface/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md lg:hidden"
      >
        <ul className="flex items-center justify-around">
          {navigationItems.map((item) => (
            <li key={item.label} className="flex-1">
              <NavigationItem
                item={item}
                activeSection={activeSection}
                onNavigate={handleNavigate}
                mobile
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Global Modals & Notifications */}
      <TaskModal />
      <ConfirmDialog />
      <ToastContainer />
    </div>
  );
}
