# FocusBoard Manual Testing Checklist

Run `npm run dev`, open the local URL in a browser, and use a fresh task list unless a step says to reload existing data.

## Startup and task actions

- [ ] **Startup:** App loads without a blank screen or visible console error.
- [ ] **Create:** Add a task with title, description, category, status, priority, and due date. Confirm the card appears and the form closes with success feedback.
- [ ] **Validation:** Submit an empty title (and category if required). Confirm the form stays open and shows a clear field error.
- [ ] **Edit:** Change a task title and priority. Confirm only that task changes and its ID remains the same.
- [ ] **Delete:** Delete a task, cancel once, then confirm another. Cancel should preserve it; confirmation should remove only the selected task.
- [ ] **Status:** Change a task through To do, In progress, and Completed. Confirm its card state and the relevant statistics change.
- [ ] **Priority:** Change between High, Medium, and Low. Confirm the card badge and priority filter reflect the selected value.
- [ ] **Empty state:** Remove all tasks, then try a search/filter combination with no matches. Confirm each empty state is clear and offers the right next step.

## Search, statistics, and carousel

- [ ] **Search:** Find tasks by title, description, and category using mixed casing and surrounding spaces; clear the query and confirm status/priority selections remain active.
- [ ] **Combined filters:** Apply a status, priority, and search query together. Confirm every result matches all active criteria.
- [ ] **Sorting:** Try each sorting option after filtering. Confirm dates with no due date remain at the end and equal values keep their prior order.
- [ ] **Statistics:** Compare total, in-progress, completed, and completion percentage with the task cards. Check that zero tasks gives 0% without an error.
- [ ] **Carousel:** Use previous, next, and each indicator. Confirm all three slides display and navigation wraps at both ends.

## Persistence and responsive layout

- [ ] **LocalStorage:** Create or edit a task, then inspect the `focusboard.tasks.v1` entry in DevTools > Application > Local Storage. Confirm it contains the current task array.
- [ ] **Refresh:** Reload the page. Confirm the edited tasks remain and sample data does not replace them.
- [ ] **Invalid saved data:** With a backup of the current entry, replace it temporarily with invalid JSON. Reload and confirm the app recovers safely; restore the original entry afterward.
- [ ] **Older task shape:** Test saved tasks missing optional description, category, or due-date fields. Confirm the app renders safely and fills defaults.
- [ ] **Mobile (390px):** Confirm mobile navigation, cards, filters, carousel, and forms fit without horizontal scrolling. Check controls are easy to tap.
- [ ] **Tablet (768px):** Confirm navigation and dashboard sections use the available width cleanly.
- [ ] **Desktop (1440px):** Confirm sidebar, dashboard sections, and task rows align with the reference layout.

## Accessibility basics

- [ ] Use Tab and Shift+Tab to reach interactive controls; confirm focus is visible.
- [ ] Operate search, filters, task controls, and carousel with a keyboard.
- [ ] Confirm icon-only buttons have accessible names and form controls have associated labels.
- [ ] Confirm dialogs expose a title, can be dismissed with Escape, and return focus to the control that opened them.
- [ ] Enable reduced motion and confirm transitions do not interfere with use.

## Build check

- [ ] Run `npm run build` and confirm Vite completes without errors.
