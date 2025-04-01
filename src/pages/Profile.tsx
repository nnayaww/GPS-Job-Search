
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, Briefcase, BookOpen, GraduationCap, Plus, File, Award, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Redirect if not authenticated
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved",
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-primary-foreground mt-2">
            Manage your personal information and application settings
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile sidebar */}
          <div className="md:w-1/3 lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{getInitials(user?.name || "User")}</AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  <p className="mt-1 capitalize text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {user?.role}
                  </p>
                  
                  <Button className="mt-6 w-full" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Profile Completion</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full w-[65%]"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">65% complete</p>
                  <p className="text-sm mt-2">
                    Complete your profile to increase your chances of finding the perfect opportunity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName" 
                            defaultValue={user?.name}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            defaultValue={user?.email}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            defaultValue="+1 (555) 123-4567"
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            defaultValue="San Francisco, CA"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="headline">Professional Headline</Label>
                        <Input 
                          id="headline" 
                          defaultValue="Computer Science Graduate | Web Developer"
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="about">About Me</Label>
                        <Textarea 
                          id="about" 
                          rows={5}
                          defaultValue="Recent computer science graduate with a passion for web development and UX design. Looking for opportunities to grow my skills in a dynamic team environment."
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume/CV</Label>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" className="w-full">
                            <UploadCloud className="h-4 w-4 mr-2" />
                            Upload Resume
                            <Input 
                              id="resume" 
                              type="file" 
                              className="hidden"
                              disabled={!isEditing}
                            />
                          </Button>
                          <Button variant="outline" className="flex-shrink-0">
                            <File className="h-4 w-4 mr-2" />
                            View Current
                          </Button>
                        </div>
                      </div>
                      
                      {isEditing && (
                        <div className="flex justify-end gap-4">
                          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button type="button" onClick={handleSaveProfile}>
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Education</CardTitle>
                      <CardDescription>
                        Add your education history and qualifications
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">University of California, Berkeley</h3>
                          <p className="text-gray-500">Bachelor of Science in Computer Science</p>
                          <p className="text-sm text-gray-500 mt-1">2019 - 2023</p>
                          <p className="mt-2">
                            Graduated with honors. Coursework included Data Structures, Algorithms, Database Systems, and Web Development.
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">Udemy</h3>
                          <p className="text-gray-500">React & Node.js Development Bootcamp</p>
                          <p className="text-sm text-gray-500 mt-1">2022</p>
                          <p className="mt-2">
                            Intensive online course covering full-stack development with React and Node.js.
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="experience" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Work Experience</CardTitle>
                      <CardDescription>
                        Add your work history and internships
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">TechStart Inc.</h3>
                          <p className="text-gray-500">Frontend Developer Intern</p>
                          <p className="text-sm text-gray-500 mt-1">Jun 2022 - Aug 2022</p>
                          <p className="mt-2">
                            Worked on developing user interfaces using React and TypeScript.
                            Collaborated with designers to implement pixel-perfect designs.
                            Participated in code reviews and agile development processes.
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">Berkeley Computer Science Club</h3>
                          <p className="text-gray-500">Web Development Team Lead</p>
                          <p className="text-sm text-gray-500 mt-1">Sep 2021 - May 2023</p>
                          <p className="mt-2">
                            Led a team of 5 student developers in redesigning the club's website.
                            Implemented a new content management system and improved site performance.
                            Organized workshops to teach web development basics to club members.
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="applications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Applications</CardTitle>
                    <CardDescription>
                      Track the status of your job applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user?.role === "student" ? (
                      <div className="space-y-4">
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Software Engineer</h3>
                              <p className="text-gray-500">TechCorp Solutions</p>
                              <p className="text-sm text-gray-500">Applied on: April 15, 2023</p>
                            </div>
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                              In Review
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">UX/UI Designer</h3>
                              <p className="text-gray-500">Creative Solutions</p>
                              <p className="text-sm text-gray-500">Applied on: April 10, 2023</p>
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              Interview Scheduled
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Frontend Developer</h3>
                              <p className="text-gray-500">WebTech Inc.</p>
                              <p className="text-sm text-gray-500">Applied on: April 5, 2023</p>
                            </div>
                            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                              Not Selected
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Marketing Specialist</h3>
                              <p className="text-sm text-gray-500">Posted on: April 10, 2023</p>
                              <p className="mt-2">12 applicants</p>
                            </div>
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              Active
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Data Analyst</h3>
                              <p className="text-sm text-gray-500">Posted on: March 25, 2023</p>
                              <p className="mt-2">8 applicants</p>
                            </div>
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              Active
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 GPS Graduate Placement. A Research Project by Group 10(B).</p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
