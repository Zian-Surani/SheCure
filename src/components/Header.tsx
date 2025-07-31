import { Heart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-gradient-soft border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">HealthCare NGO</h1>
              <p className="text-sm text-muted-foreground">Women & Children Wellness</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#patients" className="text-foreground hover:text-primary transition-colors">
              Patients
            </a>
            <a href="#appointments" className="text-foreground hover:text-primary transition-colors">
              Appointments
            </a>
            <a href="#reports" className="text-foreground hover:text-primary transition-colors">
              Reports
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="soft" size="sm">
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;