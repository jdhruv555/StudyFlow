import { Stats } from "@/components/dashboard/Stats";
import { TaskList } from "@/components/dashboard/TaskList";
import { ProjectList } from "@/components/dashboard/ProjectList";
import { Calendar } from "@/components/dashboard/Calendar";
import { DashboardProvider } from "@/contexts/DashboardContext";

export default function Index() {
  return (
    <DashboardProvider>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            StudyFlow
          </h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your academic progress.
          </p>
        </div>
        <Stats />
        <Calendar />
        <div className="grid gap-4 md:grid-cols-2">
          <TaskList />
          <ProjectList />
        </div>
        <footer className="py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dhruv Jha. All rights reserved.</p>
        </footer>
      </div>
    </DashboardProvider>
  );
}