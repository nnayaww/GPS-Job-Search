import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";

const Jobs = () => {
  const { toast } = useToast();
  const [distance, setDistance] = useState<number[]>([15]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [jobType, setJobType] = useState<string[]>([]);
  const [datePosted, setDatePosted] = useState("any");
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  
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
    {
      id: 3,
      title: "Data Analyst",
      company: "DataViz Analytics",
      location: "Chicago, IL",
      distance: "6.1 miles away",
      type: "Full-time",
      posted: "1 week ago",
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      salary: "$65,000 - $85,000",
      experienceLevel: "entry",
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
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      salary: "$45,000 - $55,000",
      experienceLevel: "entry",
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
      postedDate: new Date(),
      salary: "$70,000 - $90,000",
      experienceLevel: "senior",
      description: "Design beautiful and functional user interfaces for web and mobile applications. Portfolio showcasing previous work required."
    },
  ];

  const handleSearchJobs = () => {
    let results = [...jobs];
    
    // Filter by search term (job title, keywords, company)
    if (searchTerm) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by location
    if (location) {
      results = results.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Filter by distance
    if (distance[0] < 50) {
      // For demo purposes, we'll just filter based on the numeric value in the distance string
      results = results.filter(job => {
        const distanceValue = parseFloat(job.distance.split(" ")[0]);
        return distanceValue <= distance[0];
      });
    }
    
    // Filter by job type
    if (jobType.length > 0) {
      results = results.filter(job => 
        jobType.includes(job.type.toLowerCase())
      );
    }
    
    // Filter by date posted
    if (datePosted !== "any") {
      const now = new Date();
      let cutoffDate = new Date();
      
      switch(datePosted) {
        case "day":
          cutoffDate.setDate(now.getDate() - 1);
          break;
        case "week":
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case "month":
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      results = results.filter(job => job.postedDate >= cutoffDate);
    }
    
    // Filter by experience level
    if (experienceLevel.length > 0) {
      results = results.filter(job => 
        experienceLevel.includes(job.experienceLevel)
      );
    }
    
    // Sort results
    switch(sortBy) {
      case "date":
        results.sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime());
        break;
      case "distance":
        results.sort((a, b) => {
          const distanceA = parseFloat(a.distance.split(" ")[0]);
          const distanceB = parseFloat(b.distance.split(" ")[0]);
          return distanceA - distanceB;
        });
        break;
      case "salary":
        // For demo purposes, just a simplified sort based on the lower end of salary range
        results.sort((a, b) => {
          const salaryA = parseInt(a.salary.split(" - ")[0].replace(/\D/g, ""));
          const salaryB = parseInt(b.salary.split(" - ")[0].replace(/\D/g, ""));
          return salaryB - salaryA;
        });
        break;
      // For relevance, we keep the original order
    }
    
    setFilteredJobs(results);
    
    toast({
      title: `${results.length} jobs found`,
      description: results.length > 0 
        ? "Here are the jobs that match your search criteria." 
        : "Try adjusting your search or filters to find more opportunities.",
      duration: 3000,
    });
  };

  const handleJobTypeChange = (type: string) => {
    setJobType(prevTypes => 
      prevTypes.includes(type.toLowerCase()) 
        ? prevTypes.filter(t => t !== type.toLowerCase())
        : [...prevTypes, type.toLowerCase()]
    );
  };
  
  const handleExperienceLevelChange = (level: string) => {
    setExperienceLevel(prevLevels => 
      prevLevels.includes(level) 
        ? prevLevels.filter(l => l !== level)
        : [...prevLevels, level]
    );
  };
  
  const resetFilters = () => {
    setSearchTerm("");
    setLocation("");
    setDistance([15]);
    setJobType([]);
    setDatePosted("any");
    setExperienceLevel([]);
    setSortBy("relevance");
  };

  // Initialize filtered jobs with all jobs on component mount
  useEffect(() => {
    setFilteredJobs(jobs);
  }, []);

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                type="text" 
                placeholder="City, state, or zip code" 
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button className="md:w-auto" onClick={handleSearchJobs}>
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
                <Button variant="ghost" size="sm" className="text-primary" onClick={resetFilters}>
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
                      <input 
                        type="checkbox" 
                        id="fulltime" 
                        className="mr-2"
                        checked={jobType.includes("full-time")}
                        onChange={() => handleJobTypeChange("full-time")}
                      />
                      <label htmlFor="fulltime">Full-time</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="parttime" 
                        className="mr-2"
                        checked={jobType.includes("part-time")}
                        onChange={() => handleJobTypeChange("part-time")}
                      />
                      <label htmlFor="parttime">Part-time</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="contract" 
                        className="mr-2"
                        checked={jobType.includes("contract")}
                        onChange={() => handleJobTypeChange("contract")}
                      />
                      <label htmlFor="contract">Contract</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="internship" 
                        className="mr-2"
                        checked={jobType.includes("internship")}
                        onChange={() => handleJobTypeChange("internship")}
                      />
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
                  <Select value={datePosted} onValueChange={setDatePosted}>
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
                      <input 
                        type="checkbox" 
                        id="entry" 
                        className="mr-2"
                        checked={experienceLevel.includes("entry")}
                        onChange={() => handleExperienceLevelChange("entry")}
                      />
                      <label htmlFor="entry">Entry level</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="mid" 
                        className="mr-2"
                        checked={experienceLevel.includes("mid")}
                        onChange={() => handleExperienceLevelChange("mid")}
                      />
                      <label htmlFor="mid">Mid level</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="senior" 
                        className="mr-2"
                        checked={experienceLevel.includes("senior")}
                        onChange={() => handleExperienceLevelChange("senior")}
                      />
                      <label htmlFor="senior">Senior level</label>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" onClick={handleSearchJobs}>Apply Filters</Button>
              </div>
            </div>
          </div>

          {/* Job Results */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {filteredJobs.length} jobs found near you
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
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
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-primary">
                            <Link to={`/jobs/${job.id}`} className="hover:underline">
                              {job.title}
                            </Link>
                          </h3>
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
                      <Button asChild>
                        <Link to={`/jobs/${job.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No jobs found matching your criteria.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                  <Button className="mt-4" onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredJobs.length > 0 && (
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
            )}
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
