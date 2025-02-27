
import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";

// Chart types
type ChartType = "area" | "bar" | "pie";

interface ChartComponentProps {
  data: any[];
  type: ChartType;
  title: string;
  description?: string;
  className?: string;
  colors?: string[];
  dataKeys: string[];
  xAxisKey?: string;
}

const defaultColors = [
  "#0369a1", // primary
  "#38bdf8", // lighter blue
  "#0c4a6e", // darker blue
  "#6ee7b7", // teal
  "#f43f5e", // pink
  "#a855f7", // purple
];

const ChartComponent = ({
  data,
  type,
  title,
  description,
  className,
  colors = defaultColors,
  dataKeys,
  xAxisKey = "name"
}: ChartComponentProps) => {
  const renderChart = () => {
    switch (type) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                {dataKeys.map((key, index) => (
                  <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '8px',
                  border: '1px solid #eaeaea',
                }} 
              />
              {dataKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fillOpacity={1}
                  fill={`url(#color-${key})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '8px',
                  border: '1px solid #eaeaea',
                }} 
              />
              <Legend />
              {dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey={dataKeys[0]}
                nameKey={xAxisKey}
                label
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '8px',
                  border: '1px solid #eaeaea',
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "glass-card subtle-shadow rounded-xl p-6",
      className
    )}>
      <div className="mb-6">
        <h3 className="font-medium text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      {renderChart()}
    </div>
  );
};

export default ChartComponent;
