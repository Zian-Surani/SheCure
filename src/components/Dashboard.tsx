import { Baby, Calendar, Heart, TrendingUp, Users, Activity, Thermometer, Weight } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import PatientCard from "@/components/PatientCard";
import PatientDetailCard from "@/components/PatientDetailCard";
import VaccinationSchedule from "@/components/VaccinationSchedule";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "2,547",
      change: "+12% from last month",
      icon: Users,
      variant: "default" as const
    },
    {
      title: "Healthy Pregnancies",
      value: "324",
      change: "+8% this quarter",
      icon: Heart,
      variant: "success" as const
    },
    {
      title: "Children Vaccinated",
      value: "1,832",
      change: "+15% from target",
      icon: Baby,
      variant: "success" as const
    },
    {
      title: "Pending Appointments",
      value: "89",
      change: "Next 7 days",
      icon: Calendar,
      variant: "warning" as const
    }
  ];

  const recentPatients = [
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
    }
  ];

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
            {recentPatients.map((patient, index) => (
              <PatientCard key={index} {...patient} />
            ))}
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

      {/* Enhanced Patient Details */}
      <div className="grid lg:grid-cols-2 gap-8">
        <PatientDetailCard {...detailedPatient} />
        <VaccinationSchedule {...vaccinationData} />
      </div>
    </div>
  );
};

export default Dashboard;