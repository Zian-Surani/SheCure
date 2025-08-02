import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient?: string;
}

const FeatureCard = ({ title, description, icon: Icon, gradient = "bg-gradient-primary" }: FeatureCardProps) => {
  return (
    <Card className="p-6 h-full hover:shadow-card hover:scale-105 transition-all duration-300 cursor-pointer group bg-gradient-card">
      <div className={`${gradient} p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
};

export default FeatureCard;