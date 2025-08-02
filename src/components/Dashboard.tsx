import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Baby, Calendar, Heart, TrendingUp, Users, Activity, Thermometer, Weight, X, AlertTriangle, Phone } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import PatientCard from "@/components/PatientCard";
import PatientDetailCard from "@/components/PatientDetailCard";
import VaccinationSchedule from "@/components/VaccinationSchedule";
import AddPatientDialog from "@/components/AddPatientDialog";
import AppointmentDialog from "@/components/AppointmentDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Dashboard = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [stats, setStats] = useState([]);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch patients
      const { data: patientsData, error: patientsError } = await supabase
        .from("patients")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (patientsError) throw patientsError;

      setPatients(patientsData || []);

      // Update stats with real data
      const totalPatients = patientsData?.length || 0;
      const pregnancies = patientsData?.filter(p => p.condition?.includes('Prenatal')).length || 0;
      const children = patientsData?.filter(p => p.age < 18).length || 0;

      setStats([
        {
          title: t('dashboard.totalPatients'),
          value: totalPatients.toString(),
          change: "+12% from last month",
          icon: Users,
          variant: "default" as const
        },
        {
          title: t('dashboard.healthyPregnancies'),
          value: pregnancies.toString(),
          change: "+8% this quarter",
          icon: Heart,
          variant: "success" as const
        },
        {
          title: t('dashboard.childrenVaccinated'),
          value: children.toString(),
          change: "+15% from target",
          icon: Baby,
          variant: "success" as const
        },
        {
          title: t('dashboard.activeCases'),
          value: patientsData?.filter(p => p.status === 'active').length.toString() || "0",
          change: "This week",
          icon: Calendar,
          variant: "warning" as const
        }
      ]);

    } catch (error: any) {
      toast({
        title: "Error fetching dashboard data",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handlePatientClick = (patient: any) => {
    setSelectedPatient(patient);
    setShowPatientDetails(true);
  };

  const handleAddPatient = () => {
    setShowAddPatient(true);
  };

  const handleScheduleAppointment = () => {
    setShowAppointment(true);
  };

  const handleGenerateReport = () => {
    navigate("/reports");
  };

  const handleEmergencyAlert = () => {
    setShowEmergencyAlert(true);
    toast({
      title: "Emergency Alert Triggered",
      description: "Emergency services have been notified. Medical team will respond immediately.",
      variant: "destructive",
    });
  };


  const detailedPatient = {
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
    notes: "Patient shows excellent progress. Baby's growth is normal. Continue with current prenatal vitamins and schedule ultrasound for next visit."
  };

  const vaccinationData = {
    patientName: "Aadhya Patel",
    age: 5,
    vaccinations: [
      {
        vaccine: "BCG",
        date: "2019-03-15",
        nextDue: "Completed",
        status: "completed" as const
      },
      {
        vaccine: "DPT (1st dose)",
        date: "2019-05-20",
        nextDue: "Completed",
        status: "completed" as const
      },
      {
        vaccine: "DPT (2nd dose)",
        date: "2019-07-25",
        nextDue: "Completed",
        status: "completed" as const
      },
      {
        vaccine: "MMR",
        date: "2020-03-10",
        nextDue: "Completed",
        status: "completed" as const
      },
      {
        vaccine: "Hepatitis B",
        date: "2024-01-15",
        nextDue: "2024-07-15",
        status: "due" as const
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('dashboard.title')}</h2>
          <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
        </div>
        
        {/* Emergency Alert Button */}
        <Button 
          variant="destructive" 
          size="lg" 
          onClick={handleEmergencyAlert}
          className="animate-pulse bg-destructive hover:bg-destructive/90 shadow-lg"
        >
          <AlertTriangle className="h-5 w-5 mr-2" />
          Emergency Alert
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-foreground mb-4">{t('dashboard.recentPatients')}</h3>
          <div className="grid gap-4">
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <Card 
                  key={index} 
                  className="p-4 hover:shadow-card transition-all duration-300 cursor-pointer bg-gradient-card"
                  onClick={() => handlePatientClick(patient)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{patient.name}</h4>
                      <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'active' ? 'bg-health-success text-white' :
                      patient.status === 'critical' ? 'bg-destructive text-destructive-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">No patients found. Add some patients to see them here.</p>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-card p-6 rounded-lg shadow-card">
            <h4 className="font-semibold text-foreground mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              {t('dashboard.healthMetrics')}
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('dashboard.maternalHealth')}</span>
                <span className="font-semibold text-health-success">92%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-health-success h-2 rounded-full w-[92%]"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('dashboard.childWellness')}</span>
                <span className="font-semibold text-primary">87%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[87%]"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('dashboard.vaccinationRate')}</span>
                <span className="font-semibold text-health-success">95%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-health-success h-2 rounded-full w-[95%]"></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card p-6 rounded-lg shadow-card">
            <h4 className="font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              {t('dashboard.quickActions')}
            </h4>
            <div className="space-y-3">
              <button 
                onClick={handleAddPatient}
                className="w-full text-left p-3 rounded-lg bg-primary-soft hover:bg-primary-soft/80 transition-colors"
              >
                <span className="text-sm font-medium text-primary">{t('dashboard.addNewPatient')}</span>
              </button>
              <button 
                onClick={handleScheduleAppointment}
                className="w-full text-left p-3 rounded-lg bg-health-pink hover:bg-health-pink/80 transition-colors"
              >
                <span className="text-sm font-medium text-primary">{t('dashboard.scheduleAppointment')}</span>
              </button>
              <button 
                onClick={handleGenerateReport}
                className="w-full text-left p-3 rounded-lg bg-health-purple hover:bg-health-purple/80 transition-colors"
              >
                <span className="text-sm font-medium text-primary">{t('dashboard.generateReport')}</span>
              </button>
            </div>
          </div>

          {/* Critical Patients Alert */}
          <Card className="p-6 bg-gradient-to-r from-destructive/10 to-health-warning/10 border-destructive/20">
            <h4 className="font-semibold text-foreground mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
              Critical Patients Alert
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-destructive/20">
                <div>
                  <p className="font-medium text-foreground">Kavya Reddy</p>
                  <p className="text-sm text-muted-foreground">Postpartum hypertension</p>
                </div>
                <Button variant="destructive" size="sm" onClick={handleEmergencyAlert}>
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-health-warning/30">
                <div>
                  <p className="font-medium text-foreground">Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">High-risk pregnancy monitoring</p>
                </div>
                <Button variant="outline" size="sm" className="border-health-warning text-health-warning hover:bg-health-warning/10">
                  Monitor
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Patient Details Dialog */}
      <Dialog open={showPatientDetails} onOpenChange={setShowPatientDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {t('dashboard.patientDetails')}
              <Button variant="ghost" size="sm" onClick={() => setShowPatientDetails(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">{selectedPatient.name}</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Age:</span> {selectedPatient.age}</p>
                  <p><span className="font-medium">Condition:</span> {selectedPatient.condition || 'Not specified'}</p>
                  <p><span className="font-medium">Phone:</span> {selectedPatient.phone}</p>
                  <p><span className="font-medium">Address:</span> {selectedPatient.address}</p>
                  <p><span className="font-medium">Location:</span> {selectedPatient.location}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                      selectedPatient.status === 'active' ? 'bg-health-success text-white' :
                      selectedPatient.status === 'critical' ? 'bg-destructive text-destructive-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {selectedPatient.status}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-2">{t('dashboard.quickActions')}</h5>
                <div className="space-y-2">
                  <Button variant="health" size="sm" className="w-full" onClick={handleScheduleAppointment}>
                    {t('dashboard.scheduleAppointment')}
                  </Button>
                  <Button variant="soft" size="sm" className="w-full">
                    {t('dashboard.viewMedicalHistory')}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    {t('dashboard.updateRecords')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Patient Dialog */}
      <AddPatientDialog 
        open={showAddPatient} 
        onOpenChange={setShowAddPatient}
        onPatientAdded={fetchDashboardData}
      />

      {/* Appointment Dialog */}
      <AppointmentDialog 
        open={showAppointment} 
        onOpenChange={setShowAppointment}
        patientId={selectedPatient?.id}
        patientName={selectedPatient?.name || ''}
        onAppointmentScheduled={fetchDashboardData}
      />

      {/* Emergency Alert Dialog */}
      <Dialog open={showEmergencyAlert} onOpenChange={setShowEmergencyAlert}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Emergency Alert Activated
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="text-sm text-foreground">
                Emergency services have been notified and medical assistance is being dispatched.
              </p>
              <div className="mt-3 space-y-2">
                <p className="text-xs text-muted-foreground">• Medical team ETA: 10-15 minutes</p>
                <p className="text-xs text-muted-foreground">• Emergency contact: +91 108</p>
                <p className="text-xs text-muted-foreground">• Reference ID: EMG-{new Date().getTime().toString().slice(-6)}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="destructive" size="sm" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call 108
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowEmergencyAlert(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;