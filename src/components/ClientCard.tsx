
import React from "react";
import { 
  Building2, Mail, Phone, MapPin, 
  MoreVertical, Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export interface ClientData {
  id: string;
  name: string;
  logo?: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  projects: number;
  status: "active" | "inactive";
  joinedDate: string;
}

interface ClientCardProps {
  client: ClientData;
  className?: string;
}

const ClientCard = ({ client, className }: ClientCardProps) => {
  // Format date
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
        <div className="flex items-center">
          {client.logo ? (
            <div 
              className="h-12 w-12 rounded-md bg-cover bg-center"
              style={{ backgroundImage: `url(${client.logo})` }}
            ></div>
          ) : (
            <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          
          <div className="ml-3">
            <h3 className="font-medium text-base">{client.name}</h3>
            <Badge variant={client.status === 'active' ? 'default' : 'secondary'} className="mt-1">
              {client.status}
            </Badge>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted/50 transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Client</DropdownMenuItem>
            <DropdownMenuItem>View Projects</DropdownMenuItem>
            <DropdownMenuItem>Send Email</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete Client</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 text-muted-foreground mr-2" />
          <span>{client.email}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 text-muted-foreground mr-2" />
          <span>{client.phone}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
          <span className="line-clamp-1">{client.address}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm border-t pt-4">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Joined {formatDate(client.joinedDate)}</span>
        </div>
        
        <div>
          <Badge variant="outline" className="bg-bms-100 text-bms-700 dark:bg-bms-900/30 dark:text-bms-300">
            {client.projects} Project{client.projects !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
