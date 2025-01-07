import { Stats } from "@/components/dashboard/Stats";
import { ProjectList } from "@/components/dashboard/ProjectList";

const Index = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your projects and performance
        </p>
      </div>
      <Stats />
      <ProjectList />
    </div>
  );
};

export default Index;