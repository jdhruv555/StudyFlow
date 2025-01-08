import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Moon, Edit2, Plus, Smile, Coffee } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface WellnessMetric {
  id: string;
  title: string;
  value: number;
  target: number;
  icon: any;
  description: string;
  lastUpdated?: string;
}

export default function Wellness() {
  const [metrics, setMetrics] = useState<WellnessMetric[]>([
    {
      id: '1',
      title: 'Stress Level',
      value: 45,
      target: 100,
      icon: Brain,
      description: 'Your stress levels are manageable. Keep up the good work!',
      lastUpdated: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Sleep Quality',
      value: 75,
      target: 100,
      icon: Moon,
      description: "You're getting good sleep. Aim for 8 hours consistently.",
      lastUpdated: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Exercise',
      value: 60,
      target: 100,
      icon: Heart,
      description: 'Regular exercise helps maintain mental clarity.',
      lastUpdated: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Mood',
      value: 85,
      target: 100,
      icon: Smile,
      description: 'Your mood has been positive lately!',
      lastUpdated: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Energy Level',
      value: 70,
      target: 100,
      icon: Coffee,
      description: 'Maintaining good energy levels throughout the day.',
      lastUpdated: new Date().toISOString()
    }
  ]);

  const handleUpdateMetric = (metricId: string, newValue: number) => {
    setMetrics(metrics.map(metric =>
      metric.id === metricId ? { 
        ...metric, 
        value: newValue,
        lastUpdated: new Date().toISOString()
      } : metric
    ));
    toast.success("Wellness metric updated successfully");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight uppercase bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent font-sans mb-2">
            Wellness Tracker
          </h2>
          <p className="text-lg text-muted-foreground font-medium uppercase tracking-wide">
            Monitor Your Mental & Physical Well-being
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" /> Add Metric
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Wellness Metric</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <Input placeholder="Metric Title" />
              <Input type="number" placeholder="Current Value" />
              <Input placeholder="Description" />
              <Button>Add Metric</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.id} className="hover:bg-card/60 transition-colors border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold text-white">{metric.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <metric.icon className="h-5 w-5 text-red-400" />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-red-500/10">
                      <Edit2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update {metric.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="number"
                        value={metric.value}
                        onChange={(e) => handleUpdateMetric(metric.id, Number(e.target.value))}
                        min="0"
                        max="100"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-2xl font-bold text-white">{metric.value}%</div>
                <Progress 
                  value={metric.value} 
                  className="h-2 bg-red-500/20" 
                />
                <p className="text-sm text-muted-foreground">
                  {metric.description}
                </p>
                {metric.lastUpdated && (
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(metric.lastUpdated).toLocaleDateString()}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Wellness Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <span className="text-red-500">•</span>
              <span className="text-muted-foreground">Take regular study breaks (25/5 Pomodoro technique)</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-500">•</span>
              <span className="text-muted-foreground">Practice mindfulness for 10 minutes daily</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-500">•</span>
              <span className="text-muted-foreground">Stay hydrated throughout your study sessions</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-500">•</span>
              <span className="text-muted-foreground">Maintain a consistent sleep schedule</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}