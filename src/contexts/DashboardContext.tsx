import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  course: string;
  status: "pending" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
  description?: string;
}

interface Stats {
  gpa: number;
  studyHours: number;
  assignments: number;
  goalsProgress: number;
  coursesEnrolled?: number;
  attendanceRate?: number;
  upcomingDeadlines?: number;
}

interface DashboardContextType {
  tasks: Task[];
  stats: Stats;
  toggleTaskStatus: (taskId: number) => void;
  updateStats: (key: keyof Stats, value: number) => void;
  addTask: (task: Omit<Task, "id" | "status">) => void;
  deleteTask: (taskId: number) => void;
  updateTaskPriority: (taskId: number, priority: Task["priority"]) => void;
  updateTaskDescription: (taskId: number, description: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Database Systems Assignment",
      dueDate: "2024-03-20",
      course: "CS301",
      status: "pending",
      priority: "high",
      description: "Complete the SQL optimization assignment",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      dueDate: "2024-03-22",
      course: "PHY201",
      status: "pending",
      priority: "medium",
      description: "Write up the results from last week's experiment",
    },
    {
      id: 3,
      title: "Literature Review",
      dueDate: "2024-03-25",
      course: "ENG202",
      status: "pending",
      priority: "low",
      description: "Review and analyze assigned readings",
    },
  ]);

  const [stats, setStats] = useState({
    gpa: 3.8,
    studyHours: 24.5,
    assignments: 8,
    goalsProgress: 75,
    coursesEnrolled: 5,
    attendanceRate: 92,
    upcomingDeadlines: 4,
  });

  const toggleTaskStatus = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const newStatus = task.status === "pending" ? "completed" : "pending";
          toast.success(`Task marked as ${newStatus}`);
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  const updateStats = (key: keyof Stats, value: number) => {
    setStats((prev) => ({ ...prev, [key]: value }));
    toast.success(`${key} updated successfully`);
  };

  const addTask = (task: Omit<Task, "id" | "status">) => {
    const newTask = {
      ...task,
      id: Date.now(),
      status: "pending" as const,
      priority: task.priority || "medium",
    };
    setTasks((prev) => [...prev, newTask]);
    toast.success("New task added");
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast.success("Task deleted");
  };

  const updateTaskPriority = (taskId: number, priority: Task["priority"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, priority } : task
      )
    );
    toast.success("Task priority updated");
  };

  const updateTaskDescription = (taskId: number, description: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, description } : task
      )
    );
    toast.success("Task description updated");
  };

  return (
    <DashboardContext.Provider
      value={{
        tasks,
        stats,
        toggleTaskStatus,
        updateStats,
        addTask,
        deleteTask,
        updateTaskPriority,
        updateTaskDescription,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}