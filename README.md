# FocusBoard

FocusBoard is a single-user task dashboard built with React, Vite, Tailwind CSS, and JavaScript. This setup phase creates the responsive application shell; task management and dashboard features will be added in later phases.

## Requirements

- Node.js 20.19 or newer
- npm

## Run locally

In Windows PowerShell, use `npm.cmd` if the shell blocks the `npm` PowerShell script:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local address printed by Vite. To create and preview a production build:

```powershell
npm.cmd run build
npm.cmd run preview
```

## Setup and verification commands

For a new empty folder, Vite can create the same React JavaScript scaffold with:

```powershell
npm.cmd create vite@latest . -- --template react --no-interactive
```

In this repository the scaffold and dependencies are already present. These commands install the locked packages, start the development server, and produce a production build:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

Initialize local version control with:

```powershell
git init -b main
```

The GitHub remote is added later, after a public repository is created.

## Initial setup shell structure

```text
src/
├── components/
│   ├── layout/
│   │   └── AppShell.jsx
│   ├── dashboard/
│   │   └── DashboardHeader.jsx
│   └── ui/
│       ├── Badge.jsx
│       ├── BrandMark.jsx
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Dialog.jsx
│       ├── Field.jsx
│       ├── Icon.jsx
│       ├── IconButton.jsx
│       ├── Input.jsx
│       ├── Select.jsx
│       └── Textarea.jsx
├── pages/
│   └── DashboardPage.jsx
├── App.jsx
├── index.css
└── main.jsx
```

- `src/main.jsx` loads the global stylesheet and mounts React into the page.
- `src/App.jsx` connects the app shell to the current page.
- `src/components/layout/AppShell.jsx` owns the sidebar, top bar, and mobile navigation frame.
- `src/components/dashboard/DashboardHeader.jsx` contains the page title, description, and new-task action.
- `src/components/ui/Button.jsx` provides primary, secondary, outline, and ghost button styles.
- `src/components/ui/Field.jsx`, `Input.jsx`, `Textarea.jsx`, and `Select.jsx` provide labeled form controls with hint and error support.
- `src/components/ui/Badge.jsx` applies consistent category, status, and priority styles.
- `src/components/ui/Card.jsx` shares the dashboard card surface and layout slots.
- `src/components/ui/Dialog.jsx` wraps the native dialog element with title, description, close, Escape, and backdrop handling.
- `src/components/ui/Icon.jsx` standardizes Lucide icon sizing and decorative accessibility; `IconButton.jsx` adds a labeled button around an icon.
- `src/components/ui/BrandMark.jsx` renders the FocusBoard mark and name.
- `src/pages/DashboardPage.jsx` composes the dashboard header and setup notice.
- `src/index.css` imports Tailwind, defines FocusBoard theme tokens, and sets global browser styling.
- `vite.config.js` connects Vite to React and Tailwind.
- `index.html` is Vite's HTML entry point and provides document metadata.

Task, statistics, data, and utility folders now contain the dashboard's sample data, filters, rows, and calculated totals. A shared context and persistence hook will be added when the task state is moved into its next phase.

## Current dashboard structure

```text
src/
├── components/
│   ├── dashboard/   # DashboardHeader, FocusNotesCarousel
│   ├── layout/      # AppShell
│   ├── statistics/  # StatisticsGrid
│   ├── tasks/       # TaskSection, TaskFilters, TaskList, TaskRow
│   └── ui/          # Shared controls, cards, badges, dialog, icons
├── data/            # Sample tasks and shared task options
├── pages/           # DashboardPage
├── utils/           # Derived task statistics
├── App.jsx
├── index.css
└── main.jsx
```

## Dashboard modules

- `src/components/dashboard/` contains the dashboard heading and manually navigable Focus Notes carousel.
- `src/components/statistics/StatisticsGrid.jsx` displays counts calculated from the current task list.
- `src/components/tasks/` renders task rows and combines title search, status tabs, and priority filters.
- `src/data/sampleTasks.js` provides six examples and shared status/priority options.
- `src/utils/taskStats.js` calculates totals and completion rate.
- `src/pages/DashboardPage.jsx` owns the current in-memory task state and composes the dashboard sections.

## Task model and state flow

`src/data/taskOptions.js` is the shared source for allowed task statuses, priorities, and defaults. `src/data/sampleTasks.js` contains six realistic tasks. Each task uses this shape:

```js
{
  id: "task-1",
  title: "Design landing page",
  description: "Website redesign · Due soon",
  category: "Design",
  status: "To do",
  priority: "High",
  dueDate: "2026-11-25",
}
```

