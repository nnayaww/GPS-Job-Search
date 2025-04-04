
import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { getUserApplications, Application } from '@/services/userService';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Building } from 'lucide-react';

interface ApplicationsListProps {
  user: User;
}

const ApplicationsList = ({ user }: ApplicationsListProps) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const userApplications = await getUserApplications(user.id);
        setApplications(userApplications);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: "Error fetching applications",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [user.id, toast]);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'in review':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">In Review</Badge>;
      case 'interview scheduled':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Interview Scheduled</Badge>;
      case 'rejected':
      case 'not selected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">Not Selected</Badge>;
      case 'offer extended':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Offer Extended</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Accepted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return <div className="py-8 text-center">Loading applications...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{application.jobTitle}</h3>
                <div className="flex items-center text-muted-foreground mt-1">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{application.company}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Applied on: {new Date(application.appliedDate).toLocaleDateString()}</span>
                </div>
                {application.interviewDate && (
                  <div className="flex items-center text-sm text-blue-600 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Interview: {new Date(application.interviewDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <div>{getStatusBadge(application.status)}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ApplicationsList;
