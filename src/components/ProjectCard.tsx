
import React from "react";
import { 
  Clock, CheckCircle, ArrowRight, 
  MoreVertical
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
import { Progress } from "@/components/ui/progress";

export type ProjectStatus = "planning" | "active" | "on-hold" | "completed";

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  endDate: string;
  client?: {
    id: string;
    name: string;
  };
  team: {
    id: string;
    name: string;
    avatar: string;
    role: UserRole;
  }[];
  tasksTotal: number;
  tasksCompleted: number;
}

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
}

const statusColors: Record<ProjectStatus, string> = {
  planning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  "on-hold": "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
};

const statusIcons: Record<ProjectStatus, React.ReactNode> = {
  planning: <Clock className="h-3 w-3" />,
  active: <Clock className="h-3 w-3" />,
  "on-hold": <Clock className="h-3 w-3" />,
  completed: <CheckCircle className="h-3 w-3" />
};

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className={cn(
      "glass-card subtle-shadow hover-scale rounded-xl p-5 transition-all",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <Badge variant="outline" className={cn("text-xs font-medium flex items-center gap-1", statusColors[project.status])}>
            {statusIcons[project.status]}
            <span>{project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}</span>
          </Badge>
          
          <h3 className="font-medium text-base">{project.name}</h3>
          
          {project.client && (
            <span className="text-xs text-muted-foreground">
              Client: {project.client.name}
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
            <DropdownMenuItem>Edit Project</DropdownMenuItem>
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuItem>View Tasks</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Archive Project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {project.description}
      </p>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        
        <Progress value={project.progress} className="h-2" />
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>Tasks: {project.tasksCompleted}/{project.tasksTotal}</div>
          <div>
            {formatDate(project.startDate)} <ArrowRight className="inline h-3 w-3 mx-1" /> {formatDate(project.endDate)}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex -space-x-2">
          {project.team.slice(0, 4).map((member) => (
            <div 
              key={member.id}
              className="h-8 w-8 rounded-full border-2 border-background bg-cover bg-center"
              style={{ backgroundImage: `url(${member.avatar})` }}
              title={member.name}
            ></div>
          ))}
          
          {project.team.length > 4 && (
            <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
              +{project.team.length - 4}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
