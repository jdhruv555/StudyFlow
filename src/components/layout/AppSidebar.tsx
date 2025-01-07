import { BookOpen, Calendar, Target, DollarSign, Users, BarChart, Brain, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: BarChart, url: "/" },
  { title: "Academic Planner", icon: BookOpen, url: "/academic" },
  { title: "Calendar", icon: Calendar, url: "/calendar" },
  { title: "Goals & Habits", icon: Target, url: "/goals" },
  { title: "Finances", icon: DollarSign, url: "/finances" },
  { title: "Social Hub", icon: Users, url: "/social" },
  { title: "Wellness", icon: Brain, url: "/wellness" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-primary">StudyFlow</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}