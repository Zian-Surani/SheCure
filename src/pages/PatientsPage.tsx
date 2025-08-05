import { useState, useEffect } from "react";
import { Search, Filter, Plus, Download, Thermometer, Weight, Heart, Activity, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";
import PatientCard from "@/components/PatientCard";
import PatientDetailCard from "@/components/PatientDetailCard";
import AddPatientDialog from "@/components/AddPatientDialog";
import AppointmentDialog from "@/components/AppointmentDialog";
import MedicalHistoryDialog from "@/components/MedicalHistoryDialog";
import UpdateRecordsDialog from "@/components/UpdateRecordsDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { Loader2 } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string | null;
  phone: string;
  location: string;
  status: "active" | "inactive" | "critical";
  created_at: string;
  lastVisit: string;
}

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<{ id: string; name: string } | null>(null);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState<any>(null);
  const [showPatientPopup, setShowPatientPopup] = useState(false);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [showUpdateRecords, setShowUpdateRecords] = useState(false);
  const [medicalHistoryPatient, setMedicalHistoryPatient] = useState<{ id: string; name: string } | null>(null);
  const [updateRecordsPatient, setUpdateRecordsPatient] = useState<{ id: string; name: string } | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const exportData = () => {
    const csvContent = [
      "Name,Age,Condition,Phone,Location,Status,Last Visit",
      ...filteredPatients.map(patient => 
        `"${patient.name}",${patient.age},"${patient.condition || 'N/A'}","${patient.phone}","${patient.location}","${patient.status}","${patient.lastVisit}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patients-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: `${filteredPatients.length} patient records exported successfully.`,
    });
  };

  const handleViewDetails = (patient: any) => {
    setSelectedPatientDetails(patient);
    setShowPatientPopup(true);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const formattedData = (data || []).map(patient => ({
        ...patient,
        status: patient.status as "active" | "inactive" | "critical",
        lastVisit: new Date(patient.created_at).toISOString().split('T')[0]
      }));
      
      // Use sample data if database is empty
      const displayPatients = formattedData.length > 0 ? formattedData : staticDetailedPatients.map((p, i) => ({
        id: `sample-${i}`,
        name: p.name,
        age: p.age,
        condition: p.condition,
        phone: p.phone,
        address: `Address for ${p.name}`,
        location: p.location,
        status: p.status,
        created_at: new Date().toISOString(),
        lastVisit: p.lastVisit
      }));
      
      setPatients(displayPatients);
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

  const handleScheduleAppointment = (patientId: string, patientName: string) => {
    setSelectedPatient({ id: patientId, name: patientName });
    setShowAppointmentDialog(true);
  };

  const handleViewMedicalHistory = (patientId: string, patientName: string) => {
    setMedicalHistoryPatient({ id: patientId, name: patientName });
    setShowMedicalHistory(true);
  };

  const handleUpdateRecords = (patientId: string, patientName: string) => {
    setUpdateRecordsPatient({ id: patientId, name: patientName });
    setShowUpdateRecords(true);
  };

  const staticDetailedPatients = [
    {
      name: "Priya Sharma",
      age: 28,
      condition: "Prenatal Care - 32 weeks",
      lastVisit: "2024-01-28",
      location: "Anganwadi Center, Delhi",
      phone: "+91 98765 43210",
      status: "active" as const
    },
    {
      name: "Aadhya Patel",
      age: 5,
      condition: "Growth Monitoring",
      lastVisit: "2024-01-26",
      location: "Community Health Center",
      phone: "+91 87654 32109",
      status: "active" as const
    },
    {
      name: "Kavya Reddy",
      age: 32,
      condition: "Postpartum Care - 6 weeks",
      lastVisit: "2024-01-25",
      location: "Mobile Health Unit",
      phone: "+91 76543 21098",
      status: "critical" as const
    },
    {
      name: "Ananya Singh",
      age: 3,
      condition: "Vaccination Schedule",
      lastVisit: "2024-01-24",
      location: "Primary Health Center",
      phone: "+91 65432 10987",
      status: "active" as const
    },
    {
      name: "Meera Gupta",
      age: 25,
      condition: "Maternal Health Checkup",
      lastVisit: "2024-01-23",
      location: "District Hospital",
      phone: "+91 54321 09876",
      status: "active" as const
    },
    {
      name: "Lakshmi Nair",
      age: 7,
      condition: "Nutritional Assessment",
      lastVisit: "2024-01-22",
      location: "Community Health Center",
      phone: "+91 43210 98765",
      status: "inactive" as const
    },
    {
      name: "Deepika Joshi",
      age: 30,
      condition: "Family Planning Consultation",
      lastVisit: "2024-01-21",
      location: "Primary Health Center",
      phone: "+91 32109 87654",
      status: "active" as const
    },
    {
      name: "Sanya Agarwal",
      age: 2,
      condition: "Developmental Screening",
      lastVisit: "2024-01-20",
      location: "Anganwadi Center, Mumbai",
      phone: "+91 21098 76543",
      status: "active" as const
    }
  ];

  const detailedPatients = [
    {
      name: "Priya Sharma",
      age: 28,
      id: "PID-2024-001",
      condition: "Prenatal Care - 32 weeks",
      lastVisit: "2024-01-28",
      nextAppointment: "2024-02-05",
      location: "Anganwadi Center, Delhi",
      healthMetrics: [
        {
          label: "Blood Pressure",
          value: "120/80",
          unit: "mmHg",
          status: "normal" as const,
          icon: Heart
        },
        {
          label: "Weight",
          value: "68",
          unit: "kg",
          status: "normal" as const,
          icon: Weight
        },
        {
          label: "Temperature",
          value: "98.6",
          unit: "°F",
          status: "normal" as const,
          icon: Thermometer
        },
        {
          label: "Heart Rate",
          value: "72",
          unit: "bpm",
          status: "normal" as const,
          icon: Activity
        }
      ],
      notes: "Patient shows excellent progress. Baby's growth is normal. Continue with current prenatal vitamins."
    },
    {
      name: "Kavya Reddy",
      age: 32,
      id: "PID-2024-003",
      condition: "Postpartum Care - 6 weeks",
      lastVisit: "2024-01-25",
      nextAppointment: "2024-02-01",
      location: "Mobile Health Unit",
      healthMetrics: [
        {
          label: "Blood Pressure",
          value: "140/90",
          unit: "mmHg",
          status: "warning" as const,
          icon: Heart
        },
        {
          label: "Weight",
          value: "72",
          unit: "kg",
          status: "normal" as const,
          icon: Weight
        },
        {
          label: "Temperature",
          value: "99.2",
          unit: "°F",
          status: "warning" as const,
          icon: Thermometer
        },
        {
          label: "Heart Rate",
          value: "88",
          unit: "bpm",
          status: "normal" as const,
          icon: Activity
        }
      ],
      notes: "Monitor blood pressure closely. Patient shows signs of postpartum hypertension. Schedule follow-up within 3 days."
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{t('nav.patients')}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage and monitor all patient health records</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button variant="soft" onClick={exportData} className="w-full sm:w-auto">
              <Download className="h-4 w-4" />
              {t('common.export')}
            </Button>
            <Button variant="health" onClick={() => setShowAddDialog(true)} className="w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              {t('patients.addPatient')}
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('patients.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedFilter === "all" ? "health" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
              className="flex-1 sm:flex-none"
            >
              {t('patients.allPatients')}
            </Button>
            <Button
              variant={selectedFilter === "active" ? "health" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("active")}
              className="flex-1 sm:flex-none"
            >
              {t('patients.active')}
            </Button>
            <Button
              variant={selectedFilter === "critical" ? "health" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("critical")}
              className="flex-1 sm:flex-none"
            >
              {t('patients.critical')}
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">{t('patients.moreFilters')}</span>
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading patients...</span>
          </div>
        ) : (
          /* Patient Grid */
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="grid gap-4">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient, index) => (
                    <PatientCard 
                      key={index} 
                      {...patient} 
                      onSchedule={handleScheduleAppointment}
                      onViewDetails={handleViewDetails}
                      onViewMedicalHistory={handleViewMedicalHistory}
                      onUpdateRecords={handleUpdateRecords}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      {searchTerm || selectedFilter !== "all" 
                        ? "No patients found matching your criteria." 
                        : "No patients added yet. Click 'Add Patient' to get started."
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Patient Details or Priority Cases */}
            <div className="space-y-6">
              {selectedPatientDetails ? (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Patient Details</h3>
                  <Card className="p-6 bg-gradient-card">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-foreground">{selectedPatientDetails.name}</h4>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPatientDetails(null)}>
                          Close
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="font-medium">Age:</span> {selectedPatientDetails.age}</div>
                        <div><span className="font-medium">Status:</span> 
                          <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                            selectedPatientDetails.status === 'active' ? 'bg-health-success text-white' :
                            selectedPatientDetails.status === 'critical' ? 'bg-destructive text-destructive-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {selectedPatientDetails.status}
                          </span>
                        </div>
                        <div><span className="font-medium">Condition:</span> {selectedPatientDetails.condition || 'N/A'}</div>
                        <div><span className="font-medium">Phone:</span> {selectedPatientDetails.phone}</div>
                        <div className="col-span-2"><span className="font-medium">Location:</span> {selectedPatientDetails.location}</div>
                        <div><span className="font-medium">Last Visit:</span> {selectedPatientDetails.lastVisit}</div>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Priority Cases</h3>
                  {detailedPatients.slice(0, 2).map((patient, index) => (
                    <PatientDetailCard key={index} {...patient} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dialogs */}
        <AddPatientDialog 
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onPatientAdded={fetchPatients}
        />
        
        <AppointmentDialog
          open={showAppointmentDialog}
          onOpenChange={setShowAppointmentDialog}
          patientId={selectedPatient?.id}
          patientName={selectedPatient?.name}
          onAppointmentScheduled={() => {
            setShowAppointmentDialog(false);
            setSelectedPatient(null);
          }}
        />

        {/* Enhanced Patient Details Popup */}
        <Dialog open={showPatientPopup} onOpenChange={setShowPatientPopup}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Patient Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedPatientDetails && (
              <div className="space-y-6">
                {/* Patient Basic Info */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="p-4 sm:p-6 bg-gradient-card">
                    <h4 className="text-lg font-semibold text-foreground mb-4">Patient Information</h4>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="text-sm font-medium text-muted-foreground">Name:</span>
                        <span className="text-sm font-semibold text-foreground">{selectedPatientDetails.name}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="text-sm font-medium text-muted-foreground">Age:</span>
                        <span className="text-sm font-semibold text-foreground">{selectedPatientDetails.age} years</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="text-sm font-medium text-muted-foreground">Phone:</span>
                        <span className="text-sm font-semibold text-foreground">{selectedPatientDetails.phone}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="text-sm font-medium text-muted-foreground">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                          selectedPatientDetails.status === 'active' ? 'bg-health-success text-white' :
                          selectedPatientDetails.status === 'critical' ? 'bg-destructive text-destructive-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {selectedPatientDetails.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-muted-foreground">Address:</span>
                        <span className="text-sm font-semibold text-foreground text-right max-w-[200px]">{selectedPatientDetails.address || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-muted-foreground">Location:</span>
                        <span className="text-sm font-semibold text-foreground text-right max-w-[200px]">{selectedPatientDetails.location}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-card">
                    <h4 className="text-lg font-semibold text-foreground mb-4">Medical Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-muted-foreground">Condition:</span>
                        <span className="text-sm font-semibold text-foreground text-right max-w-[200px]">{selectedPatientDetails.condition || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Last Visit:</span>
                        <span className="text-sm font-semibold text-foreground">{selectedPatientDetails.lastVisit || new Date(selectedPatientDetails.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Patient ID:</span>
                        <span className="text-sm font-semibold text-foreground">{selectedPatientDetails.id?.slice(0, 8) || 'N/A'}</span>
                      </div>
                      {selectedPatientDetails.aadhar_number && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Aadhar:</span>
                          <span className="text-sm font-semibold text-foreground">****-****-{selectedPatientDetails.aadhar_number.slice(-4)}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Mock Health Metrics */}
                <Card className="p-6 bg-gradient-card">
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-primary" />
                    Recent Health Metrics
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background p-4 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className="h-4 w-4 text-health-success" />
                        <span className="text-xs text-muted-foreground">Blood Pressure</span>
                      </div>
                      <div className="text-lg font-bold text-foreground">120/80</div>
                      <div className="text-xs text-health-success">Normal</div>
                    </div>
                    <div className="bg-background p-4 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Weight className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Weight</span>
                      </div>
                      <div className="text-lg font-bold text-foreground">65 kg</div>
                      <div className="text-xs text-health-success">Healthy</div>
                    </div>
                    <div className="bg-background p-4 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Thermometer className="h-4 w-4 text-health-warning" />
                        <span className="text-xs text-muted-foreground">Temperature</span>
                      </div>
                      <div className="text-lg font-bold text-foreground">98.6°F</div>
                      <div className="text-xs text-health-success">Normal</div>
                    </div>
                    <div className="bg-background p-4 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Activity className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Heart Rate</span>
                      </div>
                      <div className="text-lg font-bold text-foreground">72 bpm</div>
                      <div className="text-xs text-health-success">Normal</div>
                    </div>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="health" size="sm" onClick={() => {
                    setSelectedPatient({ id: selectedPatientDetails.id, name: selectedPatientDetails.name });
                    setShowAppointmentDialog(true);
                    setShowPatientPopup(false);
                  }}>
                    Schedule Appointment
                  </Button>
                  <Button variant="soft" size="sm" onClick={() => {
                    setShowPatientPopup(false);
                    handleViewMedicalHistory(selectedPatientDetails.id, selectedPatientDetails.name);
                  }}>
                    View Medical History
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    setShowPatientPopup(false);
                    handleUpdateRecords(selectedPatientDetails.id, selectedPatientDetails.name);
                  }}>
                    Update Records
                  </Button>
                  <Button variant="outline" size="sm">
                    Generate Report
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowPatientPopup(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Medical History Dialog */}
        {medicalHistoryPatient && (
          <MedicalHistoryDialog
            open={showMedicalHistory}
            onOpenChange={setShowMedicalHistory}
            patientId={medicalHistoryPatient.id}
            patientName={medicalHistoryPatient.name}
          />
        )}

        {/* Update Records Dialog */}
        {updateRecordsPatient && (
          <UpdateRecordsDialog
            open={showUpdateRecords}
            onOpenChange={setShowUpdateRecords}
            patientId={updateRecordsPatient.id}
            patientName={updateRecordsPatient.name}
          />
        )}
      </div>
    </div>
  );
};

export default PatientsPage;