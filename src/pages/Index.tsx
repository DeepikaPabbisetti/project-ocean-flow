
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  LayoutDashboard, 
  ListTodo, 
  FolderKanban, 
  Users, 
  BarChart3 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Features section data
  const features = [
    {
      icon: LayoutDashboard,
      title: "Intuitive Dashboard",
      description: "Get a comprehensive overview of all projects and tasks at a glance with customizable views."
    },
    {
      icon: ListTodo,
      title: "Task Management",
      description: "Create, assign, and track tasks with advanced filtering, sorting, and prioritization."
    },
    {
      icon: FolderKanban,
      title: "Project Tracking",
      description: "Manage projects from inception to completion with timelines, milestones, and resource allocation."
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Store client information, track communication, and link clients to their respective projects."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Generate detailed reports and visualize key metrics to track productivity and performance."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(180,200,255,0.3),transparent_60%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(180,220,255,0.3),transparent_60%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Blue Marlin System</span>
              <span className="block mt-2 text-bms-600 dark:text-bms-400">Project Management Reimagined</span>
            </h1>
            
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              A comprehensive task and project management system with user roles, real-time tracking, analytics, and collaboration tools.
            </p>
            
            <div className="mt-10 flex justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')}
                className="group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold"
            >
              Powerful Features
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="mt-4 text-muted-foreground max-w-3xl mx-auto"
            >
              Everything you need to manage projects, tasks, and teams efficiently in one unified platform.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card subtle-shadow hover-scale rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-card subtle-shadow rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to improve your workflow?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of teams who use Blue Marlin System to streamline their project management and boost productivity.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="group"
            >
              Start Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-semibold">Blue Marlin System</span>
            <p className="text-sm text-muted-foreground mt-2">© 2023 BMS. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
