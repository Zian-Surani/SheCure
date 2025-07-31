import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning";
}

const StatsCard = ({ title, value, change, icon: Icon, variant = "default" }: StatsCardProps) => {
  const variantStyles = {
    default: "bg-gradient-card border-health-pink/20",
    success: "bg-gradient-to-br from-health-success/20 to-health-success/10 border-health-success/30",
    warning: "bg-gradient-to-br from-health-warning/20 to-health-warning/10 border-health-warning/30"
  };

  const iconStyles = {
    default: "bg-gradient-primary text-white",
    success: "bg-health-success text-white",
    warning: "bg-health-warning text-white"
  };

  return (
    <Card className={`p-6 shadow-card hover:shadow-lg transition-all duration-300 ${variantStyles[variant]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          <p className="text-sm text-muted-foreground mt-1">{change}</p>
        </div>
        <div className={`p-3 rounded-lg ${iconStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;