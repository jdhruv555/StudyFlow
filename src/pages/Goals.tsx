import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Goals() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-sans mb-2">
          Goals & Habits
        </h2>
        <p className="text-muted-foreground">
          Track your academic goals and build productive habits
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Study Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Daily Study Hours</span>
                  <span>6/8 hours</span>
                </div>
                <Progress value={75} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Weekly Assignments</span>
                  <span>4/5 completed</span>
                </div>
                <Progress value={80} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Habits Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span>Morning Study Session</span>
                <span className="text-green-500">✓ Done</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Review Notes</span>
                <span className="text-yellow-500">Pending</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Practice Problems</span>
                <span className="text-green-500">✓ Done</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Long-term Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <div className="flex justify-between mb-1">
                  <span>Maintain 3.8 GPA</span>
                  <span>90%</span>
                </div>
                <Progress value={90} />
              </li>
              <li>
                <div className="flex justify-between mb-1">
                  <span>Research Project</span>
                  <span>60%</span>
                </div>
                <Progress value={60} />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}