import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Moon } from "lucide-react";

export default function Wellness() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-sans mb-2">
          Wellness
        </h2>
        <p className="text-muted-foreground">
          Monitor and improve your mental and physical well-being
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold">Moderate</div>
              <Progress value={45} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Your stress levels are manageable. Keep up the good work!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold">7.5 hrs</div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">
                You're getting good sleep. Aim for 8 hours consistently.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exercise</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold">30 min/day</div>
              <Progress value={60} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Regular exercise helps maintain mental clarity.
              </p>
            </div>
          </CardContent>
        </Card>
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