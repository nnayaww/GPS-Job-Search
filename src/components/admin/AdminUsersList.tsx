
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { fetchUsers, updateUserStatus, updateUserRole } from "@/services/userService";
import { User as UserType } from "@/types/user";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminUsersList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    userId: number;
    action: "status" | "role";
    value: string;
    userName: string;
  } | null>(null);

  // Fetch users data
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  });

  // Mutation for updating user status
  const statusMutation = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      // Refresh the users data after mutation
      queryClient.invalidateQueries({ queryKey: ["users"] });
      
      if (pendingAction) {
        toast({
          title: "User status updated",
          description: `${pendingAction.userName}'s status is now ${pendingAction.value}.`,
        });
      }
      
      setActionDialogOpen(false);
      setPendingAction(null);
    }
  });

  // Mutation for updating user role
  const roleMutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      // Refresh the users data after mutation
      queryClient.invalidateQueries({ queryKey: ["users"] });
      
      if (pendingAction) {
        toast({
          title: "User role updated",
          description: `${pendingAction.userName}'s role is now ${pendingAction.value}.`,
        });
      }
      
      setActionDialogOpen(false);
      setPendingAction(null);
    }
  });

  const confirmAction = () => {
    if (!pendingAction) return;
    
    if (pendingAction.action === "status") {
      statusMutation.mutate({
        userId: pendingAction.userId,
        status: pendingAction.value as "active" | "inactive"
      });
    } else if (pendingAction.action === "role") {
      roleMutation.mutate({
        userId: pendingAction.userId,
        role: pendingAction.value as "student" | "employer" | "admin"
      });
    }
  };

  const handleStatusChange = (user: UserType) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    setPendingAction({
      userId: user.id,
      action: "status",
      value: newStatus,
      userName: user.name
    });
    setActionDialogOpen(true);
  };

  const handleRoleChange = (user: UserType, newRole: "student" | "employer" | "admin") => {
    setPendingAction({
      userId: user.id,
      action: "role",
      value: newRole,
      userName: user.name
    });
    setActionDialogOpen(true);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading users...</div>;
  }

  if (error) {
    return <div className="text-destructive py-8">Error loading users: {error.toString()}</div>;
  }

  return (
    <>
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
                      <DropdownMenuItem onClick={() => handleStatusChange(user)}>
                        <Ban className="mr-2 h-4 w-4" />
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(user, "student")}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Set as Student
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(user, "employer")}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Set as Employer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(user, "admin")}>
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

      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              {pendingAction?.action === "status" && (
                `Are you sure you want to ${pendingAction.value === "active" ? "activate" : "deactivate"} ${pendingAction.userName}?`
              )}
              {pendingAction?.action === "role" && (
                `Are you sure you want to change ${pendingAction.userName}'s role to ${pendingAction.value}?`
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={confirmAction}
              disabled={statusMutation.isPending || roleMutation.isPending}
            >
              {(statusMutation.isPending || roleMutation.isPending) ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminUsersList;
