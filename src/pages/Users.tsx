
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, updateUserStatus, updateUserRole } from '@/services/userService';
import { User } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { MoreHorizontal, UserCog, UserMinus, UserPlus, School, Briefcase, Shield } from 'lucide-react';
import ProfilePicture from '@/components/profile/ProfilePicture';

export default function Users() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogAction, setDialogAction] = useState<'status' | 'role'>('status');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<'student' | 'employer' | 'admin'>('student');
  const [newStatus, setNewStatus] = useState<'active' | 'inactive'>('active');

  // Fetch users
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Update user status mutation
  const updateStatusMutation = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'User status updated',
        description: `User status has been updated to ${newStatus}`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error updating user status',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    },
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'User role updated',
        description: `User role has been updated to ${newRole}`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error updating user role',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    },
  });

  const handleStatusChange = (user: User, status: 'active' | 'inactive') => {
    setSelectedUser(user);
    setNewStatus(status);
    setDialogAction('status');
    setDialogOpen(true);
  };

  const handleRoleChange = (user: User, role: 'student' | 'employer' | 'admin') => {
    setSelectedUser(user);
    setNewRole(role);
    setDialogAction('role');
    setDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedUser) return;

    if (dialogAction === 'status') {
      updateStatusMutation.mutate({ userId: selectedUser.id, status: newStatus });
    } else {
      updateRoleMutation.mutate({ userId: selectedUser.id, role: newRole });
    }

    setDialogOpen(false);
  };

  const handleUserUpdate = (updatedUser: User) => {
    queryClient.setQueryData(['users'], (oldData: User[] | undefined) => {
      if (!oldData) return [updatedUser];
      return oldData.map(user => user.id === updatedUser.id ? updatedUser : user);
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <School className="h-4 w-4 mr-1" />;
      case 'employer':
        return <Briefcase className="h-4 w-4 mr-1" />;
      case 'admin':
        return <Shield className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading users...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen">Error loading users</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex items-center w-fit">
                    {getRoleIcon(user.role)}
                    <span className="capitalize">{user.role}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${
                      user.status === 'active' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    <span className="capitalize">{user.status}</span>
                  </Badge>
                </TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => {
                          const updatedUser = { ...user };
                          setSelectedUser(updatedUser);
                        }}
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem onClick={() => handleRoleChange(user, 'student')}>
                        <School className="mr-2 h-4 w-4" />
                        Set as Student
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(user, 'employer')}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        Set as Employer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(user, 'admin')}>
                        <Shield className="mr-2 h-4 w-4" />
                        Set as Admin
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      {user.status === 'active' ? (
                        <DropdownMenuItem onClick={() => handleStatusChange(user, 'inactive')}>
                          <UserMinus className="mr-2 h-4 w-4" />
                          Deactivate User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleStatusChange(user, 'active')}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Activate User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            
            <div className="flex flex-col items-center mb-6">
              <ProfilePicture user={selectedUser} onUpdate={handleUserUpdate} />
              <h3 className="text-lg font-semibold mt-4">{selectedUser.name}</h3>
              <p className="text-gray-600">{selectedUser.email}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Role</h4>
                <p>{selectedUser.role}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <p>{selectedUser.status}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Joined</h4>
                <p>{selectedUser.joined}</p>
              </div>
              
              {selectedUser.bio && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                  <p>{selectedUser.bio}</p>
                </div>
              )}
              
              {selectedUser.location && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p>{selectedUser.location}</p>
                </div>
              )}
              
              {selectedUser.skills && selectedUser.skills.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedUser.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogAction === 'status' 
                ? `${newStatus === 'active' ? 'Activate' : 'Deactivate'} User`
                : 'Change User Role'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogAction === 'status'
                ? `Are you sure you want to ${
                    newStatus === 'active' ? 'activate' : 'deactivate'
                  } this user? ${
                    newStatus === 'inactive'
                      ? 'They will no longer be able to login or use the platform.'
                      : 'They will regain access to the platform.'
                  }`
                : `Are you sure you want to change this user's role to ${newRole}? This will change their permissions and access level.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              {dialogAction === 'status'
                ? newStatus === 'active'
                  ? 'Activate'
                  : 'Deactivate'
                : 'Change Role'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