`src/utils/taskModel.js` creates IDs, fills defaults, validates individual tasks, and checks task collections for duplicate IDs. `src/context/TaskContext.jsx` owns the one shared task array, exposes add/update/status/delete actions, and loads and saves tasks under the `focusboard.tasks.v1` LocalStorage key. Invalid or unavailable saved data falls back to the sample tasks. `src/hooks/useTasks.js` provides a small, guarded way for components to access that context.

The data flow is `App → TaskProvider → DashboardPage → StatisticsGrid / TaskSection`. Dashboard components receive tasks and actions from the context hook; statistics derive counts from the same array, and `TaskSection` keeps only its search and filter selections as local state. Updating a task replaces it in the shared array, which refreshes the dashboard and is then persisted by the provider effect.

## Live dashboard metrics and Focus Notes

`StatisticsGrid` calculates the total, in-progress, and completed counts from the current task array. `getCompletionPercentage` uses `filter` to count completed tasks, divides by the task total, and rounds the result; with no tasks it returns `0`, avoiding division by zero. `CompletionSummary` displays that percentage and an accessible progress bar. Both read the same task list from the task context, so adding, editing, or completing a task updates the metrics automatically.

`FocusNotesCarousel` keeps only the active slide index in local state. Its previous/next controls and slide indicators update that index, and the component wraps at the first and last slides. Carousel state stays separate from task data.

## Create, edit, and delete tasks

`ManagedDashboardPage` connects the controls to `useTasks`. The New task button opens `TaskFormModal`; its controlled fields are initialized with defaults for creation or the selected task's values for editing. On submit, required values are checked, then the page calls `addTask(values)` or `updateTask(task.id, values)`. The context validates the final task, generates an ID for new tasks, and updates the shared array. Closing the dialog unmounts the form, so its next opening starts clean; a status message reports successful changes.

Each task card sends its own task object to the edit or delete handler. Deletion first opens `DeleteTaskDialog`; confirmation passes that task's ID to `deleteTask`, which removes only the matching item. The task section shows a helpful empty state when no tasks match. Since statistics and the list both read from the shared array, they update together and the context persists the change.

## Status and priority controls

Task statuses (`To do`, `In progress`, `Completed`) and priorities (`High`, `Medium`, `Low`) come from `src/data/taskOptions.js`. Each task card has labeled status and priority selectors. Status changes call `updateTaskStatus`; priority changes call `updateTask(taskId, { priority })`. Both update the shared task array, so statistics, filters, and the rendered cards use the new values, and the TaskProvider effect saves them to LocalStorage.

## Search, filters, and results

`src/utils/filterTasks.js` normalizes the trimmed search query and each optional task field by lowercasing strings and treating missing values as empty strings. It checks title, description, and category for the query, then combines that result with the selected status and priority using AND. `AdvancedTaskSection` memoizes the derived result list, shows the match count, and clears only the search query so status and priority remain selected. Filtering produces a new array and never changes the source task list.

`src/utils/sortTasks.js` sorts the filtered results on a copy, using the original item position as a tie-breaker for predictable ordering. It supports creation date, due date, priority, and title in both directions; tasks without dates stay at the end. Newly created tasks receive a `createdAt` timestamp in `src/utils/taskModel.js`, and sample tasks receive relative timestamps so creation-date sorting is useful from the first load.

## Persistence, responsive behavior, and accessibility

`TaskProvider` initializes task state by reading `focusboard.tasks.v1` from `localStorage`. `JSON.parse` converts the saved JSON string back into JavaScript data; the provider validates it and uses valid saved tasks before considering sample data. Missing, malformed, or invalid data is handled by falling back safely. A `useEffect` watches the task array and writes its latest value with `JSON.stringify`, which converts the array back to a storable string. Because initialization reads saved data before the first render, the initial persistence effect does not replace valid saved tasks with samples. Refresh persistence still needs a browser check.

The dashboard uses responsive component classes for narrow, medium, and wide layouts. `src/accessibility.css` keeps flex/grid children and form controls from forcing their containers wider, adds visible keyboard focus outlines, raises interactive target sizes for coarse pointers, and honors reduced-motion preferences. Shared labels and semantic controls remain in the React components.

## Design system and UI primitives

Tailwind theme variables in `src/index.css` define the FocusBoard color, font, spacing, radius, and shadow tokens. The values are estimated from the supplied reference screenshot and can be tuned against the source Figma file when it is accessible.

The app uses semantic HTML controls wrapped in small local components, plus Lucide React icons. The dialog uses the browser's native `<dialog>` behavior. shadcn/ui is not installed because these local primitives cover the current needs without adding another component dependency.

## Scope note

The current page is a setup-stage shell, not the finished dashboard. Calendar, Settings, and profile controls are disabled placeholders because their screens and behavior are outside the assignment scope.
