
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Role types for the BMS system
export type UserRole = "admin" | "manager" | "consultant" | "associate";

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
  redirectPath?: string;
}

// Mock authentication state (will be replaced with real auth later)
const useAuth = () => {
  // For demo purposes, pretend we're logged in as an admin
  return {
    user: {
      name: "Sample User",
      email: "user@example.com", 
      role: "admin" as UserRole,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    isAuthenticated: true
  };
};

const RoleBasedRoute = ({ 
  allowedRoles, 
  redirectPath = "/" 
}: RoleBasedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  const hasRequiredRole = allowedRoles.includes(user.role);
  
  if (!hasRequiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
export { useAuth };
