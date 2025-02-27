
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ListTodo, Plus, Filter, 
  Search, ArrowUpDown, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from "@/components/PageTransition";
import TaskCard, { TaskData } from "@/components/TaskCard";

// Mock data for tasks (expanded from Dashboard)
const mockTasks: TaskData[] = [
  {
    id: "task-1",
    title: "Update client dashboard",
    description: "Implement new analytics features and improve performance of the dashboard for client XYZ.",
    priority: "high",
    status: "in-progress",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    assignedTo: [
      {
        id: "user-1",
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "consultant"
      },
      {
        id: "user-2",
        name: "Emily Davis",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        role: "associate"
      }
    ],
    project: {
      id: "proj-1",
      name: "Client XYZ Portal"
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  {
    id: "task-2",
    title: "Prepare quarterly report",
    description: "Gather data and prepare the Q2 performance report for the management team.",
    priority: "urgent",
    status: "pending",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    assignedTo: [
      {
        id: "user-1",
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "consultant"
      }
    ],
    project: {
      id: "proj-2",
      name: "Quarterly Reporting"
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: "task-3",
    title: "Client meeting preparation",
    description: "Prepare slides and talking points for the upcoming client presentation.",
    priority: "medium",
    status: "pending",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    assignedTo: [
      {
        id: "user-3",
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        role: "manager"
      },
      {
        id: "user-4",
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        role: "consultant"
      }
    ],
    project: {
      id: "proj-3",
      name: "Client ABC Onboarding"
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: "task-4",
    title: "Update software documentation",
    description: "Review and update the user manual and API documentation for the latest release.",
    priority: "low",
    status: "review",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    assignedTo: [
      {
        id: "user-5",
        name: "Robert Lee",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        role: "associate"
      }
    ],
    project: {
      id: "proj-1",
      name: "Client XYZ Portal"
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    id: "task-5",
    title: "Code review for new feature",
    description: "Review pull request #42 for the new search functionality.",
    priority: "medium",
    status: "in-progress",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    assignedTo: [
      {
        id: "user-1",
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "consultant"
      },
      {
        id: "user-3",
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        role: "manager"
      }
    ],
    project: {
      id: "proj-1",
      name: "Client XYZ Portal"
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: "task-6",
    title: "Prepare training materials",
    description: "Create slides and exercises for the upcoming client training session.",
    priority: "high",
    status: "completed",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago (completed)
    assignedTo: [
      {
        id: "user-4",
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        role: "consultant"
      }
    ],
    project: {
      id: "proj-3",
      name: "Client ABC Onboarding"
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
  },
  {
    id: "task-7",
    title: "Setup development environment",
    description: "Configure and document the development environment setup for the new team members.",
    priority: "medium",
    status: "completed",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago (completed)
    assignedTo: [
      {
        id: "user-5",
        name: "Robert Lee",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        role: "associate"
      }
    ],
    project: {
      id: "proj-2",
      name: "Quarterly Reporting"
    },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
  }
];

const Tasks = () => {
  const navigate = useNavigate();
  const [sidebarWidth] = useState(280); // This would be dynamic
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Filter tasks based on search, priorities, and statuses
  const filterTasks = (tasks: TaskData[]) => {
    return tasks.filter(task => {
      // Search filter
      const matchesSearch = 
        searchQuery === "" || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Priority filter
      const matchesPriority = 
        selectedPriorities.length === 0 || 
        selectedPriorities.includes(task.priority);
      
      // Status filter
      const matchesStatus = 
        selectedStatuses.length === 0 || 
        selectedStatuses.includes(task.status);
      
      return matchesSearch && matchesPriority && matchesStatus;
    });
  };
  
  // Sort tasks
  const sortTasks = (tasks: TaskData[]) => {
    return [...tasks].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "dueDate":
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case "priority":
          const priorityOrder = { low: 0, medium: 1, high: 2, urgent: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "status":
          const statusOrder = { pending: 0, "in-progress": 1, review: 2, completed: 3 };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
  };
  
  // Filter and sort the tasks
  const filteredAndSortedTasks = sortTasks(filterTasks(mockTasks));
  
  // Separate tasks by status for the tab view
  const pendingTasks = filteredAndSortedTasks.filter(task => task.status === "pending");
  const inProgressTasks = filteredAndSortedTasks.filter(task => task.status === "in-progress");
  const reviewTasks = filteredAndSortedTasks.filter(task => task.status === "review");
  const completedTasks = filteredAndSortedTasks.filter(task => task.status === "completed");
  
  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  
  // Handle priority filter changes
  const togglePriorityFilter = (priority: string) => {
    setSelectedPriorities(prev => 
      prev.includes(priority)
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };
  
  // Handle status filter changes
  const toggleStatusFilter = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedPriorities([]);
    setSelectedStatuses([]);
    setSearchQuery("");
  };

  return (
    <PageTransition>
      <div 
        className="min-h-screen pt-16 transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <div className="page-container">
          <div className="section-heading">
            <div>
              <h1 className="flex items-center">
                <ListTodo className="mr-2 h-6 w-6 text-muted-foreground" />
                Tasks
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and track all your tasks
              </p>
            </div>
            
            <Button 
              onClick={() => navigate('/tasks/new')}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>New Task</span>
            </Button>
          </div>

          {/* Filters and search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tasks..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    {(selectedPriorities.length > 0 || selectedStatuses.length > 0) && (
                      <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                        {selectedPriorities.length + selectedStatuses.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <div className="text-sm font-medium mb-1">Priority</div>
                    <DropdownMenuCheckboxItem
                      checked={selectedPriorities.includes("urgent")}
                      onCheckedChange={() => togglePriorityFilter("urgent")}
                    >
                      Urgent
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedPriorities.includes("high")}
                      onCheckedChange={() => togglePriorityFilter("high")}
                    >
                      High
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedPriorities.includes("medium")}
                      onCheckedChange={() => togglePriorityFilter("medium")}
                    >
                      Medium
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedPriorities.includes("low")}
                      onCheckedChange={() => togglePriorityFilter("low")}
                    >
                      Low
                    </DropdownMenuCheckboxItem>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <div className="text-sm font-medium mb-1">Status</div>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatuses.includes("pending")}
                      onCheckedChange={() => toggleStatusFilter("pending")}
                    >
                      Pending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatuses.includes("in-progress")}
                      onCheckedChange={() => toggleStatusFilter("in-progress")}
                    >
                      In Progress
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatuses.includes("review")}
                      onCheckedChange={() => toggleStatusFilter("review")}
                    >
                      Review
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatuses.includes("completed")}
                      onCheckedChange={() => toggleStatusFilter("completed")}
                    >
                      Completed
                    </DropdownMenuCheckboxItem>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "dueDate"}
                    onCheckedChange={() => setSortBy("dueDate")}
                  >
                    Due Date
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "priority"}
                    onCheckedChange={() => setSortBy("priority")}
                  >
                    Priority
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "title"}
                    onCheckedChange={() => setSortBy("title")}
                  >
                    Title
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "status"}
                    onCheckedChange={() => setSortBy("status")}
                  >
                    Status
                  </DropdownMenuCheckboxItem>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full gap-1"
                      onClick={toggleSortDirection}
                    >
                      <ArrowUpDown className="h-4 w-4" />
                      {sortDirection === "asc" ? "Ascending" : "Descending"}
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Applied filters display */}
          {(selectedPriorities.length > 0 || selectedStatuses.length > 0 || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>Search: {searchQuery}</span>
                  <button 
                    className="ml-1 hover:text-primary"
                    onClick={() => setSearchQuery("")}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {selectedPriorities.map(priority => (
                <Badge key={priority} variant="secondary" className="flex items-center gap-1">
                  <span>Priority: {priority}</span>
                  <button 
                    className="ml-1 hover:text-primary"
                    onClick={() => togglePriorityFilter(priority)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
              
              {selectedStatuses.map(status => (
                <Badge key={status} variant="secondary" className="flex items-center gap-1">
                  <span>Status: {status.replace('-', ' ')}</span>
                  <button 
                    className="ml-1 hover:text-primary"
                    onClick={() => toggleStatusFilter(status)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6"
                onClick={clearFilters}
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Task listing with tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mb-6 grid grid-cols-5 sm:w-[600px]">
              <TabsTrigger value="all" className="relative">
                All
                <Badge variant="secondary" className="ml-1">
                  {filteredAndSortedTasks.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                <Badge variant="secondary" className="ml-1">
                  {pendingTasks.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="in-progress">