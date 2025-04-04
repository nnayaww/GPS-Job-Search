
import { useState } from "react";
import { Experience } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Check, X } from "lucide-react";

interface ExperienceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experience: Experience) => void;
  initialData?: Experience;
  isEdit?: boolean;
}

const ExperienceForm = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEdit = false
}: ExperienceFormProps) => {
  const [company, setCompany] = useState(initialData?.company || "");
  const [position, setPosition] = useState(initialData?.position || "");
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [current, setCurrent] = useState(initialData?.current || false);
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const experienceData: Experience = {
      id: initialData?.id || Math.floor(Math.random() * 1000000),
      company,
      position,
      startDate,
      endDate: current ? undefined : endDate,
      current,
      description
    };
    
    onSave(experienceData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Experience" : "Add Experience"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input 
              id="company" 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. TechCorp Solutions"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input 
              id="position" 
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <Switch 
              id="current-job"
              checked={current}
              onCheckedChange={setCurrent}
            />
            <Label htmlFor="current-job">I currently work here</Label>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate" 
                type="month"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input 
                id="endDate" 
                type="month"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={current}
                required={!current}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your responsibilities and achievements"
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit">
              <Check className="mr-2 h-4 w-4" />
              {isEdit ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceForm;
