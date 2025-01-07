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
import { BookOpen, Clock, Target, Trophy } from "lucide-react";
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
      subtitle: "+0.2 from last semester",
      max: 4.0,
      step: 0.1,
    },
    {
      title: "Study Hours",
      value: stats.studyHours,
      key: "studyHours" as const,
      icon: Clock,
      subtitle: "This week",
      max: 168,
      step: 0.5,
    },
    {
      title: "Assignments",
      value: stats.assignments,
      key: "assignments" as const,
      icon: BookOpen,
      subtitle: "3 due this week",
      max: 100,
      step: 1,
    },
    {
      title: "Goals Progress",
      value: stats.goalsProgress,
      key: "goalsProgress" as const,
      icon: Target,
      subtitle: "Monthly target",
      max: 100,
      step: 1,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat) => (
        <Card key={stat.key} className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start p-0 hover:bg-transparent"
                  onClick={() => {
                    setEditKey(stat.key);
                    setEditValue(stat.value);
                  }}
                >
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update {stat.title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
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