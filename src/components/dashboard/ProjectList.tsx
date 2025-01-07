import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const projects = [
  {
    name: "E-commerce Redesign",
    client: "TechCorp Inc",
    progress: 75,
    status: "In Progress",
    dueDate: "2024-03-15",
  },
  {
    name: "Mobile App Development",
    client: "StartupX",
    progress: 30,
    status: "In Progress",
    dueDate: "2024-04-01",
  },
  {
    name: "Brand Identity",
    client: "Fashion Co",
    progress: 90,
    status: "Review",
    dueDate: "2024-03-10",
  },
];

export function ProjectList() {
  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="space-y-1">
                <h3 className="font-medium leading-none">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.client}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-40">
                  <Progress value={project.progress} className="h-2" />
                </div>
                <Badge
                  variant="secondary"
                  className="w-24 justify-center font-normal"
                >
                  {project.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}