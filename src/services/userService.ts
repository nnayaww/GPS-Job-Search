
import { User } from "@/types/user";

// Base API URL - would come from environment variables in a real app
const API_BASE_URL = "/api";

export interface UpdateUserStatusRequest {
  userId: number;
  status: "active" | "inactive";
}

export interface UpdateUserRoleRequest {
  userId: number;
  role: "student" | "employer" | "admin";
}

// Mock API implementation with simulated delay
// In production, this would use fetch() or axios to make real API calls
export const fetchUsers = async (): Promise<User[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo purposes, return mock data
  // In production, this would be a real API call
  return [
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
};

export const updateUserStatus = async ({ userId, status }: UpdateUserStatusRequest): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In production, this would make a real API call and return updated user
  // For now, we'll just mock a successful response
  return {
    id: userId,
    name: "Mock User",
    email: "user@example.com",
    role: "student",
    status: status,
    joined: new Date().toISOString().split('T')[0],
    avatar: `https://i.pravatar.cc/150?u=${userId}`
  };
};

export const updateUserRole = async ({ userId, role }: UpdateUserRoleRequest): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In production, this would make a real API call and return updated user
  // For now, we'll just mock a successful response
  return {
    id: userId,
    name: "Mock User",
    email: "user@example.com",
    role: role,
    status: "active",
    joined: new Date().toISOString().split('T')[0],
    avatar: `https://i.pravatar.cc/150?u=${userId}`
  };
};
