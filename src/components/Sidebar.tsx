
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, 
  LayoutDashboard, ListTodo, FolderKanban, 
  Users, User, BarChart3, Settings, HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, UserRole } from "./RoleBasedRoute";

// Define which roles can access which menu items
const roleAccess: Record<string, UserRole[]> = {
  "/dashboard": ["admin", "manager", "consultant", "associate"],
  "/tasks": ["admin", "manager", "consultant", "associate"],
  "/projects": ["admin", "manager", "consultant"],
  "/clients": ["admin", "manager"],
  "/reports": ["admin", "manager"],
  "/profile": ["admin", "manager", "consultant", "associate"],
  "/settings": ["admin"],
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { 
      path: "/dashboard", 
      name: "Dashboard", 
      icon: LayoutDashboard 
    },
    { 
      path: "/tasks", 
      name: "Tasks", 
      icon: ListTodo 
    },
    { 
      path: "/projects", 
      name: "Projects", 
      icon: FolderKanban 
    },
    { 
      path: "/clients", 
      name: "Clients", 
      icon: Users 
    },
    { 
      path: "/reports", 
      name: "Reports", 
      icon: BarChart3 
    },
    { divider: true },
    { 
      path: "/profile", 
      name: "Profile", 
      icon: User 
    },
    { 
      path: "/settings", 
      name: "Settings", 
      icon: Settings 
    },
    { 
      path: "/help", 
      name: "Help", 
      icon: HelpCircle 
    }
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => 
    !item.path || 
    !roleAccess[item.path] || 
    roleAccess[item.path].includes(user.role)
  );

  return (
    <motion.aside
      initial={{ width: collapsed ? 80 : 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-screen fixed left-0 top-0 z-30 border-r bg-sidebar border-sidebar-border flex flex-col"
    >
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <motion.div
          initial={{ opacity: collapsed ? 0 : 1, scale: collapsed ? 0.8 : 1 }}
          animate={{ opacity: collapsed ? 0 : 1, scale: collapsed ? 0.8 : 1 }}
          transition={{ duration: 0.2 }}
          className={cn("font-semibold text-xl", collapsed && "hidden")}
        >
          Blue Marlin System
        </motion.div>
        <motion.div
          initial={{ opacity: collapsed ? 1 : 0, scale: collapsed ? 1 : 0.8 }}
          animate={{ opacity: collapsed ? 1 : 0, scale: collapsed ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className={cn("font-semibold text-xl", !collapsed && "hidden")}
        >
          BMS
        </motion.div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-sidebar-foreground/60 hover:text-sidebar-foreground p-1 rounded-full hover:bg-sidebar-accent/50 transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {filteredNavItems.map((item, index) => {
            if (item.divider) {
              return <li key={`divider-${index}`} className="border-t border-sidebar-border my-4 mx-4"></li>;
            }

            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path!}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-2 px-3 rounded-md transition-colors",
                      isActive 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )
                  }
                >
                  <item.icon!
                    size={20}
                    className={cn("shrink-0", collapsed ? "mx-auto" : "mr-3")}
                  />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div 
            className="h-8 w-8 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${user.avatar})` }}
          ></div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role}</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
