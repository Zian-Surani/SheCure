import { useState, useEffect } from "react";
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

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId?: string;
  patientName?: string;
  onAppointmentScheduled: () => void;
}

const AppointmentDialog = ({ open, onOpenChange, patientId, patientName, onAppointmentScheduled }: AppointmentDialogProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formData, setFormData] = useState({
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (open) {
      fetchDoctors();
    }
  }, [open]);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from("doctors")
        .select("id, name, specialization")
        .order("name");

      if (error) throw error;
      setDoctors(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching doctors",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !patientId) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from("appointments")
        .insert([
          {
            patient_id: patientId,
            doctor_id: formData.doctor_id,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
            notes: formData.notes,
            created_by: user.id
          }
        ]);

      if (error) throw error;

      const selectedDoctor = doctors.find(d => d.id === formData.doctor_id);
      
      toast({
        title: "Appointment scheduled",
        description: `Appointment for ${patientName} with ${selectedDoctor?.name} has been scheduled.`,
      });

      // Reset form
      setFormData({
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        notes: ""
      });

      onAppointmentScheduled();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error scheduling appointment",
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

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Appointment</DialogTitle>
          <DialogDescription>
            Schedule an appointment for {patientName}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select value={formData.doctor_id} onValueChange={(value) => handleInputChange("doctor_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                min={minDate}
                value={formData.appointment_date}
                onChange={(e) => handleInputChange("appointment_date", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.appointment_time}
                onChange={(e) => handleInputChange("appointment_time", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any special instructions or notes"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="health" disabled={loading || !formData.doctor_id}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Schedule Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;