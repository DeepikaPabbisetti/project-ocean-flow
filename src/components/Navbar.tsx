
import React from "react";
import { Bell, Search, Moon, Sun } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { useAuth } from "./RoleBasedRoute";

interface NavbarProps {
  sidebarWidth: number;
}

const Navbar = ({ sidebarWidth }: NavbarProps) => {
  const [darkMode, setDarkMode] = React.useState(false);
  const { user } = useAuth();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header 
      className="h-16 fixed top-0 right-0 z-20 glass-nav w-full transition-all duration-300"
      style={{ width: `calc(100% - ${sidebarWidth}px)` }}
    >
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-[280px] rounded-full bg-secondary/80 px-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode}
            className="rounded-full p-2 hover:bg-secondary/80 transition-colors"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button className="relative rounded-full p-2 hover:bg-secondary/80 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </button>
          
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
