
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays, Users, Briefcase, GraduationCap } from "lucide-react";

const AdminStatistics = () => {
  // Mock data for statistics
  const stats = [
    { title: "Total Users", value: "1,284", icon: Users, change: "+8.2%", changeType: "positive" },
    { title: "New Jobs", value: "142", icon: Briefcase, change: "+12.5%", changeType: "positive" },
    { title: "Applications", value: "583", icon: CalendarDays, change: "+24.3%", changeType: "positive" },
    { title: "Placements", value: "78", icon: GraduationCap, change: "+18.9%", changeType: "positive" }
  ];

  // Mock data for charts
  const usersData = [
    { month: 'Jan', count: 400 },
    { month: 'Feb', count: 480 },
    { month: 'Mar', count: 550 },
    { month: 'Apr', count: 580 },
    { month: 'May', count: 620 },
    { month: 'Jun', count: 700 },
    { month: 'Jul', count: 780 },
    { month: 'Aug', count: 820 },
    { month: 'Sep', count: 880 },
    { month: 'Oct', count: 950 },
    { month: 'Nov', count: 1050 },
    { month: 'Dec', count: 1200 },
  ];

  const applicationsData = [
    { month: 'Jan', students: 65, employers: 28 },
    { month: 'Feb', students: 72, employers: 32 },
    { month: 'Mar', students: 83, employers: 37 },
    { month: 'Apr', students: 78, employers: 35 },
    { month: 'May', students: 88, employers: 42 },
    { month: 'Jun', students: 95, employers: 48 },
    { month: 'Jul', students: 102, employers: 55 },
    { month: 'Aug', students: 110, employers: 58 },
    { month: 'Sep', students: 118, employers: 62 },
    { month: 'Oct', students: 125, employers: 68 },
    { month: 'Nov', students: 132, employers: 72 },
    { month: 'Dec', students: 141, employers: 78 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className={`mt-2 text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={usersData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={applicationsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="students" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="employers" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatistics;
