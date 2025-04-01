
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { Briefcase, GraduationCap, Building, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Connect Graduates with Career Opportunities
            </h1>
            <p className="text-xl text-primary-foreground mb-8 max-w-3xl mx-auto">
              GPS Graduate Placement helps students and recent graduates find their perfect job match 
              while connecting employers with top talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link to="/jobs">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Find Jobs
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-primary-foreground/10">
                <Link to="/register">
                  <Users className="mr-2 h-5 w-5" />
                  For Employers
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How GPS Placement Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Graduates</h3>
                <p className="text-gray-600">
                  Create a profile, showcase your skills and qualifications, and apply to job opportunities that match your career goals.
                </p>
                <Button className="mt-6" variant="outline" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Employers</h3>
                <p className="text-gray-600">
                  Post job openings, search for qualified candidates, and connect with top talent from universities and colleges.
                </p>
                <Button className="mt-6" variant="outline" asChild>
                  <Link to="/register">Post a Job</Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Job Matching</h3>
                <p className="text-gray-600">
                  Our smart matching algorithm connects graduates with employers based on skills, qualifications, and preferences.
                </p>
                <Button className="mt-6" variant="outline" asChild>
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose GPS Placement</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-gray-600">Companies</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">10,000+</p>
                <p className="text-gray-600">Graduates</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">5,000+</p>
                <p className="text-gray-600">Jobs Posted</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">85%</p>
                <p className="text-gray-600">Placement Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-primary-foreground mb-8 max-w-3xl mx-auto">
              Join GPS Graduate Placement today and take the next step in your career journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link to="/register">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Sign Up as Graduate
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-primary-foreground/10">
                <Link to="/register">
                  <Building className="mr-2 h-5 w-5" />
                  Sign Up as Employer
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 GPS Graduate Placement. A Research Project by Group 10(B).</p>
        </div>
      </footer>
    </div>
  );
}
