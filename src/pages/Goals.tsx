import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Edit2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  type: 'study' | 'habit' | 'longterm';
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Daily Study Hours',
      target: 8,
      current: 6,
      type: 'study'
    },
    {
      id: '2',
      title: 'Weekly Assignments',
      target: 5,
      current: 4,
      type: 'habit'
    }
  ]);

  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const handleUpdateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
    toast.success("Goal updated successfully");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-sans mb-2">
          Goals & Habits
        </h2>
        <p className="text-lg text-muted-foreground font-medium">
          Set and track your personal academic goals
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map(goal => (
          <Card key={goal.id} className="hover:bg-card/60 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{goal.title}</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Goal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Current progress"
                      type="number"
                      value={goal.current}
                      onChange={(e) => handleUpdateGoal(goal.id, { current: Number(e.target.value) })}
                    />
                    <Input
                      placeholder="Target"
                      type="number"
                      value={goal.target}
                      onChange={(e) => handleUpdateGoal(goal.id, { target: Number(e.target.value) })}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{goal.current}</span>
                  <span>{goal.target}</span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}