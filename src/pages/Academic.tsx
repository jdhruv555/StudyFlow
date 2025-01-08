import { DashboardProvider } from "@/contexts/DashboardContext";
import { Calendar } from "@/components/dashboard/Calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Course {
  id: number;
  title: string;
  description: string;
}

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
}

export default function Academic() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: "Computer Science", description: "Advanced algorithms and data structures" },
    { id: 2, title: "Mathematics", description: "Linear algebra and calculus" },
    { id: 3, title: "Physics", description: "Quantum mechanics fundamentals" },
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: "Algorithm Analysis Paper", dueDate: "2024-03-25" },
    { id: 2, title: "Physics Lab Report", dueDate: "2024-03-28" },
  ]);

  const [editingCourse, setEditingCourse] = useState<number | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<number | null>(null);

  const handleCourseEdit = (courseId: number, field: 'title' | 'description', value: string) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, [field]: value } : course
    ));
  };

  const handleAssignmentEdit = (assignmentId: number, field: 'title' | 'dueDate', value: string) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId ? { ...assignment, [field]: value } : assignment
    ));
  };

  const saveCourse = (courseId: number) => {
    setEditingCourse(null);
    toast.success("Course updated successfully");
  };

  const saveAssignment = (assignmentId: number) => {
    setEditingAssignment(null);
    toast.success("Assignment updated successfully");
  };

  return (
    <DashboardProvider>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent font-sans mb-2 uppercase">
            Academic Planner
          </h2>
          <p className="text-lg text-white font-medium uppercase">
            Customize and manage your academic journey effectively
          </p>
        </div>
        
        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList className="bg-card/50 backdrop-blur">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule" className="space-y-4">
            <Calendar />
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map(course => (
                <Card key={course.id}>
                  <CardHeader>
                    {editingCourse === course.id ? (
                      <Input
                        value={course.title}
                        onChange={(e) => handleCourseEdit(course.id, 'title', e.target.value)}
                        className="font-semibold"
                      />
                    ) : (
                      <CardTitle 
                        className="cursor-pointer hover:text-primary"
                        onClick={() => setEditingCourse(course.id)}
                      >
                        {course.title}
                      </CardTitle>
                    )}
                  </CardHeader>
                  <CardContent>
                    {editingCourse === course.id ? (
                      <>
                        <Input
                          value={course.description}
                          onChange={(e) => handleCourseEdit(course.id, 'description', e.target.value)}
                          className="mb-2"
                        />
                        <Button onClick={() => saveCourse(course.id)}>Save</Button>
                      </>
                    ) : (
                      <p className="cursor-pointer hover:text-primary" onClick={() => setEditingCourse(course.id)}>
                        {course.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="assignments">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {assignments.map(assignment => (
                      <li key={assignment.id} className="flex justify-between items-center">
                        {editingAssignment === assignment.id ? (
                          <>
                            <Input
                              value={assignment.title}
                              onChange={(e) => handleAssignmentEdit(assignment.id, 'title', e.target.value)}
                              className="w-1/2 mr-2"
                            />
                            <Input
                              type="date"
                              value={assignment.dueDate}
                              onChange={(e) => handleAssignmentEdit(assignment.id, 'dueDate', e.target.value)}
                              className="w-1/3 mr-2"
                            />
                            <Button onClick={() => saveAssignment(assignment.id)}>Save</Button>
                          </>
                        ) : (
                          <>
                            <span 
                              className="cursor-pointer hover:text-primary"
                              onClick={() => setEditingAssignment(assignment.id)}
                            >
                              {assignment.title}
                            </span>
                            <span className="text-muted-foreground">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardProvider>
  );
}