
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import AdminJobsList from "@/components/admin/AdminJobsList";
import AdminUsersList from "@/components/admin/AdminUsersList";
import AdminStatistics from "@/components/admin/AdminStatistics";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not an admin
  if (!isAuthenticated || (user && user.role !== "admin")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full md:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Overview</CardTitle>
                <CardDescription>
                  Key metrics and statistics for the GPS Graduate Placement platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminStatistics />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Job Listings</CardTitle>
                <CardDescription>
                  Review, approve, and manage job listings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminJobsList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage students, employers and administrators.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminUsersList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
