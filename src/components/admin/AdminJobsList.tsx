
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data for jobs
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "New York, NY",
    type: "Full-time",
    datePosted: "2023-04-15",
    status: "active",
    applications: 12,
    views: 245
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Data Insights Co.",
    location: "Remote",
    type: "Contract",
    datePosted: "2023-04-12",
    status: "pending",
    applications: 8,
    views: 189
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Designs Ltd.",
    location: "San Francisco, CA",
    type: "Full-time",
    datePosted: "2023-04-10",
    status: "active",
    applications: 15,
    views: 320
  },
  {
    id: 4,
    title: "Project Manager",
    company: "Project Solutions Group",
    location: "Chicago, IL",
    type: "Full-time",
    datePosted: "2023-04-08",
    status: "inactive",
    applications: 6,
    views: 178
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "Marketing Pro Inc.",
    location: "Austin, TX",
    type: "Part-time",
    datePosted: "2023-04-05",
    status: "active",
    applications: 10,
    views: 215
  }
];

const AdminJobsList = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  const handleStatusChange = (id: number, checked: boolean) => {
    setJobs(
      jobs.map((job) => 
        job.id === id 
          ? { ...job, status: checked ? "active" : "inactive" } 
          : job
      )
    );
    
    toast({
      title: "Job status updated",
      description: `Job #${id} has been ${checked ? "activated" : "deactivated"}.`,
    });
  };

  const handleDeleteClick = (id: number) => {
    setJobToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      setJobs(jobs.filter(job => job.id !== jobToDelete));
      
      toast({
        title: "Job deleted",
        description: `Job #${jobToDelete} has been deleted.`,
      });
      
      setDeleteDialogOpen(false);
      setJobToDelete(null);
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Date Posted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{new Date(job.datePosted).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={job.status === "active"} 
                      onCheckedChange={(checked) => handleStatusChange(job.id, checked)}
                    />
                    <Badge 
                      variant={
                        job.status === "active" 
                          ? "default" 
                          : job.status === "pending" 
                            ? "outline" 
                            : "secondary"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{job.applications}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-destructive"
                      onClick={() => handleDeleteClick(job.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJobsList;
