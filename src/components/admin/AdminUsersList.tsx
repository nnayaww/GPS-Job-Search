
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, User, Mail, Ban, UserCog, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "student",
    status: "active",
    joined: "2023-03-15",
    avatar: "https://i.pravatar.cc/150?u=alex.johnson@example.com"
  },
  {
    id: 2,
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    role: "employer",
    status: "active",
    joined: "2023-02-28",
    avatar: "https://i.pravatar.cc/150?u=sarah.miller@example.com"
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "student",
    status: "inactive",
    joined: "2023-04-10",
    avatar: "https://i.pravatar.cc/150?u=james.wilson@example.com"
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    role: "student",
    status: "active",
    joined: "2023-01-20",
    avatar: "https://i.pravatar.cc/150?u=emma.davis@example.com"
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "employer",
    status: "active",
    joined: "2023-03-05",
    avatar: "https://i.pravatar.cc/150?u=michael.brown@example.com"
  },
  {
    id: 6,
    name: "David Clark",
    email: "david.clark@example.com",
    role: "admin",
    status: "active",
    joined: "2022-11-18",
    avatar: "https://i.pravatar.cc/150?u=david.clark@example.com"
  }
];

const AdminUsersList = () => {
  const [users, setUsers] = useState(mockUsers);
  const { toast } = useToast();

  const handleStatusChange = (id: number, newStatus: string) => {
    setUsers(
      users.map((user) => 
        user.id === id 
          ? { ...user, status: newStatus } 
          : user
      )
    );
    
    toast({
      title: "User status updated",
      description: `User #${id}'s status is now ${newStatus}.`,
    });
  };

  const handleRoleChange = (id: number, newRole: "student" | "employer" | "admin") => {
    setUsers(
      users.map((user) => 
        user.id === id 
          ? { ...user, role: newRole } 
          : user
      )
    );
    
    toast({
      title: "User role updated",
      description: `User #${id}'s role is now ${newRole}.`,
    });
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    user.role === "admin" 
                      ? "default" 
                      : user.role === "employer" 
                        ? "outline" 
                        : "secondary"
                  }
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={user.status === "active" ? "outline" : "destructive"}
                  className={user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-200" : undefined}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      View profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send email
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(user.id, user.status === "active" ? "inactive" : "active")}>
                      <Ban className="mr-2 h-4 w-4" />
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleChange(user.id, "student")}>
                      <UserCog className="mr-2 h-4 w-4" />
                      Set as Student
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleChange(user.id, "employer")}>
                      <UserCog className="mr-2 h-4 w-4" />
                      Set as Employer
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleChange(user.id, "admin")}>
                      <ShieldAlert className="mr-2 h-4 w-4" />
                      Set as Admin
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsersList;
