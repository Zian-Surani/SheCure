import { Pill, Syringe, Calendar, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VaccinationRecord {
  vaccine: string;
  date: string;
  nextDue: string;
  status: "completed" | "due" | "overdue";
}

interface VaccinationScheduleProps {
  patientName: string;
  age: number;
  vaccinations: VaccinationRecord[];
}

const VaccinationSchedule = ({ patientName, age, vaccinations }: VaccinationScheduleProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-health-success text-white";
      case "due": return "bg-health-warning text-white";
      case "overdue": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return "✓";
      case "due": return "!";
      case "overdue": return "⚠";
      default: return "?";
    }
  };

  return (
    <Card className="p-6 shadow-card bg-gradient-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center">
            <Syringe className="h-5 w-5 mr-2 text-primary" />
            Vaccination Schedule
          </h3>
          <p className="text-muted-foreground">{patientName} • {age} years old</p>
        </div>
        <Button variant="health" size="sm">
          <Bell className="h-4 w-4" />
          Set Reminder
        </Button>
      </div>

      <div className="space-y-4">
        {vaccinations.map((vaccination, index) => (
          <div key={index} className="bg-background p-4 rounded-lg border hover:shadow-soft transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getStatusColor(vaccination.status)}`}>
                  {getStatusIcon(vaccination.status)}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{vaccination.vaccine}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Given: {vaccination.date}
                    </span>
                    {vaccination.nextDue && (
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Next: {vaccination.nextDue}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vaccination.status)}`}>
                {vaccination.status.charAt(0).toUpperCase() + vaccination.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary-soft rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Pill className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium text-primary">Immunization Coverage</span>
          </div>
          <span className="text-lg font-bold text-primary">85%</span>
        </div>
        <div className="mt-2 w-full bg-background rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-[85%]"></div>
        </div>
        <p className="text-xs text-primary mt-1">
          {vaccinations.filter(v => v.status === "completed").length} of {vaccinations.length} vaccines completed
        </p>
      </div>
    </Card>
  );
};

export default VaccinationSchedule;