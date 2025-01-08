import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Moon, Edit2 } from "lucide-react";
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
}

export default function Wellness() {
  const [metrics, setMetrics] = useState<WellnessMetric[]>([
    {
      id: '1',
      title: 'Stress Level',
      value: 45,
      target: 100,
      icon: Brain,
      description: 'Your stress levels are manageable. Keep up the good work!'
    },
    {
      id: '2',
      title: 'Sleep Quality',
      value: 75,
      target: 100,
      icon: Moon,
      description: "You're getting good sleep. Aim for 8 hours consistently."
    },
    {
      id: '3',
      title: 'Exercise',
      value: 60,
      target: 100,
      icon: Heart,
      description: 'Regular exercise helps maintain mental clarity.'
    }
  ]);

  const handleUpdateMetric = (metricId: string, newValue: number) => {
    setMetrics(metrics.map(metric =>
      metric.id === metricId ? { ...metric, value: newValue } : metric
    ));
    toast.success("Wellness metric updated successfully");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-sans mb-2">
          Wellness Tracker
        </h2>
        <p className="text-lg text-muted-foreground font-medium">
          Monitor and improve your mental and physical well-being
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.id} className="hover:bg-card/60 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <metric.icon className="h-4 w-4 text-muted-foreground" />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
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
                <div className="text-2xl font-bold">{metric.value}%</div>
                <Progress value={metric.value} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wellness Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">•</span>
              <span>Take regular study breaks (25/5 Pomodoro technique)</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">•</span>
              <span>Practice mindfulness for 10 minutes daily</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">•</span>
              <span>Stay hydrated throughout your study sessions</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">•</span>
              <span>Maintain a consistent sleep schedule</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}