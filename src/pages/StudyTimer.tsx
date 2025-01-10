import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface StudySession {
  subject: string;
  duration: number;
  startTime: string;
  endTime: string;
  date: string;
}

export default function StudyTimer() {
  const [studyTimer, setStudyTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<string>("");
  const [studyRecords, setStudyRecords] = useState<StudySession[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [startTime, setStartTime] = useState<string>("");

  const addSubject = () => {
    if (newSubject.trim()) {
      setCurrentSubject(newSubject.trim());
      setNewSubject("");
      toast.success(`Added new subject: ${newSubject}`);
    } else {
      toast.error("Please enter a subject name");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && currentSubject) {
      interval = setInterval(() => {
        setStudyTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive, currentSubject]);

  const toggleTimer = () => {
    if (!currentSubject && !isTimerActive) {
      toast.error("Please select or add a subject first!");
      return;
    }
    
    if (!isTimerActive) {
      setStartTime(new Date().toISOString());
      toast.success(`Started studying ${currentSubject}`);
    } else {
      const endTime = new Date().toISOString();
      setStudyRecords(prev => [...prev, {
        subject: currentSubject,
        duration: studyTimer,
        startTime: startTime,
        endTime: endTime,
        date: format(new Date(), 'yyyy-MM-dd')
      }]);
      toast.info(`Study session for ${currentSubject} ended: ${formatTime(studyTimer)}`);
    }
    setIsTimerActive(!isTimerActive);
  };

  const resetTimer = () => {
    setStudyTimer(0);
    setIsTimerActive(false);
    toast.info("Timer reset");
  };

  const deleteRecord = (index: number) => {
    setStudyRecords(prev => prev.filter((_, i) => i !== index));
    toast.success("Study record deleted");
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Study Timer</h2>
      <Card className="bg-secondary/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Study Timer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex gap-2">
              <Input
                type="text"
                placeholder="Add new subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addSubject} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-4xl font-bold text-white font-mono">
              {formatTime(studyTimer)}
            </div>
          </div>
          <div className="space-x-2">
            <Button
              onClick={toggleTimer}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={!currentSubject && !isTimerActive}
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
          {studyRecords.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-white">Study Records</h3>
              <div className="grid gap-2">
                {studyRecords.map((record, index) => (
                  <div key={index} className="flex justify-between items-center bg-secondary/30 p-2 rounded">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{record.subject}</span>
                        <span className="text-sm text-gray-400">({record.date})</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {format(new Date(record.startTime), 'HH:mm')} - {format(new Date(record.endTime), 'HH:mm')}
                      </div>
                      <div className="text-white font-mono">{formatTime(record.duration)}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteRecord(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}