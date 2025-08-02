import { useState } from "react";
import { Calendar, Clock, Plus, Filter, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";
import AppointmentDialog from "@/components/AppointmentDialog";
import { useLanguage } from "@/hooks/useLanguage";

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState("2024-02-01");
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState<any>(null);
  const { t } = useLanguage();

  const appointments = [
    {
      id: "APT-001",
      patientName: "Priya Sharma",
      time: "09:00 AM",
      duration: "30 min",
      type: "Prenatal Checkup",
      location: "Anganwadi Center, Delhi",
      doctor: "Dr. Sunita Verma",
      status: "confirmed" as const,
      priority: "high" as const
    },
    {
      id: "APT-002",
      patientName: "Aadhya Patel",
      time: "10:30 AM",
      duration: "45 min",
      type: "Growth Assessment",
      location: "Community Health Center",
      doctor: "Dr. Rajesh Kumar",
      status: "confirmed" as const,
      priority: "medium" as const
    },
    {
      id: "APT-003",
      patientName: "Kavya Reddy",
      time: "11:15 AM",
      duration: "60 min",
      type: "Postpartum Follow-up",
      location: "Mobile Health Unit",
      doctor: "Dr. Meera Nair",
      status: "pending" as const,
      priority: "high" as const
    },
    {
      id: "APT-004",
      patientName: "Ananya Singh",
      time: "02:00 PM",
      duration: "20 min",
      type: "Vaccination",
      location: "Primary Health Center",
      doctor: "Nurse Kamala Devi",
      status: "confirmed" as const,
      priority: "medium" as const
    },
    {
      id: "APT-005",
      patientName: "Meera Gupta",
      time: "03:30 PM",
      duration: "40 min",
      type: "Maternal Health Screening",
      location: "District Hospital",
      doctor: "Dr. Anjali Sharma",
      status: "rescheduled" as const,
      priority: "low" as const
    },
    {
      id: "APT-006",
      patientName: "Lakshmi Nair",
      time: "04:15 PM",
      duration: "30 min",
      type: "Nutritional Counseling",
      location: "Community Health Center",
      doctor: "Nutritionist Rekha Jain",
      status: "confirmed" as const,
      priority: "medium" as const
    }
  ];

  const upcomingAppointments = [
    {
      date: "2024-02-02",
      patientName: "Deepika Joshi",
      time: "10:00 AM",
      type: "Family Planning Consultation"
    },
    {
      date: "2024-02-03",
      patientName: "Sanya Agarwal",
      time: "11:30 AM",
      type: "Developmental Screening"
    },
    {
      date: "2024-02-05",
      patientName: "Priya Sharma",
      time: "09:15 AM",
      type: "Ultrasound Appointment"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-health-success text-white";
      case "pending": return "bg-health-warning text-white";
      case "rescheduled": return "bg-health-purple text-white";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-4 border-destructive";
      case "medium": return "border-l-4 border-health-warning";
      case "low": return "border-l-4 border-health-success";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('nav.appointments')}</h1>
            <p className="text-muted-foreground">Schedule and manage patient appointments</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="soft">
              <Calendar className="h-4 w-4" />
              {t('common.calendarView')}
            </Button>
            <Button variant="health" onClick={() => setShowNewAppointment(true)}>
              <Plus className="h-4 w-4" />
              {t('common.newAppointment')}
            </Button>
          </div>
        </div>

        {/* Date and View Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-foreground"
            />
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "day" ? "health" : "outline"}
                size="sm"
                onClick={() => setViewMode("day")}
              >
                {t('appointments.day')}
              </Button>
              <Button
                variant={viewMode === "week" ? "health" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
              >
                {t('appointments.week')}
              </Button>
              <Button
                variant={viewMode === "month" ? "health" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
              >
                {t('appointments.month')}
              </Button>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
            {t('appointments.filterByStatus')}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {t('appointments.todaySchedule')} - {new Date(selectedDate).toLocaleDateString('en-IN', {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className={`p-6 hover:shadow-card transition-all duration-300 ${getPriorityColor(appointment.priority)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{appointment.time}</div>
                        <div className="text-xs text-muted-foreground">{appointment.duration}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Avatar className="bg-gradient-primary">
                          <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                            {appointment.patientName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-foreground">{appointment.patientName}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.type}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {appointment.location}
                            </span>
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {appointment.doctor}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <Button variant="soft" size="sm" onClick={() => {
                        setSelectedAppointmentDetails(appointment);
                        setShowAppointmentDetails(true);
                      }}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments Sidebar */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{t('appointments.upcomingWeek')}</h3>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment, index) => (
                  <Card key={index} className="p-4 bg-gradient-card">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">
                          {new Date(appointment.date).toLocaleDateString('en-IN', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="text-xs text-muted-foreground">{appointment.time}</span>
                      </div>
                      <h4 className="font-semibold text-foreground text-sm">{appointment.patientName}</h4>
                      <p className="text-xs text-muted-foreground">{appointment.type}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-card">
              <h4 className="font-semibold text-foreground mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Today's Summary
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Appointments</span>
                  <span className="font-semibold text-foreground">{appointments.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Confirmed</span>
                  <span className="font-semibold text-health-success">
                    {appointments.filter(a => a.status === "confirmed").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending</span>
                  <span className="font-semibold text-health-warning">
                    {appointments.filter(a => a.status === "pending").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">High Priority</span>
                  <span className="font-semibold text-destructive">
                    {appointments.filter(a => a.priority === "high").length}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* New Appointment Dialog */}
        <AppointmentDialog 
          open={showNewAppointment}
          onOpenChange={setShowNewAppointment}
          patientId=""
          patientName=""
          onAppointmentScheduled={() => setShowNewAppointment(false)}
        />

        {/* Appointment Details Dialog */}
        <Dialog open={showAppointmentDetails} onOpenChange={setShowAppointmentDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            {selectedAppointmentDetails && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Patient Information</h4>
                    <p><span className="font-medium">Name:</span> {selectedAppointmentDetails.patientName}</p>
                    <p><span className="font-medium">Time:</span> {selectedAppointmentDetails.time}</p>
                    <p><span className="font-medium">Duration:</span> {selectedAppointmentDetails.duration}</p>
                    <p><span className="font-medium">Type:</span> {selectedAppointmentDetails.type}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Appointment Details</h4>
                    <p><span className="font-medium">Location:</span> {selectedAppointmentDetails.location}</p>
                    <p><span className="font-medium">Doctor:</span> {selectedAppointmentDetails.doctor}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAppointmentDetails.status)}`}>
                        {selectedAppointmentDetails.status}
                      </span>
                    </p>
                    <p><span className="font-medium">Priority:</span> {selectedAppointmentDetails.priority}</p>
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button variant="health" size="sm">Edit Appointment</Button>
                  <Button variant="outline" size="sm">Cancel Appointment</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AppointmentsPage;