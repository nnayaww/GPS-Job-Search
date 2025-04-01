
import { useState } from "react";
import { MapPin, Search, Briefcase, Building, Calendar, Clock, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Jobs = () => {
  const [distance, setDistance] = useState<number[]>([15]);
  
  // Mock job data
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      distance: "4.2 miles away",
      type: "Full-time",
      posted: "2 days ago",
      salary: "$80,000 - $110,000",
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
      salary: "$60,000 - $75,000",
      description: "Join our dynamic marketing team to develop and implement marketing strategies for our clients. Experience with digital marketing campaigns preferred."
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
      description: "Seeking a data analyst to extract insights from complex datasets. Proficiency in SQL, Excel, and visualization tools required."
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
      description: "Support our HR department with employee onboarding, benefits administration, and general administrative tasks."
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
      description: "Design beautiful and functional user interfaces for web and mobile applications. Portfolio showcasing previous work required."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">Find Jobs Near You</h1>
          <p className="text-primary-foreground mt-2">
            Discover opportunities that match your skills in your preferred location
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Job title, keywords, or company" 
                className="pl-10"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                type="text" 
                placeholder="City, state, or zip code" 
                className="pl-10"
              />
            </div>
            <Button className="md:w-auto">
              Search Jobs
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  Reset All
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    Distance
                  </h3>
                  <div className="space-y-4">
                    <Slider
                      value={distance}
                      onValueChange={setDistance}
                      max={50}
                      step={1}
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0 mi</span>
                      <span>{distance[0]} miles</span>
                      <span>50 mi</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-primary" />
                    Job Type
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="fulltime" className="mr-2" />
                      <label htmlFor="fulltime">Full-time</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="parttime" className="mr-2" />
                      <label htmlFor="parttime">Part-time</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="contract" className="mr-2" />
                      <label htmlFor="contract">Contract</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="internship" className="mr-2" />
                      <label htmlFor="internship">Internship</label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Date Posted
                  </h3>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any time</SelectItem>
                      <SelectItem value="day">Past 24 hours</SelectItem>
                      <SelectItem value="week">Past week</SelectItem>
                      <SelectItem value="month">Past month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2 text-primary" />
                    Experience Level
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="entry" className="mr-2" />
                      <label htmlFor="entry">Entry level</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="mid" className="mr-2" />
                      <label htmlFor="mid">Mid level</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="senior" className="mr-2" />
                      <label htmlFor="senior">Senior level</label>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4">Apply Filters</Button>
              </div>
            </div>
          </div>

          {/* Job Results */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {jobs.length} jobs found near you
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Date posted</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
                        <div className="flex items-center mt-1 text-gray-600">
                          <Building className="h-4 w-4 mr-1" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center mt-1 text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                          <span className="mx-2">•</span>
                          <span className="text-primary font-medium">{job.distance}</span>
                        </div>
                        <div className="mt-4">
                          <p className="text-gray-700">{job.description}</p>
                        </div>
                      </div>
                      <div className="md:text-right mt-2 md:mt-0">
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {job.type}
                        </span>
                        <div className="text-gray-600 mt-2 flex items-center md:justify-end">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{job.posted}</span>
                        </div>
                        <div className="font-medium mt-2">{job.salary}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between">
                    <Button variant="outline">Save Job</Button>
                    <Button>Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 GPS Graduate Placement. A Research Project by Group 10(B).</p>
        </div>
      </footer>
    </div>
  );
};

export default Jobs;
