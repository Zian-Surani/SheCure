import { Baby, Calendar, Heart, TrendingUp, Users, Activity } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import PatientCard from "@/components/PatientCard";

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
      name: "Sarah Johnson",
      age: 28,
      condition: "Prenatal Care",
      lastVisit: "2024-01-28",
      location: "Downtown Clinic",
      phone: "+1 (555) 123-4567",
      status: "active" as const
    },
    {
      name: "Emma Davis",
      age: 5,
      condition: "Routine Checkup",
      lastVisit: "2024-01-26",
      location: "Community Center",
      phone: "+1 (555) 234-5678",
      status: "active" as const
    },
    {
      name: "Maria Rodriguez",
      age: 32,
      condition: "Postpartum Care",
      lastVisit: "2024-01-25",
      location: "Mobile Unit",
      phone: "+1 (555) 345-6789",
      status: "critical" as const
    }
  ];

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
    </div>
  );
};

export default Dashboard;