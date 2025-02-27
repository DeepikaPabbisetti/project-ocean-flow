
import React from "react";
import { 
  Clock, Users, CheckCircle, AlertCircle, 
  Bell, MoreVertical, Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "./RoleBasedRoute";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Task priorities
type TaskPriority = "low" | "medium" | "high" | "urgent";

// Task status
type TaskStatus = "pending" | "in-progress" | "review" | "completed";

// Task data interface
export interface TaskData {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedTo: {
    id: string;
    name: string;
    avatar: string;
    role: UserRole;
  }[];
  project?: {
    id: string;
    name: string;
  };
  createdAt: string;
}

interface TaskCardProps {
  task: TaskData;
  className?: string;
}

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  high: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
};

const statusColors: Record<TaskStatus, string> = {
  pending: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300",
  "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  review: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
};

const statusIcons: Record<TaskStatus, React.ReactNode> = {
  pending: <Clock className="h-3 w-3" />,
  "in-progress": <Users className="h-3 w-3" />,
  review: <AlertCircle className="h-3 w-3" />,
  completed: <CheckCircle className="h-3 w-3" />
};

const TaskCard = ({ task, className }: TaskCardProps) => {
  // Calculate days left
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const isOverdue = diffDays < 0;
  
  return (
    <div className={cn(
      "glass-card subtle-shadow hover-scale rounded-xl p-5 transition-all",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <div className="flex space-x-2">
            <Badge variant="outline" className={cn("text-xs font-medium", priorityColors[task.priority])}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            
            <Badge variant="outline" className={cn("text-xs font-medium flex items-center gap-1", statusColors[task.status])}>
              {statusIcons[task.status]}
              <span>{task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}</span>
            </Badge>
          </div>
          
          <h3 className="font-medium text-base">{task.title}</h3>
          
          {task.project && (
            <span className="text-xs text-muted-foreground">
              {task.project.name}
            </span>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted/50 transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Task</DropdownMenuItem>
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuItem>Reassign</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {task.assignedTo.slice(0, 3).map((user) => (
            <div 
              key={user.id}
              className="h-8 w-8 rounded-full border-2 border-background bg-cover bg-center"
              style={{ backgroundImage: `url(${user.avatar})` }}
              title={user.name}
            ></div>
          ))}
          
          {task.assignedTo.length > 3 && (
            <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
              +{task.assignedTo.length - 3}
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          {isOverdue ? (
            <div className="flex items-center text-xs text-destructive font-medium">
              <Bell className="mr-1 h-3 w-3" />
              Overdue by {Math.abs(diffDays)} day{Math.abs(diffDays) !== 1 ? 's' : ''}
            </div>
          ) : (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {diffDays === 0 ? 'Due today' : `${diffDays} day${diffDays !== 1 ? 's' : ''} left`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
