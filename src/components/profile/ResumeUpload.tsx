
import { useState, useRef } from 'react';
import { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, FileText, Trash2, ExternalLink } from 'lucide-react';
import { uploadResume, deleteResume } from '@/services/userService';

interface ResumeUploadProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const ResumeUpload = ({ user, onUpdate }: ResumeUploadProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is a PDF or document
    const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validFileTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
        variant: "destructive",
      });
      return;
    }

    // Check if the file size is less than 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file less than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      const updatedUser = await uploadResume({ 
        userId: user.id,
        resumeFile: file
      });
      
      onUpdate(updatedUser);
      
      toast({
        title: "Resume uploaded",
        description: "Your resume has been successfully uploaded",
      });
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "Error uploading resume",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!user.resume) return;
    
    try {
      setIsDeleting(true);
      
      const updatedUser = await deleteResume(user.id);
      
      onUpdate(updatedUser);
      
      toast({
        title: "Resume deleted",
        description: "Your resume has been removed",
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Error deleting resume",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Since we can't access the actual file directly in this demo app,
  // we'll simulate opening a new window with the resume URL
  const handleViewResume = () => {
    if (user.resume) {
      window.open(user.resume, '_blank', 'noopener,noreferrer');
      
      // For demo purpose, show a toast that explains what would happen in a real app
      toast({
        title: "Resume Viewer",
        description: "In a production app, this would open your actual uploaded resume",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <Button 
          variant="outline" 
          className="flex-grow"
          onClick={handleButtonClick}
          disabled={isUploading}
        >
          <UploadCloud className="h-4 w-4 mr-2" />
          {isUploading ? 'Uploading...' : user.resume ? 'Replace Resume' : 'Upload Resume'}
        </Button>
        
        <input 
          ref={fileInputRef} 
          type="file" 
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        
        {user.resume && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-shrink-0"
              onClick={handleViewResume}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-shrink-0 text-destructive hover:text-destructive"
              onClick={handleDeleteResume}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {user.resume && (
        <p className="text-sm text-muted-foreground">
          Resume uploaded: {new Date(user.resumeUpdated || Date.now()).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default ResumeUpload;
