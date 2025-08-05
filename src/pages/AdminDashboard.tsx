import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/hooks/useLanguage";
import { LogOut, Users, FileText, Calendar, Activity } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";

interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  address: string;
  condition: string;
  status: string;
  aadhar_number: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [translatedPatients, setTranslatedPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { translatePatientData, translateText } = useTranslation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchPatients();
  }, [user, navigate]);

  useEffect(() => {
    if (patients.length > 0) {
      translatePatientsData();
    }
  }, [patients, language]);

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPatients(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching patients",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const translatePatientsData = async () => {
    if (language === 'en') {
      setTranslatedPatients(patients);
      return;
    }

    try {
      const translated = await Promise.all(
        patients.map(async (patient) => {
          const translatedPatient = await translatePatientData(patient);
          // Also translate name if it's in English
          if (patient.name && /^[a-zA-Z\s]+$/.test(patient.name)) {
            translatedPatient.name = await translateText(patient.name);
          }
          if (patient.address) {
            translatedPatient.address = await translateText(patient.address);
          }
          return translatedPatient;
        })
      );
      setTranslatedPatients(translated);
    } catch (error) {
      console.error("Error translating patient data:", error);
      setTranslatedPatients(patients);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-health-success text-white";
      case "critical": return "bg-destructive text-destructive-foreground";
      case "inactive": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/25ad9f45-77ed-4f46-8839-20b7edc24d97.png" 
                alt="SheCure Logo" 
                className="h-8 w-auto"
              />
              <div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  SheCure Admin
                </span>
                <span className="text-xs text-muted-foreground block">
                  Administrative Dashboard
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle onLanguageChange={setLanguage} />
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-primary text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Patients</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>
              <Users className="h-8 w-8 text-white/80" />
            </div>
          </Card>
          <Card className="p-6 bg-health-success text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Active Cases</p>
                <p className="text-2xl font-bold">
                  {patients.filter(p => p.status === 'active').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-white/80" />
            </div>
          </Card>
          <Card className="p-6 bg-health-warning text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Critical Cases</p>
                <p className="text-2xl font-bold">
                  {patients.filter(p => p.status === 'critical').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-white/80" />
            </div>
          </Card>
          <Card className="p-6 bg-health-purple text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">This Month</p>
                <p className="text-2xl font-bold">
                  {patients.filter(p => {
                    const patientDate = new Date(p.created_at);
                    const currentDate = new Date();
                    return patientDate.getMonth() === currentDate.getMonth() &&
                           patientDate.getFullYear() === currentDate.getFullYear();
                  }).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-white/80" />
            </div>
          </Card>
        </div>

        {/* Patients List */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">All Patients</h2>
            <Badge variant="outline">{patients.length} patients</Badge>
          </div>

          <div className="grid gap-4">
            {translatedPatients.map((patient) => (
              <Card key={patient.id} className="p-4 hover:shadow-card transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <p><span className="font-medium">Age:</span> {patient.age} years</p>
                      <p><span className="font-medium">Phone:</span> {patient.phone}</p>
                      <p><span className="font-medium">Condition:</span> {patient.condition || 'N/A'}</p>
                      <p className="sm:col-span-2 lg:col-span-3">
                        <span className="font-medium">Address:</span> {patient.address}
                      </p>
                      {patient.aadhar_number && (
                        <p><span className="font-medium">Aadhar:</span> {patient.aadhar_number}</p>
                      )}
                      <p><span className="font-medium">Registered:</span> {formatDate(patient.created_at)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {patients.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No patients found</p>
              <p className="text-sm text-muted-foreground">Patient records will appear here once they are added to the system.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;