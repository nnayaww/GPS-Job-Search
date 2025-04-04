
import { useState, useRef } from 'react';
import { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, FileText, Trash2 } from 'lucide-react';
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

  const handleViewResume = () => {
    if (user.resume) {
      window.open(user.resume, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          className="w-full"
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
              <FileText className="h-4 w-4 mr-2" />
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
