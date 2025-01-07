import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, CheckCircle2, Plus, Trash2, AlertTriangle, Flag } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { useState } from "react";

type TaskPriority = "low" | "medium" | "high";

interface NewTask {
  title: string;
  course: string;
  dueDate: string;
  priority: TaskPriority;
  description: string;
}

export function TaskList() {
  const { tasks, toggleTaskStatus, addTask, deleteTask, updateTaskPriority, updateTaskDescription } = useDashboard();
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    course: "",
    dueDate: "",
    priority: "medium",
    description: "",
  });
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const handleAddTask = () => {
    if (newTask.title && newTask.course && newTask.dueDate) {
      addTask(newTask);
      setNewTask({
        title: "",
        course: "",
        dueDate: "",
        priority: "medium",
        description: "",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
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
          <DialogContent className="sm:max-w-[425px]">
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
              <Select
                value={newTask.priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setNewTask((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, description: e.target.value }))
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
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-card/60 transition-colors"
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
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p
                      className={`font-medium ${
                        task.status === "completed" ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <Flag className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
                    {isOverdue(task.dueDate) && task.status !== "completed" && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{task.course}</p>
                  {task.description && (
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <Select
                  value={task.priority}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    updateTaskPriority(task.id, value)
                  }
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
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
