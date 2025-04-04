
import { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, BookOpen, GraduationCap, Plus, FileText, Award, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Education, Experience, User } from "@/types/user";
import ProfileEditor from "@/components/profile/ProfileEditor";
import ProfilePicture from "@/components/profile/ProfilePicture";
import EducationForm from "@/components/profile/EducationForm";
import ExperienceForm from "@/components/profile/ExperienceForm";
import ResumeUpload from "@/components/profile/ResumeUpload";
import ApplicationsList from "@/components/profile/ApplicationsList";
import { deleteEducation, deleteExperience, updateEducation, updateExperience } from "@/services/userService";

const Profile = () => {
  const { user, isAuthenticated, isLoading, updateUserState } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [educationForm, setEducationForm] = useState({ isOpen: false, isEdit: false, data: null as Education | null });
  const [experienceForm, setExperienceForm] = useState({ isOpen: false, isEdit: false, data: null as Experience | null });
  
  // Redirect if not authenticated
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // Calculate profile completion percentage
  const calculateProfileCompletion = (user: User): number => {
    let totalFields = 0;
    let completedFields = 0;
    
    // Basic profile fields
    const basicFields = ['name', 'email', 'bio', 'location', 'phoneNumber', 'headline', 'avatar'];
    totalFields += basicFields.length;
    
    for (const field of basicFields) {
      if (user[field as keyof User]) completedFields++;
    }
    
    // Education
    totalFields += 1; // Count education as 1 field
    if (user.education && user.education.length > 0) completedFields += 1;
    
    // Experience
    totalFields += 1; // Count experience as 1 field
    if (user.experience && user.experience.length > 0) completedFields += 1;
    
    // Resume
    totalFields += 1;
    if (user.resume) completedFields += 1;
    
    const completionPercentage = Math.round((completedFields / totalFields) * 100);
    return completionPercentage;
  };
  
  const profileCompletionPercentage = calculateProfileCompletion(user);
  
  const handleUpdateProfile = (updatedUser: User) => {
    updateUserState(updatedUser);
    setIsEditing(false);
  };
  
  const openAddEducationForm = () => {
    setEducationForm({ isOpen: true, isEdit: false, data: null });
  };
  
  const openEditEducationForm = (education: Education) => {
    setEducationForm({ isOpen: true, isEdit: true, data: education });
  };
  
  const handleSaveEducation = async (educationData: Education) => {
    try {
      const updatedUser = await updateEducation({ 
        userId: user.id, 
        education: educationData 
      });
      
      updateUserState(updatedUser);
      
      toast({
        title: educationForm.isEdit ? "Education updated" : "Education added",
        description: educationForm.isEdit 
          ? "Your education information has been updated" 
          : "New education has been added to your profile",
      });
      
      setEducationForm({ isOpen: false, isEdit: false, data: null });
    } catch (error) {
      console.error("Failed to save education:", error);
      toast({
        title: "Error",
        description: "There was an error saving your education information",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteEducation = async (educationId: number) => {
    try {
      const updatedUser = await deleteEducation(user.id, educationId);
      
      updateUserState(updatedUser);
      
      toast({
        title: "Education deleted",
        description: "The education entry has been removed from your profile",
      });
    } catch (error) {
      console.error("Failed to delete education:", error);
      toast({
        title: "Error",
        description: "There was an error deleting your education information",
        variant: "destructive",
      });
    }
  };
  
  const openAddExperienceForm = () => {
    setExperienceForm({ isOpen: true, isEdit: false, data: null });
  };
  
  const openEditExperienceForm = (experience: Experience) => {
    setExperienceForm({ isOpen: true, isEdit: true, data: experience });
  };
  
  const handleSaveExperience = async (experienceData: Experience) => {
    try {
      const updatedUser = await updateExperience({ 
        userId: user.id, 
        experience: experienceData 
      });
      
      updateUserState(updatedUser);
      
      toast({
        title: experienceForm.isEdit ? "Experience updated" : "Experience added",
        description: experienceForm.isEdit 
          ? "Your work experience has been updated" 
          : "New work experience has been added to your profile",
      });
      
      setExperienceForm({ isOpen: false, isEdit: false, data: null });
    } catch (error) {
      console.error("Failed to save experience:", error);
      toast({
        title: "Error",
        description: "There was an error saving your work experience",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteExperience = async (experienceId: number) => {
    try {
      const updatedUser = await deleteExperience(user.id, experienceId);
      
      updateUserState(updatedUser);
      
      toast({
        title: "Experience deleted",
        description: "The work experience has been removed from your profile",
      });
    } catch (error) {
      console.error("Failed to delete experience:", error);
      toast({
        title: "Error",
        description: "There was an error deleting your work experience",
        variant: "destructive",
      });
    }
  };

  // Show different content for employers vs students
  const renderRoleSpecificTabs = () => {
    if (user.role === 'employer') {
      return (
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
        </TabsList>
      );
    }
    
    return (
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="applications">Applications</TabsTrigger>
      </TabsList>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-primary-foreground mt-2">
            Manage your personal information and {user.role === 'employer' ? 'job postings' : 'application settings'}
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
                  <ProfilePicture user={user} onUpdate={updateUserState} />
                  <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="mt-1 capitalize text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {user.role}
                  </p>
                  
                  <Button 
                    className="mt-6 w-full" 
                    onClick={() => setIsEditing(true)}
                    disabled={isEditing}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Profile Completion</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${profileCompletionPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{profileCompletionPercentage}% complete</p>
                  <p className="text-sm mt-2">
                    Complete your profile to increase your chances of {user.role === 'employer' ? 'finding the right candidates' : 'finding the perfect opportunity'}.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="personal">
              {renderRoleSpecificTabs()}
              
              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <ProfileEditor 
                        user={user} 
                        onUpdate={handleUpdateProfile}
                        onCancel={() => setIsEditing(false)} 
                      />
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                            <p className="mt-1">{user.name}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                            <p className="mt-1">{user.email}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                            <p className="mt-1">{user.phoneNumber || "Not specified"}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                            <p className="mt-1">{user.location || "Not specified"}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Professional Headline</h3>
                          <p className="mt-1">{user.headline || "Not specified"}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">About Me</h3>
                          <p className="mt-1">{user.bio || "No bio provided"}</p>
                        </div>
                        
                        {user.role === "student" && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Resume/CV</h3>
                            <div className="mt-2">
                              <ResumeUpload user={user} onUpdate={updateUserState} />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {user.role === "student" && (
                <>
                  <TabsContent value="education" className="mt-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Education</CardTitle>
                          <CardDescription>
                            Add your education history and qualifications
                          </CardDescription>
                        </div>
                        <Button size="sm" onClick={openAddEducationForm}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {user.education && user.education.length > 0 ? (
                            user.education.map((education) => (
                              <div key={education.id} className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-medium">{education.institution}</h3>
                                  <p className="text-gray-500">{education.degree} in {education.field}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {education.startDate && education.startDate.substring(0, 7)} - {education.endDate && education.endDate.substring(0, 7)}
                                  </p>
                                  {education.description && <p className="mt-2">{education.description}</p>}
                                </div>
                                <div className="flex-shrink-0 flex gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => openEditEducationForm(education)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteEducation(education.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-4">
                              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                              <p className="mt-2 text-muted-foreground">No education entries yet. Add your educational background.</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <EducationForm 
                      isOpen={educationForm.isOpen} 
                      onClose={() => setEducationForm({ ...educationForm, isOpen: false })}
                      onSave={handleSaveEducation}
                      initialData={educationForm.data}
                      isEdit={educationForm.isEdit}
                    />
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
                        <Button size="sm" onClick={openAddExperienceForm}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {user.experience && user.experience.length > 0 ? (
                            user.experience.map((experience) => (
                              <div key={experience.id} className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Briefcase className="h-5 w-5 text-primary" />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-medium">{experience.company}</h3>
                                  <p className="text-gray-500">{experience.position}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {experience.startDate && experience.startDate.substring(0, 7)} - {experience.current ? "Present" : (experience.endDate && experience.endDate.substring(0, 7))}
                                  </p>
                                  {experience.description && <p className="mt-2">{experience.description}</p>}
                                </div>
                                <div className="flex-shrink-0 flex gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => openEditExperienceForm(experience)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteExperience(experience.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-4">
                              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
                              <p className="mt-2 text-muted-foreground">No work experience entries yet. Add your professional experience.</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <ExperienceForm 
                      isOpen={experienceForm.isOpen} 
                      onClose={() => setExperienceForm({ ...experienceForm, isOpen: false })}
                      onSave={handleSaveExperience}
                      initialData={experienceForm.data}
                      isEdit={experienceForm.isEdit}
                    />
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
                        <ApplicationsList user={user} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}
              
              {user.role === "employer" && (
                <TabsContent value="jobs" className="mt-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Posted Jobs</CardTitle>
                        <CardDescription>
                          Manage your job listings and view applications
                        </CardDescription>
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                      </Button>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
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
