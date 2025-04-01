
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Building, 
  Calendar, 
  Clock, 
  Briefcase, 
  DollarSign,
  Share2,
  BookmarkPlus,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import JobApplicationForm from "@/components/jobs/JobApplicationForm";

// Mock job data - in a real app this would come from an API
const jobsData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    distance: "4.2 miles away",
    type: "Full-time",
    posted: "2 days ago",
    salary: "$80,000 - $110,000",
    description: "We are looking for a skilled software engineer to join our growing team. The ideal candidate has experience with React, Node.js, and cloud technologies.",
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, maintainable, and efficient code",
      "Troubleshoot and debug applications",
      "Perform code reviews and mentor junior developers"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "2+ years of experience with React and modern JavaScript",
      "Experience with RESTful APIs and backend development",
      "Knowledge of version control systems (Git)",
      "Strong problem-solving skills and attention to detail"
    ],
    benefits: [
      "Competitive salary and equity options",
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Flexible working hours",
      "Professional development budget"
    ]
  },
  {
    id: 2,
    title: "Marketing Specialist",
    company: "Global Marketing Inc.",
    location: "New York, NY",
    distance: "2.7 miles away",
    type: "Full-time",
    posted: "5 days ago",
    salary: "$60,000 - $75,000",
    description: "Join our dynamic marketing team to develop and implement marketing strategies for our clients. Experience with digital marketing campaigns preferred.",
    responsibilities: [
      "Develop and execute comprehensive marketing campaigns",
      "Create engaging content for various marketing channels",
      "Monitor and analyze campaign performance metrics",
      "Conduct market research to identify trends and opportunities",
      "Collaborate with design and sales teams on marketing initiatives"
    ],
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "1-3 years of experience in marketing",
      "Proficiency with marketing automation tools and CRM systems",
      "Strong written and verbal communication skills",
      "Experience with social media management and analytics"
    ],
    benefits: [
      "Competitive salary with commission structure",
      "Comprehensive benefits package",
      "Professional development opportunities",
      "Collaborative and creative work environment",
      "Paid time off and flexible work arrangements"
    ]
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "DataViz Analytics",
    location: "Chicago, IL",
    distance: "6.1 miles away",
    type: "Full-time",
    posted: "1 week ago",
    salary: "$65,000 - $85,000",
    description: "Seeking a data analyst to extract insights from complex datasets. Proficiency in SQL, Excel, and visualization tools required.",
    responsibilities: [
      "Collect, process, and analyze large datasets",
      "Create and maintain dashboards and reports",
      "Identify trends and patterns to support business decisions",
      "Collaborate with stakeholders to understand data needs",
      "Implement data quality controls and documentation"
    ],
    requirements: [
      "Bachelor's degree in Statistics, Mathematics, Computer Science, or related field",
      "2+ years of experience in data analysis",
      "Proficiency in SQL, Excel, and data visualization tools",
      "Experience with statistical analysis and data modeling",
      "Strong analytical and problem-solving skills"
    ],
    benefits: [
      "Competitive salary",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Remote work flexibility",
      "Continuous learning opportunities"
    ]
  },
  {
    id: 4,
    title: "HR Assistant",
    company: "Enterprise Corporation",
    location: "Austin, TX",
    distance: "1.4 miles away",
    type: "Part-time",
    posted: "3 days ago",
    salary: "$45,000 - $55,000",
    description: "Support our HR department with employee onboarding, benefits administration, and general administrative tasks.",
    responsibilities: [
      "Assist with employee onboarding and offboarding processes",
      "Maintain accurate personnel records and documentation",
      "Coordinate recruiting activities and schedule interviews",
      "Respond to employee inquiries about policies and benefits",
      "Support HR initiatives and special projects"
    ],
    requirements: [
      "Bachelor's degree in Human Resources, Business, or related field",
      "1+ years of experience in an HR role",
      "Knowledge of HR principles and practices",
      "Excellent organizational and communication skills",
      "Proficiency with HRIS and MS Office applications"
    ],
    benefits: [
      "Competitive hourly rate",
      "Flexible schedule",
      "Professional development opportunities",
      "Friendly and supportive work environment",
      "Opportunity for advancement to full-time"
    ]
  },
  {
    id: 5,
    title: "UX/UI Designer",
    company: "Creative Solutions",
    location: "Seattle, WA",
    distance: "8.5 miles away",
    type: "Contract",
    posted: "Just now",
    salary: "$70,000 - $90,000",
    description: "Design beautiful and functional user interfaces for web and mobile applications. Portfolio showcasing previous work required.",
    responsibilities: [
      "Create user-centered designs by understanding business requirements",
      "Develop UI mockups and prototypes that clearly illustrate how sites function",
      "Identify and troubleshoot UX problems",
      "Conduct usability testing and gather feedback",
      "Collaborate with developers for implementation"
    ],
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "3+ years of experience in UX/UI design",
      "Proficiency with design tools like Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating design thinking and execution",
      "Understanding of web and mobile design principles"
    ],
    benefits: [
      "Competitive contract rate",
      "Remote work options",
      "Flexible hours",
      "Opportunity for long-term employment",
      "Collaborative and innovative team environment"
    ]
  }
];

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const { toast } = useToast();
  
  const jobId = parseInt(id || "0");
  const job = jobsData.find(job => job.id === jobId);
  
  if (!job) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Job not found</h1>
        <p className="mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>
      </div>
    );
  }
  
  const handleSaveJob = () => {
    toast({
      title: "Job Saved",
      description: "This job has been saved to your profile",
    });
  };
  
  const handleShareJob = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Job link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <Link to="/jobs" className="text-primary-foreground flex items-center hover:underline mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to job listings
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{job.title}</h1>
          <div className="flex items-center mt-2 text-primary-foreground">
            <Building className="h-4 w-4 mr-1" />
            <span>{job.company}</span>
            <span className="mx-2">•</span>
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {job.type}
                  </Badge>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {job.posted}
                  </Badge>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {job.salary}
                  </Badge>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                    <p className="text-gray-700">{job.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {job.requirements.map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {job.benefits.map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {showApplicationForm && (
              <div className="mt-8">
                <JobApplicationForm jobId={job.id} jobTitle={job.title} onCancel={() => setShowApplicationForm(false)} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Job Actions</h2>
                  
                  {!showApplicationForm ? (
                    <Button 
                      onClick={() => setShowApplicationForm(true)} 
                      className="w-full mb-4"
                    >
                      Apply Now
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setShowApplicationForm(false)} 
                      variant="outline" 
                      className="w-full mb-4"
                    >
                      Cancel Application
                    </Button>
                  )}
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleSaveJob}
                    >
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleShareJob}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="font-medium mb-3">Company Information</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {job.company} is a leading company in the {job.type.toLowerCase()} sector, 
                      providing exceptional opportunities for career growth and development.
                    </p>
                    <Button variant="outline" className="w-full">
                      Company Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-3">Job Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Job Type</p>
                        <p className="font-medium">{job.type}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Salary Range</p>
                        <p className="font-medium">{job.salary}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Posted</p>
                        <p className="font-medium">{job.posted}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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

export default JobDetails;
