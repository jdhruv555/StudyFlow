import { BookOpen, Calendar, Target, Brain, Settings, BarChart, Timer, BookMarked, LogIn, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { toast } from "sonner";

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  toast.error('Authentication configuration error');
}

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

const menuItems = [
  { title: "Dashboard", icon: BarChart, url: "/" },
  { title: "Academic Planner", icon: BookOpen, url: "/academic" },
  { title: "Calendar", icon: Calendar, url: "/calendar" },
  { title: "Goals & Habits", icon: Target, url: "/goals" },
  { title: "Wellness", icon: Brain, url: "/wellness" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

const quickAccessItems = [
  { title: "Study Timer", icon: Timer, url: "/timer" },
  { title: "Study Materials", icon: BookMarked, url: "/bookmarks" },
];

export function AppSidebar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

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

        <div className="mt-auto px-6 pb-6">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 text-red-400" />
              <span className="font-medium text-foreground/90">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="w-full flex items-center space-x-2 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
            >
              <LogIn className="h-5 w-5 text-red-400" />
              <span className="font-medium text-foreground/90">Login</span>
            </Link>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}