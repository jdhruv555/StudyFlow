import { Calendar } from "@/components/dashboard/Calendar";

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold tracking-tight uppercase bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent font-sans mb-2">
          Calendar
        </h2>
        <p className="text-lg text-muted-foreground font-medium uppercase tracking-wide">
          Organize Your Schedule Effectively
        </p>
      </div>
      <Calendar />
    </div>
  );
}