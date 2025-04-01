
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

export interface UpdateUserProfileRequest {
  userId: number;
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
  skills?: string[];
}

export interface UpdateUserAvatarRequest {
  userId: number;
  avatarFile: File;
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
      avatar: "https://i.pravatar.cc/150?u=alex.johnson@example.com",
      bio: "Computer Science graduate with a passion for web development.",
      location: "San Francisco, CA",
      skills: ["JavaScript", "React", "Node.js"]
    },
    {
      id: 2,
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
      role: "employer",
      status: "active",
      joined: "2023-02-28",
      avatar: "https://i.pravatar.cc/150?u=sarah.miller@example.com",
      bio: "HR Manager at TechCorp Solutions",
      location: "New York, NY"
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james.wilson@example.com",
      role: "student",
      status: "inactive",
      joined: "2023-04-10",
      avatar: "https://i.pravatar.cc/150?u=james.wilson@example.com",
      bio: "Recent graduate seeking opportunities in data analysis",
      location: "Chicago, IL",
      skills: ["Python", "SQL", "Data Visualization"]
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@example.com",
      role: "student",
      status: "active",
      joined: "2023-01-20",
      avatar: "https://i.pravatar.cc/150?u=emma.davis@example.com",
      bio: "Marketing student with design skills",
      location: "Austin, TX",
      skills: ["Marketing", "Photoshop", "Social Media"]
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "employer",
      status: "active",
      joined: "2023-03-05",
      avatar: "https://i.pravatar.cc/150?u=michael.brown@example.com",
      bio: "Technical Recruiter at Global Marketing Inc.",
      location: "Seattle, WA"
    },
    {
      id: 6,
      name: "David Clark",
      email: "david.clark@example.com",
      role: "admin",
      status: "active",
      joined: "2022-11-18",
      avatar: "https://i.pravatar.cc/150?u=david.clark@example.com",
      bio: "System Administrator and Developer",
      location: "Boston, MA",
      skills: ["System Administration", "DevOps", "Cloud Infrastructure"]
    }
  ];
};

export const updateUserStatus = async ({ userId, status }: UpdateUserStatusRequest): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Fetch the mock user data
  const users = await fetchUsers();
  const user = users.find(user => user.id === userId);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  // Return updated user
  return {
    ...user,
    status
  };
};

export const updateUserRole = async ({ userId, role }: UpdateUserRoleRequest): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Fetch the mock user data
  const users = await fetchUsers();
  const user = users.find(user => user.id === userId);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  // Return updated user
  return {
    ...user,
    role
  };
};

export const updateUserProfile = async (data: UpdateUserProfileRequest): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Fetch the mock user data
  const users = await fetchUsers();
  const user = users.find(user => user.id === data.userId);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  // Return updated user
  return {
    ...user,
    name: data.name || user.name,
    email: data.email || user.email,
    bio: data.bio || user.bio,
    location: data.location || user.location,
    skills: data.skills || user.skills
  };
};

export const updateUserAvatar = async ({ userId, avatarFile }: UpdateUserAvatarRequest): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Fetch the mock user data
  const users = await fetchUsers();
  const user = users.find(user => user.id === userId);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  // In a real app, we would upload the file to a server and get a URL back
  // For now, we'll just use a random avatar URL to simulate the change
  const timestamp = new Date().getTime(); // Add timestamp to force browser to reload the image
  const newAvatarUrl = `https://i.pravatar.cc/150?u=${user.email}&t=${timestamp}`;
  
  // Return updated user with new avatar URL
  return {
    ...user,
    avatar: newAvatarUrl
  };
};

// Search for jobs API
export interface JobSearchRequest {
  searchTerm?: string;
  location?: string;
  distance?: number;
  jobType?: string[];
  datePosted?: string;
  experienceLevel?: string[];
  sortBy?: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  distance: string;
  type: string;
  posted: string;
  postedDate: Date;
  salary: string;
  experienceLevel: string;
  description: string;
}

export const searchJobs = async (params: JobSearchRequest): Promise<Job[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Mock job data - in a real app, this would come from an API
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      distance: "4.2 miles away",
      type: "Full-time",
      posted: "2 days ago",
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      salary: "$80,000 - $110,000",
      experienceLevel: "mid",
      description: "We are looking for a skilled software engineer to join our growing team. The ideal candidate has experience with React, Node.js, and cloud technologies."
    },
    {
      id: 2,
      title: "Marketing Specialist",
      company: "Global Marketing Inc.",
      location: "New York, NY",
      distance: "2.7 miles away",
      type: "Full-time",
      posted: "5 days ago",
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      salary: "$60,000 - $75,000",
      experienceLevel: "entry",
      description: "Join our dynamic marketing team to develop and implement marketing strategies for our clients. Experience with digital marketing campaigns preferred."
    },
    // More jobs would be included here
  ];
  
  // This would be a real API call with parameters in production
  console.log("Searching jobs with parameters:", params);
  
  return jobs;
};
