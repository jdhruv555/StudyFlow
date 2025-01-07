import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { useState } from "react";

export function TaskList() {
  const { tasks, toggleTaskStatus, addTask, deleteTask } = useDashboard();
  const [newTask, setNewTask] = useState({
    title: "",
    course: "",
    dueDate: "",
  });

  const handleAddTask = () => {
    if (newTask.title && newTask.course && newTask.dueDate) {
      addTask(newTask);
      setNewTask({ title: "", course: "", dueDate: "" });
    }
  };

  return (
    <Card className="col-span-3 bg-card/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Upcoming Tasks</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <Input
                placeholder="Course code"
                value={newTask.course}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, course: e.target.value }))
                }
              />
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />
              <Button onClick={handleAddTask}>Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTaskStatus(task.id)}
                >
                  <CheckCircle2
                    className={`h-5 w-5 ${
                      task.status === "completed"
                        ? "text-green-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
                <div>
                  <p
                    className={`font-medium ${
                      task.status === "completed" ? "line-through" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{task.course}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}