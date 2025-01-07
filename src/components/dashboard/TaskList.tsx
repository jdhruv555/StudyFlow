import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2 } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Database Systems Assignment",
    dueDate: "2024-03-20",
    course: "CS301",
    status: "pending",
  },
  {
    id: 2,
    title: "Physics Lab Report",
    dueDate: "2024-03-22",
    course: "PHY201",
    status: "pending",
  },
  {
    id: 3,
    title: "Literature Review",
    dueDate: "2024-03-25",
    course: "ENG202",
    status: "pending",
  },
];

export function TaskList() {
  return (
    <Card className="col-span-3 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.course}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}