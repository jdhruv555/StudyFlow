import { DashboardProvider } from "@/contexts/DashboardContext";
import { Calendar } from "@/components/dashboard/Calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Academic() {
  return (
    <DashboardProvider>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-sans mb-2">
            Academic Planner
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
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
              <Card>
                <CardHeader>
                  <CardTitle>Computer Science</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Advanced algorithms and data structures</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Mathematics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Linear algebra and calculus</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Physics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Quantum mechanics fundamentals</p>
                </CardContent>
              </Card>
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
                    <li className="flex justify-between items-center">
                      <span>Algorithm Analysis Paper</span>
                      <span className="text-muted-foreground">Due in 3 days</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Physics Lab Report</span>
                      <span className="text-muted-foreground">Due in 5 days</span>
                    </li>
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