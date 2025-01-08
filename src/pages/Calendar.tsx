import { Calendar } from "@/components/dashboard/Calendar";

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold tracking-tight uppercase bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-sans">
          Calendar
        </h2>
        <p className="text-muted-foreground">
          View and manage your schedule
        </p>
      </div>
      <Calendar />
    </div>
  );
}