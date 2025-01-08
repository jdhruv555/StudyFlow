import { DashboardProvider } from "@/contexts/DashboardContext";
import { Calendar } from "@/components/dashboard/Calendar";

export default function Academic() {
  return (
    <DashboardProvider>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight uppercase bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-sans">
            Academic Planner
          </h2>
          <p className="text-muted-foreground">
            Manage your academic schedule and assignments
          </p>
        </div>
        <Calendar />
      </div>
    </DashboardProvider>
  );
}