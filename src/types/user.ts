
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "employer" | "admin";
  status: "active" | "inactive";
  joined: string;
  avatar?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  education?: Education[];
  experience?: Experience[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}
