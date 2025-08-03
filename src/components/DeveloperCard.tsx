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
    <Card className="p-4 sm:p-6 hover:shadow-card transition-all duration-300 bg-gradient-card">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          <div className="bg-gradient-primary p-2 sm:p-3 rounded-full flex-shrink-0">
            <span className="text-white font-bold text-sm sm:text-lg">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{name}</h3>
            <p className="text-xs sm:text-sm text-primary font-medium">{role}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          asChild
          className="hover:bg-primary-soft p-2 flex-shrink-0"
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
      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{bio}</p>
    </Card>
  );
};

export default DeveloperCard;