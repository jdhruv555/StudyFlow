import { BookOpen, Calendar, Target, Brain, Settings, BarChart, Timer, BookMarked } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: BarChart, url: "/" },
  { title: "Academic Planner", icon: BookOpen, url: "/academic" },
  { title: "Calendar", icon: Calendar, url: "/calendar" },
  { title: "Goals & Habits", icon: Target, url: "/goals" },
  { title: "Wellness", icon: Brain, url: "/wellness" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

// Updated quick access items to show only study-related features
const quickAccessItems = [
  { title: "Study Timer", icon: Timer, url: "/timer" },
  { title: "Study Materials", icon: BookMarked, url: "/bookmarks" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent tracking-wider uppercase mb-2">
            STUDYFLOW
          </h1>
          <p className="text-sm text-muted-foreground">Your Academic Companion</p>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url} 
                      className="flex items-center space-x-2 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-red-400" />
                      <span className="font-medium text-foreground/90">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-8 px-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">Quick Access</h2>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {quickAccessItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.url} 
                        className="flex items-center space-x-2 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-red-400" />
                        <span className="font-medium text-sm text-foreground/80">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}