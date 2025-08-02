import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Linkedin } from "lucide-react";

interface DeveloperCardProps {
  name: string;
  role: string;
  bio: string;
  linkedinUrl: string;
  avatar?: string;
}

const DeveloperCard = ({ name, role, bio, linkedinUrl }: DeveloperCardProps) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="p-6 hover:shadow-card transition-all duration-300 bg-gradient-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-primary p-3 rounded-full">
            <span className="text-white font-bold text-lg">{initials}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-primary font-medium">{role}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          asChild
          className="hover:bg-primary-soft"
        >
          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <Linkedin className="h-4 w-4" />
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{bio}</p>
    </Card>
  );
};

export default DeveloperCard;