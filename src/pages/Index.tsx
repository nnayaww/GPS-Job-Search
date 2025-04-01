
import { Search, MapPin, User, Users, Briefcase, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-primary py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Graduate Placement via the Internet
              <br />
              with Close Residential (GPS)
            </h1>
            <p className="text-lg text-primary-foreground max-w-2xl">
              Matching graduates with job opportunities near their preferred locations
              using advanced GPS technology and internet-based placement services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Find Jobs Near Me <MapPin className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-primary-foreground/10">
                For Employers <Briefcase className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Find Opportunities Near You</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="pl-10 w-full h-12 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location or 'use my current location'"
                    className="pl-10 w-full h-12 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <Button className="h-12 px-8">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-primary" />
                  Location-Based Matching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Find job opportunities within your preferred radius, reducing commute time and improving work-life balance.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-6 w-6 mr-2 text-primary" />
                  Skills-Based Placement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our algorithm matches your skills, education, and career goals with relevant job opportunities.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-6 w-6 mr-2 text-primary" />
                  Employer Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connect directly with employers looking for qualified candidates in your area, streamlining the hiring process.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Research Insights</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Our system is built on comprehensive research into graduate placement challenges and solutions.
          </p>
          
          <Tabs defaultValue="objectives" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="objectives">Objectives</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="methodology">Methodology</TabsTrigger>
              <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="objectives" className="p-6 border rounded-md mt-6">
              <h3 className="text-xl font-semibold mb-4">Research Objectives</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Develop a model for an internet-based graduate placement system that incorporates GPS</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Assess the effectiveness of GPS-enabled job matching in reducing job search time</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Evaluate employer perspectives on location-based recruitment strategies</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Analyze the impact of close residential placement on job retention and satisfaction</span>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="problems" className="p-6 border rounded-md mt-6">
              <h3 className="text-xl font-semibold mb-4">Problems Addressed</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Financial issues in job search and relocation</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Language barriers in different geographic regions</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Accommodation challenges when relocating</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Unavailability of good network connections</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Career development threats from mismatched placements</span>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="methodology" className="p-6 border rounded-md mt-6">
              <h3 className="text-xl font-semibold mb-4">Research Methodology</h3>
              <p className="mb-4">A mixed-method approach incorporating both qualitative and quantitative research techniques:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span><strong>Surveys:</strong> Structured questionnaires distributed to recent graduates</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span><strong>Interviews:</strong> With employers and recruitment agencies</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span><strong>Case Studies:</strong> Analysis of existing job placement platforms</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span><strong>Statistical Analysis:</strong> Of survey responses and job market trends</span>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="outcomes" className="p-6 border rounded-md mt-6">
              <h3 className="text-xl font-semibold mb-4">Expected Outcomes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>A conceptual framework for an internet-based graduate placement system with GPS integration</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Empirical evidence on the effectiveness of location-based job matching</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Recommendations for policymakers and recruitment agencies on enhancing digital employment strategies</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Improved understanding of how proximity affects job satisfaction and retention</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Ideal Job?</h2>
          <p className="text-xl text-primary-foreground mb-8 max-w-2xl mx-auto">
            Join our platform to discover opportunities that match your skills and location preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Register as a Graduate <User className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-primary-foreground/10">
              Register as an Employer <Users className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GPS Graduate Placement</h3>
              <p className="text-gray-400">
                Bridging the gap between job seekers and employers through location-based matching.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Research</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Users</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Graduates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Employers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Institutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Agency Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: info@gpsplacement.com</li>
                <li className="text-gray-400">Phone: +1 (123) 456-7890</li>
                <li className="text-gray-400">Address: University Research Center</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-500">
            <p>© 2023 GPS Graduate Placement. A Research Project by Group 10(B). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
