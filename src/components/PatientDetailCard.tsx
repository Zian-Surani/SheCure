import { Thermometer, Weight, Heart, Activity, Calendar, MapPin, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HealthMetric {
  label: string;
  value: string;
  unit: string;
  status: "normal" | "warning" | "critical";
  icon: React.ElementType;
}

interface PatientDetailCardProps {
  name: string;
  age: number;
  id: string;
  condition: string;
  lastVisit: string;
  nextAppointment: string;
  location: string;
  healthMetrics: HealthMetric[];
  notes: string;
}

const PatientDetailCard = ({ 
  name, 
  age, 
  id, 
  condition, 
  lastVisit, 
  nextAppointment, 
  location, 
  healthMetrics, 
  notes 
}: PatientDetailCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-health-success text-white";
      case "warning": return "bg-health-warning text-white";
      case "critical": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 shadow-card bg-gradient-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-muted-foreground">ID: {id} • Age: {age} years</p>
        </div>
        <Button variant="health" size="sm">
          Update Record
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Heart className="h-4 w-4 text-primary mr-2" />
            <span className="font-medium">Condition:</span>
            <span className="ml-2 text-muted-foreground">{condition}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-primary mr-2" />
            <span className="font-medium">Last Visit:</span>
            <span className="ml-2 text-muted-foreground">{lastVisit}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-primary mr-2" />
            <span className="font-medium">Next Appointment:</span>
            <span className="ml-2 text-muted-foreground">{nextAppointment}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-primary mr-2" />
            <span className="font-medium">Location:</span>
            <span className="ml-2 text-muted-foreground">{location}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-3 flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Health Vitals
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="bg-background p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-4 w-4 text-primary" />
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
              <div className="text-lg font-bold text-foreground">
                {metric.value}
                <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      {notes && (
        <div className="bg-primary-soft p-4 rounded-lg">
          <h5 className="font-semibold text-primary mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Clinical Notes
          </h5>
          <p className="text-sm text-primary">{notes}</p>
        </div>
      )}
    </Card>
  );
};

export default PatientDetailCard;