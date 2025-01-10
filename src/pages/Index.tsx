import { Stats } from "@/components/dashboard/Stats";
import { TaskList } from "@/components/dashboard/TaskList";
import { ProjectList } from "@/components/dashboard/ProjectList";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Index() {
  const [studyTimer, setStudyTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive) {
      interval = setInterval(() => {
        setStudyTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive]);

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
    if (!isTimerActive) {
      toast.success("Study timer started!");
    } else {
      toast.info(`Study session ended: ${formatTime(studyTimer)}`);
    }
  };

  const resetTimer = () => {
    setStudyTimer(0);
    setIsTimerActive(false);
    toast.info("Timer reset");
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const quickLinks = [
    {
      title: "Course Materials",
      url: "https://www.coursera.org/",
      description: "Access free online courses and materials"
    },
    {
      title: "Resources",
      url: "https://www.khanacademy.org/",
      description: "Free educational resources and practice exercises"
    },
    {
      title: "Help Center",
      url: "https://stackoverflow.com/",
      description: "Get help from the developer community"
    }
  ];

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
            <CardTitle className="text-2xl font-bold text-white">Study Timer</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-4xl font-bold text-white font-mono">
              {formatTime(studyTimer)}
            </div>
            <div className="space-x-2">
              <Button
                onClick={toggleTimer}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Clock className="mr-2 h-4 w-4" />
                {isTimerActive ? 'Stop' : 'Start'} Timer
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
                className="text-white"
              >
                Reset
              </Button>
            </div>
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
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="h-full hover:bg-secondary/70 transition-colors">
                  <CardContent className="p-4 flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{link.title}</h3>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </CardContent>
        </Card>

        <footer className="py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} StudyFlow. All rights reserved.</p>
        </footer>
      </div>
    </DashboardProvider>
  );
}