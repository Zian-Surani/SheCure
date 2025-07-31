import { useState } from "react";
import { Search, Filter, Plus, Download, Thermometer, Weight, Heart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import PatientCard from "@/components/PatientCard";
import PatientDetailCard from "@/components/PatientDetailCard";

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const patients = [
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patient Records</h1>
            <p className="text-muted-foreground">Manage and monitor all patient health records</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="soft">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="health">
              <Plus className="h-4 w-4" />
              Add Patient
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={selectedFilter === "all" ? "health" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              All Patients
            </Button>
            <Button
              variant={selectedFilter === "active" ? "health" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={selectedFilter === "critical" ? "health" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("critical")}
            >
              Critical
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Patient Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid gap-4">
              {filteredPatients.map((patient, index) => (
                <PatientCard key={index} {...patient} />
              ))}
            </div>
          </div>

          {/* Detailed Patient Cards */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Priority Cases</h3>
            {detailedPatients.map((patient, index) => (
              <PatientDetailCard key={index} {...patient} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;