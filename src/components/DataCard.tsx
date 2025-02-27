
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DataCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const DataCard = ({ title, value, icon: Icon, trend, className }: DataCardProps) => {
  return (
    <div className={cn(
      "glass-card subtle-shadow rounded-xl p-6 flex flex-col",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base font-medium text-muted-foreground">{title}</h3>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        
        {trend && (
          <div className={cn(
            "flex items-center text-sm",
            trend.isPositive ? "text-green-500" : "text-destructive"
          )}>
            <span>{trend.isPositive ? "+" : ""}{trend.value}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCard;
