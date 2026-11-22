import AppShell from "./components/layout/AppShell.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

export default function App() {
  return (
    <TaskProvider>
      <AppShell>
        <DashboardPage />
      </AppShell>
    </TaskProvider>
  );
}
