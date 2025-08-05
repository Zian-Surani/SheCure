import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UpdateRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
  patientName: string;
}

const UpdateRecordsDialog = ({ open, onOpenChange, patientId, patientName }: UpdateRecordsDialogProps) => {
  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    prescription: "",
    doctor_notes: "",
    severity: "low",
    follow_up_date: "",
    blood_pressure: "",
    weight: "",
    temperature: "",
    heart_rate: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const vitals = {
        ...(formData.blood_pressure && { blood_pressure: formData.blood_pressure }),
        ...(formData.weight && { weight: formData.weight }),
        ...(formData.temperature && { temperature: formData.temperature }),
        ...(formData.heart_rate && { heart_rate: formData.heart_rate })
      };

      const { error } = await supabase
        .from("medical_history")
        .insert({
          patient_id: patientId,
          patient_name: patientName,
          diagnosis: formData.diagnosis,
          treatment: formData.treatment,
          prescription: formData.prescription,
          doctor_notes: formData.doctor_notes,
          severity: formData.severity,
          follow_up_date: formData.follow_up_date || null,
          vitals: vitals
        });

      if (error) throw error;

      toast({
        title: "Record Updated Successfully",
        description: "New medical record has been added to patient's history.",
      });

      // Reset form
      setFormData({
        diagnosis: "",
        treatment: "",
        prescription: "",
        doctor_notes: "",
        severity: "low",
        follow_up_date: "",
        blood_pressure: "",
        weight: "",
        temperature: "",
        heart_rate: ""
      });

      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error updating record",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Update Medical Record - {patientName}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis *</Label>
              <Input
                id="diagnosis"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                placeholder="Enter diagnosis"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select value={formData.severity} onValueChange={(value) => setFormData({ ...formData, severity: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="treatment">Treatment</Label>
            <Textarea
              id="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
              placeholder="Describe the treatment plan"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prescription">Prescription</Label>
            <Textarea
              id="prescription"
              value={formData.prescription}
              onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
              placeholder="List medications and dosages"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor_notes">Doctor's Notes</Label>
            <Textarea
              id="doctor_notes"
              value={formData.doctor_notes}
              onChange={(e) => setFormData({ ...formData, doctor_notes: e.target.value })}
              placeholder="Additional notes and observations"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Vital Signs</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blood_pressure">Blood Pressure</Label>
                <Input
                  id="blood_pressure"
                  value={formData.blood_pressure}
                  onChange={(e) => setFormData({ ...formData, blood_pressure: e.target.value })}
                  placeholder="120/80 mmHg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="68 kg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  placeholder="98.6°F"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heart_rate">Heart Rate</Label>
                <Input
                  id="heart_rate"
                  value={formData.heart_rate}
                  onChange={(e) => setFormData({ ...formData, heart_rate: e.target.value })}
                  placeholder="72 bpm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="follow_up_date">Follow-up Date</Label>
            <Input
              id="follow_up_date"
              type="date"
              value={formData.follow_up_date}
              onChange={(e) => setFormData({ ...formData, follow_up_date: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Updating..." : "Update Record"}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRecordsDialog;