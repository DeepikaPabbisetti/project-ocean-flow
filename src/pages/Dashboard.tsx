
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, ListTodo, FolderKanban, 
  Users, Clock, CalendarClock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import DataCard from "@/components/DataCard";
import ChartComponent from "@/components/ChartComponent";
import TaskCard, { TaskData } from "@/components/TaskCard";
import ProjectCard, { ProjectData } from "@/components/ProjectCard";

// Mock data for tasks
const recentTasks: TaskData[] = [
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
  }
];

// Mock data for projects
const activeProjects: ProjectData[] = [
  {
    id: "proj-1",
    name: "Client XYZ Portal",
    description: "Development of a customer portal with analytics dashboard for XYZ Corp.",
    status: "active",
    progress: 65,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
    client: {
      id: "client-1",
      name: "XYZ Corporation"
    },
    team: [
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
      },
      {
        id: "user-3",
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        role: "manager"
      }
    ],
    tasksTotal: 24,
    tasksCompleted: 15
  },
  {
    id: "proj-3",
    name: "Client ABC Onboarding",
    description: "Implementation of new systems and training for ABC Inc.",
    status: "active",
    progress: 30,
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
    client: {
      id: "client-2",
      name: "ABC Inc."
    },
    team: [
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
    tasksTotal: 18,
    tasksCompleted: 5
  }
];

// Chart data
const taskCompletionData = [
  { name: 'Mon', completed: 5, pending: 2 },
  { name: 'Tue', completed: 7, pending: 3 },
  { name: 'Wed', completed: 4, pending: 6 },
  { name: 'Thu', completed: 8, pending: 2 },
  { name: 'Fri', completed: 9, pending: 1 },
  { name: 'Sat', completed: 3, pending: 1 },
  { name: 'Sun', completed: 1, pending: 0 },
];

const projectStatusData = [
  { name: 'Planning', value: 3 },
  { name: 'Active', value: 5 },
  { name: 'On Hold', value: 2 },
  { name: 'Completed', value: 8 },
];

const timeTrackingData = [
  { name: 'Week 1', billable: 32, nonBillable: 8 },
  { name: 'Week 2', billable: 36, nonBillable: 6 },
  { name: 'Week 3', billable: 30, nonBillable: 10 },
  { name: 'Week 4', billable: 34, nonBillable: 7 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarWidth] = useState(280); // This will eventually be dynamic based on sidebar state

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
                <LayoutDashboard className="mr-2 h-6 w-6 text-muted-foreground" />
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Overview of your projects, tasks, and performance
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={() => navigate('/tasks/new')}
                className="gap-1"
              >
                <ListTodo className="h-4 w-4" />
                <span>New Task</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/projects/new')}
                className="gap-1"
              >
                <FolderKanban className="h-4 w-4" />
                <span>New Project</span>
              </Button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DataCard
              title="Active Projects"
              value="12"
              icon={FolderKanban}
              trend={{ value: 8, isPositive: true }}
            />
            
            <DataCard
              title="Pending Tasks"
              value="28"
              icon={ListTodo}
              trend={{ value: 5, isPositive: false }}
            />
            
            <DataCard
              title="Active Clients"
              value="9"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            
            <DataCard
              title="Hours Logged (Week)"
              value="145"
              icon={Clock}
              trend={{ value: 3, isPositive: true }}
            />
          </div>

          {/* Charts section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartComponent
              title="Task Completion"
              description="Daily task completion status for the current week"
              data={taskCompletionData}
              type="bar"
              dataKeys={['completed', 'pending']}
              xAxisKey="name"
            />
            
            <ChartComponent
              title="Projects by Status"
              description="Distribution of projects by their current status"
              data={projectStatusData}
              type="pie"
              dataKeys={['value']}
              xAxisKey="name"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <ChartComponent
              title="Time Tracking"
              description="Billable vs non-billable hours over the past month"
              data={timeTrackingData}
              type="area"
              dataKeys={['billable', 'nonBillable']}
              xAxisKey="name"
            />
          </div>

          {/* Task and Project Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium flex items-center">
                  <ListTodo className="mr-2 h-5 w-5 text-muted-foreground" />
                  Recent Tasks
                </h2>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/tasks')}
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium flex items-center">
                  <FolderKanban className="mr-2 h-5 w-5 text-muted-foreground" />
                  Active Projects
                </h2>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/projects')}
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {activeProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming section */}
          <div className="mt-8 glass-card subtle-shadow rounded-xl p-6">
            <h2 className="text-xl font-medium flex items-center mb-5">
              <CalendarClock className="mr-2 h-5 w-5 text-muted-foreground" />
              Upcoming Deadlines
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Task/Project</th>
                    <th className="text-left py-3 px-4 font-medium">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Assigned To</th>
                    <th className="text-left py-3 px-4 font-medium">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTasks.map(task => (
                    <tr key={task.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{task.title}</td>
                      <td className="py-3 px-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4 capitalize">{task.status.replace('-', ' ')}</td>
                      <td className="py-3 px-4">
                        <div className="flex -space-x-2">
                          {task.assignedTo.map(user => (
                            <div 
                              key={user.id}
                              className="h-8 w-8 rounded-full border-2 border-background bg-cover bg-center"
                              style={{ backgroundImage: `url(${user.avatar})` }}
                              title={user.name}
                            ></div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize">{task.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
