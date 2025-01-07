import { Stats } from "@/components/dashboard/Stats";
import { TaskList } from "@/components/dashboard/TaskList";
import { DashboardProvider } from "@/contexts/DashboardContext";

export default function Index() {
  return (
    <DashboardProvider>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your academic progress.
          </p>
        </div>
        <Stats />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TaskList />
        </div>
      </div>
    </DashboardProvider>
  );
}