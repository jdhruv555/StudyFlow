import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  course: string;
  status: "pending" | "completed";
}

interface DashboardContextType {
  tasks: Task[];
  stats: {
    gpa: number;
    studyHours: number;
    assignments: number;
    goalsProgress: number;
  };
  toggleTaskStatus: (taskId: number) => void;
  updateStats: (key: keyof DashboardContextType["stats"], value: number) => void;
  addTask: (task: Omit<Task, "id" | "status">) => void;
  deleteTask: (taskId: number) => void;
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
  ]);

  const [stats, setStats] = useState({
    gpa: 3.8,
    studyHours: 24.5,
    assignments: 8,
    goalsProgress: 75,
  });

  const toggleTaskStatus = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    );
    toast.success("Task status updated");
  };

  const updateStats = (key: keyof typeof stats, value: number) => {
    setStats((prev) => ({ ...prev, [key]: value }));
    toast.success(`${key} updated successfully`);
  };

  const addTask = (task: Omit<Task, "id" | "status">) => {
    const newTask = {
      ...task,
      id: Date.now(),
      status: "pending" as const,
    };
    setTasks((prev) => [...prev, newTask]);
    toast.success("New task added");
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast.success("Task deleted");
  };

  return (
    <DashboardContext.Provider
      value={{ tasks, stats, toggleTaskStatus, updateStats, addTask, deleteTask }}
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