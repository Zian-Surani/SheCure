import { Calendar, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PatientCardProps {
  id?: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  location: string;
  phone: string;
  status: "active" | "inactive" | "critical";
  onSchedule?: (patientId: string, patientName: string) => void;
  onViewDetails?: (patient: any) => void;
  onViewMedicalHistory?: (patientId: string, patientName: string) => void;
  onUpdateRecords?: (patientId: string, patientName: string) => void;
}

const PatientCard = ({ id, name, age, condition, lastVisit, location, phone, status, onSchedule, onViewDetails, onViewMedicalHistory, onUpdateRecords }: PatientCardProps) => {
  const statusColors = {
    active: "bg-health-success text-white",
    inactive: "bg-muted text-muted-foreground",
    critical: "bg-destructive text-destructive-foreground"
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="p-6 hover:shadow-card transition-all duration-300 bg-gradient-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="bg-gradient-primary">
            <AvatarFallback className="bg-gradient-primary text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">Age: {age}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm">
          <span className="font-medium text-foreground">Condition:</span>
          <span className="text-muted-foreground ml-1">{condition}</span>
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          Last visit: {lastVisit}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Phone className="h-4 w-4 mr-1" />
          {phone}
        </div>
      </div>

      <div className="space-y-2">
        <Button 
          variant="health" 
          size="sm" 
          className="w-full"
          onClick={() => onViewDetails?.({ id, name, age, condition, lastVisit, location, phone, status })}
        >
          View Details
        </Button>
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="soft" 
            size="sm" 
            className="text-xs"
            onClick={() => id && onSchedule?.(id, name)}
          >
            Schedule
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => id && onViewMedicalHistory?.(id, name)}
          >
            History
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => id && onUpdateRecords?.(id, name)}
          >
            Update
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PatientCard;