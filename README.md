# FocusBoard

FocusBoard is a local task dashboard for planning work and tracking progress. It is built with React, JavaScript, Vite, and Tailwind CSS. Tasks stay in the browser, so the app does not need an account or backend.

Users can create, edit, complete, and delete tasks; search by title, description, or category; filter by status and priority; sort results; and review dashboard statistics. The layout adapts to mobile, tablet, and desktop screens.

## How the app works

`TaskContext` owns the task list and its update actions. Dashboard sections read from that shared list, while search, filters, sorting, and statistics are calculated from it. The app saves tasks in LocalStorage, so they remain in the same browser after a refresh. No backend or account is required.

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

The source repository is hosted on GitHub. Vercel can build the production site from the configured branch.

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
