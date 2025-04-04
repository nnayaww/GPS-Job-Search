
import React, { useState } from 'react';
import { User } from '@/types/user';
import { Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { updateUserAvatar } from '@/services/userService';
import { useToast } from '@/hooks/use-toast';

interface ProfilePictureProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const ProfilePicture = ({ user, onUpdate }: ProfilePictureProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageKey, setImageKey] = useState(Date.now()); // Add a key for forcing image refresh
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Check if the file size is less than 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image less than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Call the API to update the avatar
      const updatedUser = await updateUserAvatar({ 
        userId: user.id,
        avatarFile: file
      });
      
      // Update the local state and force image refresh
      setImageKey(Date.now());
      onUpdate(updatedUser);
      
      // Also update localStorage to ensure the avatar persists
      const storedUser = localStorage.getItem("gps_user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.avatar = updatedUser.avatar;
        localStorage.setItem("gps_user", JSON.stringify(parsedUser));
      }
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been successfully updated",
      });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast({
        title: "Error updating profile picture",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <Avatar className="h-24 w-24 border-4 border-white shadow-md">
          {user.avatar ? (
            <AvatarImage 
              src={`${user.avatar}${user.avatar.includes('?') ? '&' : '?'}t=${imageKey}`} 
              alt={user.name} 
            />
          ) : (
            <AvatarImage src="" alt={user.name} />
          )}
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        
        <div 
          className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={handleButtonClick}
        >
          <Camera className="text-white h-8 w-8" />
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4"
        onClick={handleButtonClick}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Change Profile Picture'}
      </Button>
    </div>
  );
};

export default ProfilePicture;
