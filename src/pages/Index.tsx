import { Stats } from "@/components/dashboard/Stats";
import { TaskList } from "@/components/dashboard/TaskList";
import { ProjectList } from "@/components/dashboard/ProjectList";
import { DashboardProvider } from "@/contexts/DashboardContext";

export default function Index() {
  return (
    <DashboardProvider>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight uppercase bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-sans">
            StudyFlow
          </h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your academic progress.
          </p>
        </div>
        <Stats />
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