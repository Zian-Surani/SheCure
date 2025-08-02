import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPatientAdded: () => void;
}

const AddPatientDialog = ({ open, onOpenChange, onPatientAdded }: AddPatientDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    aadhar_number: "",
    address: "",
    phone: "",
    condition: "",
    status: "active"
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from("patients")
        .insert([
          {
            ...formData,
            age: parseInt(formData.age),
            created_by: user.id,
            location: "Itarsi, Madhya Pradesh"
          }
        ]);

      if (error) throw error;

      toast({
        title: "Patient added successfully",
        description: `${formData.name} has been added to the system.`,
      });

      // Reset form
      setFormData({
        name: "",
        age: "",
        aadhar_number: "",
        address: "",
        phone: "",
        condition: "",
        status: "active"
      });

      onPatientAdded();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error adding patient",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Enter the patient's details to add them to the system.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="120"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadhar">Aadhar Number</Label>
            <Input
              id="aadhar"
              value={formData.aadhar_number}
              onChange={(e) => handleInputChange("aadhar_number", e.target.value)}
              placeholder="1234 5678 9012"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+91 98765 43210"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter full address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Medical Condition</Label>
            <Input
              id="condition"
              value={formData.condition}
              onChange={(e) => handleInputChange("condition", e.target.value)}
              placeholder="e.g., Prenatal Care, Vaccination, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="health" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Patient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;