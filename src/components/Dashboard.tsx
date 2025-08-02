import { useState, useEffect } from "react";
import { Baby, Calendar, Heart, TrendingUp, Users, Activity, Thermometer, Weight } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import PatientCard from "@/components/PatientCard";
import PatientDetailCard from "@/components/PatientDetailCard";
import VaccinationSchedule from "@/components/VaccinationSchedule";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [stats, setStats] = useState([
    {
      title: "Total Patients",
      value: "0",
      change: "+12% from last month",
      icon: Users,
      variant: "default" as const
    },
    {
      title: "Healthy Pregnancies",
      value: "0",
      change: "+8% this quarter",
      icon: Heart,
      variant: "success" as const
    },
    {
      title: "Children Vaccinated",
      value: "0",
      change: "+15% from target",
      icon: Baby,
      variant: "success" as const
    },
    {
      title: "Pending Appointments",
      value: "0",
      change: "Next 7 days",
      icon: Calendar,
      variant: "warning" as const
    }
  ]);
  const { toast } = useToast();

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
          title: "Total Patients",
          value: totalPatients.toString(),
          change: "+12% from last month",
          icon: Users,
          variant: "default" as const
        },
        {
          title: "Healthy Pregnancies",
          value: pregnancies.toString(),
          change: "+8% this quarter",
          icon: Heart,
          variant: "success" as const
        },
        {
          title: "Children Monitored",
          value: children.toString(),
          change: "+15% from target",
          icon: Baby,
          variant: "success" as const
        },
        {
          title: "Active Cases",
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
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Health Dashboard</h2>
        <p className="text-muted-foreground">Monitor health records and track patient wellness</p>
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
          <h3 className="text-xl font-semibold text-foreground mb-4">Recent Patients</h3>
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
              Health Metrics
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Maternal Health</span>
                <span className="font-semibold text-health-success">92%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-health-success h-2 rounded-full w-[92%]"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Child Wellness</span>
                <span className="font-semibold text-primary">87%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[87%]"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Vaccination Rate</span>
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
              Quick Actions
            </h4>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-primary-soft hover:bg-primary-soft/80 transition-colors">
                <span className="text-sm font-medium text-primary">Add New Patient</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-health-pink hover:bg-health-pink/80 transition-colors">
                <span className="text-sm font-medium text-primary">Schedule Appointment</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-health-purple hover:bg-health-purple/80 transition-colors">
                <span className="text-sm font-medium text-primary">Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Patient Details */}
      {selectedPatient && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Patient Details</h3>
          <Card className="p-6 bg-gradient-card">
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
                <h5 className="font-semibold text-foreground mb-2">Quick Actions</h5>
                <div className="space-y-2">
                  <Button variant="health" size="sm" className="w-full">
                    Schedule Appointment
                  </Button>
                  <Button variant="soft" size="sm" className="w-full">
                    View Medical History
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Update Records
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;