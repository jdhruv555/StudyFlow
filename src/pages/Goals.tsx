import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Target, Trophy, Calendar } from "lucide-react";
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
  deadline?: string;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Daily Study Hours',
      target: 8,
      current: 6,
      type: 'study',
      deadline: '2024-04-01'
    },
    {
      id: '2',
      title: 'Weekly Assignments',
      target: 5,
      current: 4,
      type: 'habit',
      deadline: '2024-03-31'
    }
  ]);

  const handleUpdateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
    toast.success("Goal updated successfully");
  };

  const addNewGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal = {
      ...newGoal,
      id: Math.random().toString(36).substr(2, 9)
    };
    setGoals([...goals, goal]);
    toast.success("New goal added successfully");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight uppercase bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent font-sans mb-2">
            Goals & Habits
          </h2>
          <p className="text-lg text-muted-foreground font-medium uppercase tracking-wide">
            Track Your Progress & Build Better Habits
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" /> Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <Input placeholder="Goal Title" />
              <Input type="number" placeholder="Target Value" />
              <Input type="date" placeholder="Deadline (Optional)" />
              <Button onClick={() => addNewGoal({
                title: "New Goal",
                target: 10,
                current: 0,
                type: 'study'
              })}>
                Add Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map(goal => (
          <Card key={goal.id} className="hover:bg-card/60 transition-colors border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white">{goal.title}</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-red-500/10">
                    <Edit2 className="h-4 w-4 text-red-400" />
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
                    {goal.deadline && (
                      <Input
                        type="date"
                        value={goal.deadline}
                        onChange={(e) => handleUpdateGoal(goal.id, { deadline: e.target.value })}
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{goal.current}</span>
                  <span>{goal.target}</span>
                </div>
                <Progress 
                  value={(goal.current / goal.target) * 100} 
                  className="h-2 bg-red-500/20"
                />
                {goal.deadline && (
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}