import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Thermometer, Heart, Activity, Stethoscope, Pill, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface MedicalRecord {
  id: string;
  patient_id: string;
  patient_name: string;
  visit_date: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  doctor_notes: string;
  vitals: any;
  follow_up_date: string;
  severity: string;
}

interface MedicalHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
  patientName: string;
}

const MedicalHistoryDialog = ({ open, onOpenChange, patientId, patientName }: MedicalHistoryDialogProps) => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open && patientId) {
      fetchMedicalHistory();
    }
  }, [open, patientId]);

  const fetchMedicalHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("medical_history")
        .select("*")
        .eq("patient_id", patientId)
        .order("visit_date", { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching medical history",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-health-success text-white";
      case "medium": return "bg-health-warning text-white";
      case "high": return "bg-destructive text-destructive-foreground";
      case "critical": return "bg-red-600 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatVitals = (vitals: any) => {
    if (!vitals || typeof vitals !== 'object') return [];
    return Object.entries(vitals).map(([key, value]) => ({
      label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: value as string
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Medical History - {patientName}</span>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading medical history...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {records.length === 0 ? (
              <div className="text-center py-8">
                <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">No Medical History Found</p>
                <p className="text-muted-foreground">No medical records available for this patient.</p>
              </div>
            ) : (
              records.map((record) => (
                <Card key={record.id} className="p-4 sm:p-6 bg-gradient-card">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {new Date(record.visit_date).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(record.severity)}`}>
                          {record.severity}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{record.diagnosis}</h4>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="font-semibold text-foreground mb-2 flex items-center">
                        <Stethoscope className="h-4 w-4 mr-2 text-primary" />
                        Treatment
                      </h5>
                      <p className="text-sm text-muted-foreground">{record.treatment}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-foreground mb-2 flex items-center">
                        <Pill className="h-4 w-4 mr-2 text-primary" />
                        Prescription
                      </h5>
                      <p className="text-sm text-muted-foreground">{record.prescription}</p>
                    </div>
                  </div>
                  
                  {record.vitals && Object.keys(record.vitals).length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-semibold text-foreground mb-3 flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-primary" />
                        Vital Signs
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {formatVitals(record.vitals).map((vital, index) => (
                          <div key={index} className="bg-background p-3 rounded-lg border">
                            <p className="text-xs text-muted-foreground">{vital.label}</p>
                            <p className="text-sm font-semibold text-foreground">{vital.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {record.doctor_notes && (
                    <div className="bg-primary-soft p-4 rounded-lg">
                      <h5 className="font-semibold text-primary mb-2">Doctor's Notes</h5>
                      <p className="text-sm text-primary">{record.doctor_notes}</p>
                    </div>
                  )}
                  
                  {record.follow_up_date && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Follow-up scheduled:</span> {new Date(record.follow_up_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MedicalHistoryDialog;