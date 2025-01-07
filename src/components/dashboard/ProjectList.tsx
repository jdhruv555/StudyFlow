import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: "Not Started" | "In Progress" | "Review" | "Completed";
  dueDate: string;
}

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Research Paper",
      client: "Advanced Biology",
      progress: 75,
      status: "In Progress",
      dueDate: "2024-03-15",
    },
    {
      id: "2",
      name: "Term Project",
      client: "Computer Science",
      progress: 30,
      status: "In Progress",
      dueDate: "2024-04-01",
    },
    {
      id: "3",
      name: "Lab Report",
      client: "Chemistry",
      progress: 90,
      status: "Review",
      dueDate: "2024-03-10",
    },
  ]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    name: "",
    client: "",
    progress: 0,
    status: "Not Started",
    dueDate: "",
  });

  const handleAddProject = () => {
    if (!newProject.name || !newProject.client || !newProject.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const project: Project = {
      id: Math.random().toString(36).substr(2, 9),
      ...newProject,
    };

    setProjects([...projects, project]);
    setNewProject({
      name: "",
      client: "",
      progress: 0,
      status: "Not Started",
      dueDate: "",
    });
    toast.success("Project added successfully");
  };

  const handleUpdateProject = () => {
    if (!editingProject) return;

    setProjects(
      projects.map((p) => (p.id === editingProject.id ? editingProject : p))
    );
    setEditingProject(null);
    toast.success("Project updated successfully");
  };

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Academic Projects</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Project name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
              />
              <Input
                placeholder="Course/Subject"
                value={newProject.client}
                onChange={(e) =>
                  setNewProject({ ...newProject, client: e.target.value })
                }
              />
              <Input
                type="date"
                value={newProject.dueDate}
                onChange={(e) =>
                  setNewProject({ ...newProject, dueDate: e.target.value })
                }
              />
              <Button onClick={handleAddProject}>Add Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-1">
                <h3 className="font-medium leading-none">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.client}</p>
                <p className="text-xs text-muted-foreground">
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-40">
                  <Progress value={project.progress} className="h-2" />
                </div>
                <Badge
                  variant={
                    project.status === "Completed"
                      ? "default"
                      : project.status === "Review"
                      ? "secondary"
                      : "outline"
                  }
                  className="w-24 justify-center font-normal"
                >
                  {project.status}
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingProject(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Project</DialogTitle>
                    </DialogHeader>
                    {editingProject && (
                      <div className="grid gap-4 py-4">
                        <Input
                          placeholder="Project name"
                          value={editingProject.name}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              name: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder="Course/Subject"
                          value={editingProject.client}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              client: e.target.value,
                            })
                          }
                        />
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={editingProject.progress}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              progress: Number(e.target.value),
                            })
                          }
                        />
                        <Input
                          type="date"
                          value={editingProject.dueDate}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              dueDate: e.target.value,
                            })
                          }
                        />
                        <Button onClick={handleUpdateProject}>
                          Update Project
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}