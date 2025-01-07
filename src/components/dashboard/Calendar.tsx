import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { toast } from "sonner";

interface CalendarTask {
  id: string;
  date: Date;
  title: string;
  description?: string;
}

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<CalendarTask[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const addTask = () => {
    if (!date || !newTask.title) {
      toast.error("Please select a date and enter a task title");
      return;
    }

    const task: CalendarTask = {
      id: Math.random().toString(36).substr(2, 9),
      date: date,
      title: newTask.title,
      description: newTask.description,
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "" });
    toast.success("Task added successfully");
  };

  const tasksForSelectedDate = tasks.filter(
    (task) => task.date.toDateString() === date?.toDateString()
  );

  return (
    <Card className="col-span-full bg-card/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Academic Calendar</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <CalendarIcon className="h-4 w-4" />
                <span>{date?.toLocaleDateString()}</span>
              </div>
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Input
                placeholder="Description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <Button onClick={addTask}>Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="flex justify-center p-4">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">Tasks for {date?.toLocaleDateString()}</h3>
          {tasksForSelectedDate.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tasks for this date</p>
          ) : (
            <div className="space-y-2">
              {tasksForSelectedDate.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                >
                  <h4 className="font-medium">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {task.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}