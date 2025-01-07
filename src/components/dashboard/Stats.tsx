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
import { BookOpen, Clock, Target, Trophy, Users, Calendar, Bell } from "lucide-react";
import { useState } from "react";
import { useDashboard } from "@/contexts/DashboardContext";

export function Stats() {
  const { stats, updateStats } = useDashboard();
  const [editValue, setEditValue] = useState<number>(0);
  const [editKey, setEditKey] = useState<keyof typeof stats | null>(null);

  const handleUpdate = () => {
    if (editKey) {
      updateStats(editKey, editValue);
      setEditKey(null);
    }
  };

  const statsConfig = [
    {
      title: "Current GPA",
      value: stats.gpa,
      key: "gpa" as const,
      icon: Trophy,
      subtitle: "Target: 4.0",
      max: 4.0,
      step: 0.1,
      description: "Your current Grade Point Average",
    },
    {
      title: "Study Hours",
      value: stats.studyHours,
      key: "studyHours" as const,
      icon: Clock,
      subtitle: "This week",
      max: 168,
      step: 0.5,
      description: "Total hours spent studying",
    },
    {
      title: "Assignments",
      value: stats.assignments,
      key: "assignments" as const,
      icon: BookOpen,
      subtitle: `${stats.upcomingDeadlines} due this week`,
      max: 100,
      step: 1,
      description: "Total pending assignments",
    },
    {
      title: "Goals Progress",
      value: stats.goalsProgress,
      key: "goalsProgress" as const,
      icon: Target,
      subtitle: "Monthly target",
      max: 100,
      step: 1,
      description: "Progress towards your academic goals",
    },
    {
      title: "Courses Enrolled",
      value: stats.coursesEnrolled || 0,
      key: "coursesEnrolled" as const,
      icon: Users,
      subtitle: "Current semester",
      max: 10,
      step: 1,
      description: "Number of courses you're taking",
    },
    {
      title: "Attendance Rate",
      value: stats.attendanceRate || 0,
      key: "attendanceRate" as const,
      icon: Calendar,
      subtitle: "Semester average",
      max: 100,
      step: 1,
      description: "Your class attendance percentage",
    },
    {
      title: "Upcoming Deadlines",
      value: stats.upcomingDeadlines || 0,
      key: "upcomingDeadlines" as const,
      icon: Bell,
      subtitle: "Next 7 days",
      max: 50,
      step: 1,
      description: "Number of upcoming due dates",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat) => (
        <Card key={stat.key} className="bg-card/50 backdrop-blur hover:bg-card/60 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start p-0 hover:bg-transparent group"
                  onClick={() => {
                    setEditKey(stat.key);
                    setEditValue(stat.value);
                  }}
                >
                  <div className="space-y-1">
                    <div className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                    <p className="text-xs text-muted-foreground hidden group-hover:block">
                      {stat.description}
                    </p>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update {stat.title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                    <Input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      max={stat.max}
                      step={stat.step}
                    />
                    <Button onClick={handleUpdate}>Update</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}