
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "employer" | "admin";
  status: "active" | "inactive";
  joined: string;
  avatar?: string;
}
