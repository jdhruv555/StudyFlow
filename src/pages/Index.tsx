import { Stats } from "@/components/dashboard/Stats";
import { TaskList } from "@/components/dashboard/TaskList";
import { ProjectList } from "@/components/dashboard/ProjectList";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [studyTimer, setStudyTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  return (
    <DashboardProvider>
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-5xl font-bold tracking-tight uppercase bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent font-sans">
            Welcome to StudyFlow
          </h2>
          <p className="text-xl text-white font-medium uppercase tracking-wide">
            Your Personal Academic Assistant
          </p>
        </div>

        <Stats />

        <Card className="bg-secondary/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Quick Study Timer</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-4xl font-bold text-white">
              {Math.floor(studyTimer / 60)}:{(studyTimer % 60).toString().padStart(2, '0')}
            </div>
            <Button
              onClick={toggleTimer}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Clock className="mr-2 h-4 w-4" />
              {isTimerActive ? 'Pause' : 'Start'} Timer
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <TaskList />
          <ProjectList />
        </div>

        <Card className="bg-secondary/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="w-full">Course Materials</Button>
            <Button variant="outline" className="w-full">Study Groups</Button>
            <Button variant="outline" className="w-full">Resources</Button>
            <Button variant="outline" className="w-full">Help Center</Button>
          </CardContent>
        </Card>

        <footer className="py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} StudyFlow. All rights reserved.</p>
        </footer>
      </div>
    </DashboardProvider>
  );
}